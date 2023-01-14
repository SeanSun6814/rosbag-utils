import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { setBagOpening, setPageComplete } from "../actions/status";
import { useDispatch, connect } from "react-redux";
import { addTask, startTask, makeOpenBagTask } from "../actions/task";
import BagTable from "./BagTable";

const BagPage = (props) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setPageComplete(false));
        dispatch(setBagOpening(true));
        const task = addTask(makeOpenBagTask(), true);
        const taskId = task.task.id;
        dispatch(task);
        dispatch(startTask(taskId));
    };

    React.useEffect(() => {
        dispatch(setPageComplete(props.bags.length > 0));
    }, [props.bags]);

    return (
        <Stack direction="column" spacing={2}>
            <BagTable />
            <LoadingButton loading={props.status.bag_opening} startIcon={<AddIcon />} variant="contained" size="large" onClick={(e) => handleClick()}>
                Add Bags
            </LoadingButton>
        </Stack>
    );
};

export default connect((state) => ({
    status: state.status,
    bags: state.bags,
}))(BagPage);
