import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBag } from "../actions/rosbag";
import { setWSConnection } from "../actions/settings";

const WebSocketContext = React.createContext(null);
let client;

export { WebSocketContext };

export default ({ children }) => {
    const dispatch = useDispatch();

    const processMessage = (message) => {
        const data = message.data;
        console.log(data);
        // dispatch(
        //     addBag({
        //         path: "/home/Downloads/2020-10-01-14-00-00.bag" + data,
        //         size: 100,
        //         startTime: 100,
        //         endTime: 200,
        //         duration: 100,
        //         messages: 100,
        //         topics: 100,
        //     })
        // );
    };
    let sendJsonMessage;

    const connect = () => {
        if (client && client.readyState === WebSocket.OPEN) return;
        console.log("Connecting to WebSocket server...");
        client = new WebSocket("ws://127.0.0.1:8001");
        client.onopen = () => {
            console.log("WebSocket connection established.");
            dispatch(setWSConnection({ ws_connected: true }));
        };

        client.onmessage = (message) => {
            processMessage(message);
        };

        client.onerror = (e) => console.error(e);

        client.onclose = (e) => {
            console.log("WebSocket connection closed.", e);
            dispatch(setWSConnection({ ws_connected: false }));
            setTimeout(() => {
                connect();
            }, 1000);
        };
        sendJsonMessage = (jsonObj) => client.send(JSON.stringify(jsonObj));
    };

    useEffect(() => {
        connect();
    }, []);
    return <WebSocketContext.Provider value={sendJsonMessage}>{children}</WebSocketContext.Provider>;
};
