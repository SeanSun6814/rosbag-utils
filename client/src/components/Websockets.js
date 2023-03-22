import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { addBag } from "../reducers/rosbag";
import { setBagOpening, setServerBusy, setWSConnection } from "../reducers/status";
import * as TASK from "../reducers/task";
import Swal from "sweetalert2";

export const WebSocketContext = React.createContext();
let client;
let seenMessageUUIDs = {};

const Ws = ({ children }) => {
    const dispatch = useDispatch();
    let [sendJsonMessage, setSendJsonMessage] = React.useState(null);

    const updateHandlers = () => {
        if (!client) return console.log("WEBSOCKET_NOT_CONNECTED, CANNOT_SET_HANDLERS");
        const processMessage = (message) => {
            const processProgress = (message) => {
                dispatch(TASK.updateTask(message.id, { progress: message.progress, progressDetails: message.progressDetails }));
            };

            const processResult = (message) => {
                dispatch(
                    TASK.updateTask(message.id, {
                        status: "COMPLETE",
                        progressDetails: "Finished",
                        progress: 1,
                        endTime: new Date().getTime(),
                        result: message.result,
                    })
                );
                console.log("TASK_COMPLETE", message.id);
                const result = message.result;
                if (message.action === TASK.OPEN_BAG_TASK) {
                    const paths = result;
                    paths.forEach((element) => {
                        const task = TASK.addTask(TASK.makeBagInfoTask(element), true);
                        const taskId = task.task.id;
                        dispatch(task);
                        dispatch(TASK.startTask(taskId));
                    });
                    if (paths.length === 0) dispatch(setBagOpening(false));
                } else if (message.action === TASK.BAG_INFO_TASK) {
                    const bagInfo = { ...result };
                    dispatch(addBag(bagInfo));
                    dispatch(setBagOpening(false));
                }
                dispatch(setServerBusy(false));
            };

            const processError = (message) => {
                dispatch(TASK.updateTask(message.id, { status: "ERROR", progress: 1, endTime: new Date().getTime(), result: message.error }));
                console.log("ERROR: " + message.error);
            };

            const processWsInfo = (message) => {
                console.log("WEBSOCKET_INFO", message);
                if (message.message === "TOO_MANY_CONNECTIONS") {
                    console.log("TOO_MANY_CONNECTIONS, SHOWING ALERT");
                    showAlert("Too many connections", (message.num_clients - 1) + " other browser windows are connected to server.<br><br>Please close other windows before continuing<br><br>Or try refreshing the page (all progress will be lost)", "error");
                } else if (message.message === "TOO_MANY_CONNECTIONS_RESOLVED") {
                    console.log("TOO_MANY_CONNECTIONS_RESOLVED, HIDING ALERT");
                    hideAlert();
                } else {
                    console.log("UNABLE TO PROCESS WEBSOCKET_INFO", message);
                }
            };
            const data = JSON.parse(message.data);
            const uuid = data.response_id;
            if (uuid && seenMessageUUIDs[uuid]) return console.log("WARNING_SEEN_MESSAGE_UUID", uuid);
            seenMessageUUIDs[uuid] = true;
            console.log("PROCESS_RECEIVED_DATA", data);
            if (data.type === "progress") processProgress(data);
            else if (data.type === "result") processResult(data);
            else if (data.type === "error") processError(data);
            else if (data.type === "ws_info") processWsInfo(data);
        };
        client.onmessage = (message) => {
            processMessage(message);
        };
    };

    useEffect(() => {
        const connect = () => {
            if (client && client.readyState !== client.CLOSED) return;
            console.log("Connecting to WebSocket server...");
            client = new WebSocket("ws://127.0.0.1:8001");
            client.onopen = () => {
                console.log("WebSocket connection established.");
                dispatch(setWSConnection(true));
                updateHandlers();
            };

            client.onmessage = (message) => {
                console.log("WEBSOCKET_RECEIVED_MESSAGE_BUT_STATE_IS_NOT_INITIALIZED", message);
            };

            client.onerror = (e) => console.error(e);

            client.onclose = (e) => {
                console.log("WebSocket connection closed.", e);
                dispatch(setWSConnection(false));
                dispatch(setServerBusy(false));
                setTimeout(() => {
                    connect();
                }, 1000);
            };
            const sendMsg = {
                send: (jsonObj) => {
                    if (client.readyState !== client.OPEN) return console.log("ERROR: WEBSOCKET_NOT_CONNECTED!");
                    client.send(JSON.stringify(jsonObj));
                },
            };
            setSendJsonMessage(() => sendMsg);
        };
        connect();
    }, [dispatch]);

    return <WebSocketContext.Provider value={sendJsonMessage}>{children}</WebSocketContext.Provider>;
};

function showAlert(title, text, icon, callback) {
    Swal.fire({
        title: title,
        html: text,
        icon: icon,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
    }).then((result) => {
        if (callback)
            callback(result);
    });
}

function hideAlert() {
    Swal.close();
}

export default connect((state) => ({ state }))(Ws);
