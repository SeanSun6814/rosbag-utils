import React from "react";
import { connect, useDispatch } from "react-redux";
import { setPageComplete, setTempTasks } from "../../reducers/status";
import { addTask, startTask } from "../../reducers/task";
import { Box, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FinishPage = (props) => {
    const dispatch = useDispatch();
    const [totalTasks, setTotalTasks] = React.useState(0);
    const [percentage, setPercentage] = React.useState(0);
    const [statusMessage, setStatusMessage] = React.useState("Not started");

    React.useEffect(() => {
        const waitingTasks = props.tasks.filter((task) => task.status === "WAITING");
        const queuedTasks = props.tasks.filter((task) => task.status === "READY");
        const runningTasks = props.tasks.filter((task) => task.status === "RUNNING");
        const completedTasks = props.tasks.filter((task) => task.status === "COMPLETE");
        const runningTaskProgress = runningTasks.length > 0 ? runningTasks[0].progress : 0;
        const percentPerTask = totalTasks === 0 ? 0 : 1 / totalTasks;
        const numCompleted = totalTasks - queuedTasks.length - runningTasks.length - waitingTasks.length;
        const percentCompleted = (numCompleted * percentPerTask + runningTaskProgress * percentPerTask) * 100;

        setPercentage(() => percentCompleted);
        if (runningTasks.length > 0) {
            setStatusMessage(() => runningTasks[0].progressDetails);
        }

        if (numCompleted === totalTasks) {
            setStatusMessage(() => "Finished");
        }

        dispatch(setPageComplete(completedTasks.length === props.tasks.length));
    }, [props.tasks, totalTasks, dispatch]);

    React.useEffect(() => {
        const tmpTasks = props.status.temp_tasks;
        tmpTasks.forEach((task) => {
            dispatch(addTask(task, false));
        });
        props.tasks.forEach((task) => {
            if (task.status === "WAITING") {
                dispatch(startTask(task.id));
            }
        });
        if (tmpTasks.length > 0) {
            setTotalTasks(() => tmpTasks.length);
            dispatch(setTempTasks([]));
        }
    }, [props.status, dispatch]);

    return (

        <Box alignItems={"center"}>
            <Box width={"90vw"} display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <Stack direction="column" spacing={4} alignItems={"center"}>
                    <Typography fontSize={"3em"}>Overall Progress</Typography>
                    <Box width={"20vw"}>
                        <CircularProgressbar value={percentage} text={`${Math.round(percentage)}%`} />
                    </Box>
                    <Typography fontSize={"1.5em"}>{statusMessage}</Typography>
                </Stack>
            </Box>
        </Box>
    );
};

export default connect((state) => ({
    status: state.status,
    tasks: state.tasks,
}))(FinishPage);
