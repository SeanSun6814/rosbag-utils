import React, { useEffect } from "react";
import { WebSocketContext } from "./Websockets";
import { updateTask } from "../actions/task";
import { useDispatch, connect } from "react-redux";
import { setServerBusy } from "../actions/status";

const TaskRunner = ({ allTasks }) => {
    const dispatch = useDispatch();
    const sendJsonMessage = React.useContext(WebSocketContext);

    useEffect(() => {
        const isRunning = allTasks.some((task) => task.status === "RUNNING");
        if (!isRunning) {
            const tasks = allTasks.filter((task) => task.status === "READY");
            if (tasks.length > 0) {
                const task = tasks[0];
                dispatch(setServerBusy(true));
                dispatch(updateTask(task.id, { status: "RUNNING", startTime: new Date().getTime(), progress: 0 }));
                const message = { ...task.config, id: task.id };
                sendJsonMessage.send(message);
                console.log("START_TASK:", message);
            }
        }
    }, [dispatch, allTasks]);
    return <div style={{ display: "none" }}></div>;
};

export default connect((state) => ({
    allTasks: state.tasks,
}))(TaskRunner);
