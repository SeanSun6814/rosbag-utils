import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { setBagOpening, setPageComplete } from "../../reducers/status";
import { useDispatch, connect } from "react-redux";
import { addTask, startTask, OPEN_BAG_TASK } from "../../reducers/task";
import BagTable from "./BagTable";
import { addAllTopicsFromBags, clearTopics } from "../../reducers/topic";


let selectedBags;

const BagPage = (props) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setBagOpening(true));
        const task = addTask({
            action: OPEN_BAG_TASK,
        }, true);
        const taskId = task.task.id;
        dispatch(task);
        dispatch(startTask(taskId));
    };

    React.useEffect(() => {
        dispatch(setPageComplete(false));
        return () => {
            dispatch(clearTopics());
            dispatch(addAllTopicsFromBags(selectedBags));
        };
    }, [dispatch]);

    React.useEffect(() => {
        selectedBags = props.bags.filter((bag) => bag.selected);
        dispatch(setPageComplete(selectedBags.length > 0));
    }, [props.bags, dispatch]);

    return (
        <Stack direction="column" spacing={2}>
            <BagTable />
            <LoadingButton loading={props.status.server_busy} startIcon={<AddIcon />} variant="contained" size="large" onClick={() => handleClick()}>
                Add Bags
            </LoadingButton>
        </Stack>
    );
};

export default connect((state) => ({
    status: state.status,
    bags: state.bags,
}))(BagPage);
