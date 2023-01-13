import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { addBag } from "../actions/rosbag";
import { setWSConnection } from "../actions/settings";
import * as TASK from "../actions/task";

export const WebSocketContext = React.createContext();
let client;

const Ws = ({ children, allTasks }) => {
    const dispatch = useDispatch();

    let [sendJsonMessage, setSendJsonMessage] = React.useState(null);

    const connect = () => {
        if (client && client.readyState !== client.CLOSED) return;
        console.log("Connecting to WebSocket server...");
        client = new WebSocket("ws://127.0.0.1:8001");
        client.onopen = () => {
            console.log("WebSocket connection established.");
            dispatch(setWSConnection({ ws_connected: true }));
        };

        client.onmessage = (message) => {
            processMessage(message, dispatch, allTasks);
        };

        client.onerror = (e) => console.error(e);

        client.onclose = (e) => {
            console.log("WebSocket connection closed.", e);
            dispatch(setWSConnection({ ws_connected: false }));
            setTimeout(() => {
                connect();
            }, 1000);
        };
        const sendMsg = { send: (jsonObj) => client.send(JSON.stringify(jsonObj)) };
        setSendJsonMessage(sendMsg);
        console.log("sendJsonMessage", sendJsonMessage);
    };

    useEffect(() => {
        connect();
    }, []);
    return <WebSocketContext.Provider value={sendJsonMessage}>{children}</WebSocketContext.Provider>;
};

export default connect((state) => ({
    allTasks: state.tasks,
}))(Ws);

const processMessage = (message, dispatch, allTasks) => {
    const data = JSON.parse(message.data);
    console.log("PROCESS_DATA", data);
    if (data.type === "progress") processProgress(data, dispatch, allTasks);
    else if (data.type === "result") processResult(data, dispatch, allTasks);
    else if (data.type === "error") processError(data, dispatch, allTasks);
};

const processProgress = (message, dispatch, allTasks) => {
    dispatch(TASK.updateTask(message.id, { progress: message.progress }));
    console.log("Progress: " + message.progress);
};

const processResult = (message, dispatch, allTasks) => {
    dispatch(TASK.updateTask(message.id, { status: "COMPLETE", progress: 1, endTime: new Date().getTime(), result: message.result }));
    if (message.action === TASK.OPEN_BAG_TASK) {
        JSON.parse(message.result).forEach((element) => {
            const task = TASK.addTask(TASK.makeBagInfoTask(element), true);
            const taskId = task.task.id;
            dispatch(task);
            dispatch(TASK.startTask(taskId));
        });
    } else if (message.action === TASK.BAG_INFO_TASK) {
        dispatch(addBag(message.result));
    }
    console.log("Result: " + message.result);
};

const processError = (message, dispatch, allTasks) => {
    dispatch(TASK.updateTask(message.id, { status: "ERROR", progress: 1, endTime: new Date().getTime(), result: message.error }));
    console.log("Error: " + message.error);
};
