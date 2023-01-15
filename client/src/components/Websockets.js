import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { addBag } from "../reducers/rosbag";
import { setBagOpening, setServerBusy, setWSConnection } from "../reducers/status";
import * as TASK from "../reducers/task";

export const WebSocketContext = React.createContext();
let client;

const Ws = ({ children, state: database }) => {
    const dispatch = useDispatch();
    let [sendJsonMessage, setSendJsonMessage] = React.useState(null);

    const updateHandlers = () => {
        if (!client) return console.log("WEBSOCKET_NOT_CONNECTED, CANNOT_SET_HANDLERS");
        const processMessage = (message) => {
            const processProgress = (message) => {
                dispatch(TASK.updateTask(message.id, { progress: message.progress }));
                console.log("Progress: " + message.progress);
            };

            const processResult = (message) => {
                dispatch(TASK.updateTask(message.id, { status: "COMPLETE", progress: 1, endTime: new Date().getTime(), result: message.result }));
                console.log("TASK_COMPLETE", message.id);
                if (message.action === TASK.OPEN_BAG_TASK) {
                    const paths = JSON.parse(message.result);
                    paths.forEach((element) => {
                        const task = TASK.addTask(TASK.makeBagInfoTask(element), true);
                        const taskId = task.task.id;
                        dispatch(task);
                        dispatch(TASK.startTask(taskId));
                    });
                    if (paths.length === 0) dispatch(setBagOpening(false));
                } else if (message.action === TASK.BAG_INFO_TASK) {
                    let bagInfo = JSON.parse(message.result);
                    bagInfo = { ...bagInfo, id: database.bags.length + 1 };
                    dispatch(addBag(bagInfo));
                    dispatch(setBagOpening(false));
                }
                dispatch(setServerBusy(false));
            };

            const processError = (message) => {
                dispatch(TASK.updateTask(message.id, { status: "ERROR", progress: 1, endTime: new Date().getTime(), result: message.error }));
                console.log("Error: " + message.error);
            };

            const data = JSON.parse(message.data);
            console.log("PROCESS_RECEIVED_DATA", data);
            if (data.type === "progress") processProgress(data);
            else if (data.type === "result") processResult(data);
            else if (data.type === "error") processError(data);
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
                updateHandlers(database);
            };

            client.onmessage = (message) => {
                console.log("WEBSOCKET_RECEIVED_MESSAGE_BUT_STATE_IS_NOT_INITIALIZED");
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
            setSendJsonMessage(sendMsg);
        };
        connect();
    }, []);

    useEffect(() => updateHandlers(), [database]);
    return <WebSocketContext.Provider value={sendJsonMessage}>{children}</WebSocketContext.Provider>;
};

export default connect((state) => ({ state }))(Ws);
