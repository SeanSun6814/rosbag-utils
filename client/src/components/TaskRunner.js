import React, { useEffect } from "react";
import { WebSocketContext } from "./Websockets";
import { updateTask } from "../reducers/task";
import { useDispatch, connect } from "react-redux";
import { setServerBusy } from "../reducers/status";

let bagsGlobal, topicsGlobal;

const TaskRunner = ({ allTasks, bags, topics }) => {
    const dispatch = useDispatch();
    const sendJsonMessage = React.useContext(WebSocketContext);

    useEffect(() => {
        bagsGlobal = bags;
    }, [bags]);

    useEffect(() => {
        topicsGlobal = topics;
    }, [topics]);

    useEffect(() => {
        const isRunning = allTasks.some((task) => task.status === "RUNNING");
        if (!isRunning) {
            const tasks = allTasks.filter((task) => task.status === "READY");
            if (tasks.length > 0) {
                const task = tasks[0];
                dispatch(setServerBusy(true));
                dispatch(updateTask(task.id, { status: "RUNNING", startTime: new Date().getTime(), progress: 0 }));
                const message = { ...task.config, id: task.id, envInfo: getEnv(bagsGlobal, topicsGlobal) };
                try {
                    sendJsonMessage.send(message);
                } catch (error) {
                    console.log("ERROR_SENDING_MESSAGE", error);
                }
                console.log("START_TASK:", message);
            }
        }
    }, [dispatch, allTasks, sendJsonMessage]);
    return <div style={{ display: "none" }}></div>;
};

const getEnv = (bags, topics) => ({
    bags: bags.filter((bag) => bag.selected),
    topics: Object.keys(topics)
        .filter((topic) => topics[topic].selected)
        .map((topic) => topics[topic]),
});

export default connect((state) => ({
    bags: state.bags,
    topics: state.topics,
    allTasks: state.tasks,
}))(TaskRunner);
