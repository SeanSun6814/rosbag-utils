import { Button } from "@mui/material";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { setPageComplete, setTempTasks } from "../reducers/status";
import { addTask, startTask, stopTask } from "../reducers/task";
import TaskTable from "./TaskTable";
import { Box, Stack } from "@mui/system";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CancelIcon from "@mui/icons-material/Cancel";
import { Typography } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FinishPage = (props) => {
    const dispatch = useDispatch();
    const [startedTasks, setStartedTasks] = React.useState(false);
    const [startButtonEnabled, setStartButtonEnabled] = React.useState(false);
    const [totalTasks, setTotalTasks] = React.useState(0);
    const [percentage, setPercentage] = React.useState(0);

    React.useEffect(() => {
        dispatch(setPageComplete(true));
        console.clear();
    }, []);

    React.useEffect(() => {
        const waitingTasks = props.tasks.filter((task) => task.status === "WAITING");
        const queuedTasks = props.tasks.filter((task) => task.status === "READY");
        const runningTasks = props.tasks.filter((task) => task.status === "RUNNING");
        const runningTaskProgress = runningTasks.length > 0 ? runningTasks[0].progress : 0;
        const percentPerTask = totalTasks === 0 ? 0 : 1 / totalTasks;
        const numCompleted = totalTasks - queuedTasks.length - runningTasks.length - waitingTasks.length;
        const percentCompleted = (numCompleted * percentPerTask + runningTaskProgress * percentPerTask) * 100;
        setPercentage(() => percentCompleted);
        if (startedTasks && numCompleted === totalTasks) setStartedTasks(() => false);
        if (waitingTasks.length > 0 || startedTasks) setStartButtonEnabled(() => true);
        else setStartButtonEnabled(() => false);
    }, [props.tasks, startedTasks, totalTasks]);

    React.useEffect(() => {
        const tmpTasks = props.status.temp_tasks;
        tmpTasks.forEach((task) => {
            dispatch(addTask(task, false));
        });
        if (tmpTasks.length > 0) dispatch(setTempTasks([]));
    }, [props.status]);

    function handleStartStop() {
        if (!startedTasks) {
            setTotalTasks(() => props.tasks.filter((task) => task.status === "WAITING" || task.status === "RUNNING").length);
            props.tasks.forEach((task) => {
                if (task.status === "WAITING") {
                    const taskId = task.id;
                    dispatch(startTask(taskId));
                }
            });
        } else {
            props.tasks.forEach((task) => {
                if (task.status === "READY") {
                    const taskId = task.id;
                    dispatch(stopTask(taskId));
                }
            });
        }
        setStartedTasks((prev) => !prev);
    }

    return (
        <Stack direction="row" spacing={2}>
            <div style={{ width: "60%" }}>
                <TaskTable />
                <Button
                    startIcon={startedTasks ? <CancelIcon /> : <PlayArrowIcon />}
                    disabled={!startButtonEnabled}
                    variant="contained"
                    size="large"
                    sx={{ width: "100%" }}
                    onClick={(e) => handleStartStop()}
                    color={startedTasks ? "error" : "success"}
                >
                    {startedTasks ? "Stop" : "Start"}
                </Button>
            </div>
            <Box alignItems={"center"}>
                <Box width={"20vw"} height={"20vh"}>
                    <Typography fontSize={"3em"}>Running task</Typography>
                    <CircularProgressbar value={percentage} text={`${Math.round(percentage)}%`} />
                </Box>
            </Box>
        </Stack>
    );
};

export default connect((state) => ({
    status: state.status,
    tasks: state.tasks,
}))(FinishPage);
