import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { WebSocketContext } from "./Websockets";
import { updateTask } from "../actions/task";
import { useDispatch, connect } from "react-redux";

const TaskRunner = ({ allTasks }) => {
    const dispatch = useDispatch();
    const sendJsonMessage = React.useContext(WebSocketContext);

    useEffect(() => {
        console.log("TaskRunner scanning: " + allTasks.length + " tasks.");
        const isRunning = allTasks.some((task) => task.status === "RUNNING");
        console.log("isRunning: " + isRunning);
        if (!isRunning) {
            const tasks = allTasks.filter((task) => task.status === "READY");
            if (tasks.length > 0) {
                const task = tasks[0];
                dispatch(updateTask(task.id, { status: "RUNNING", startTime: new Date().getTime(), progress: 0 }));
                const message = { ...task.config, id: task.id };
                console.log("sendJsonMessage", sendJsonMessage.send);
                sendJsonMessage.send(message);
                console.log("SENT_ACTION:", message);
            }
        }
    }, [dispatch, allTasks]);
    return <div style={{ display: "none" }}></div>;
};

export default connect((state) => ({
    allTasks: state.tasks,
}))(TaskRunner);
