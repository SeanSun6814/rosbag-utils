import * as React from "react";
import Stack from "@mui/material/Stack";
import { setPageComplete } from "../../reducers/status";
import { useDispatch, connect } from "react-redux";
import { addTask, startTask, LOAD_DATASETS_TASK } from "../../reducers/task";
import BagTable from "./BagTable";
import { addAllTopicsFromDatasets, clearTopics } from "../../reducers/topic";
import { clearBags } from "../../reducers/rosbag";


let selectedBags;

const BagPage = (props) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        return () => {
            dispatch(setPageComplete(false));
            dispatch(clearTopics());
            dispatch(addAllTopicsFromDatasets(selectedBags));
        };
    }, [dispatch]);

    React.useEffect(() => {
        if (!props.status.ws_connected) return console.log("Waiting for websocket connection...");
        dispatch(clearBags());
        const task = addTask({ action: LOAD_DATASETS_TASK }, true);
        const taskId = task.task.id;
        dispatch(task);
        dispatch(startTask(taskId));
    }, [dispatch, props.status.ws_connected]);

    React.useEffect(() => {
        selectedBags = props.bags.filter((bag) => bag.selected);
        dispatch(setPageComplete(selectedBags.length > 0));
    }, [props.bags, dispatch]);

    return (
        <Stack direction="column" spacing={2}>
            <BagTable />
        </Stack>
    );
};

export default connect((state) => ({
    status: state.status,
    bags: state.bags,
}))(BagPage);
