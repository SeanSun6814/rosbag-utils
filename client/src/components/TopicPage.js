import * as React from "react";
import Stack from "@mui/material/Stack";
import { setBagOpening, setPageComplete } from "../actions/status";
import { useDispatch, connect } from "react-redux";
import { addTask, startTask, makeOpenBagTask } from "../actions/task";
import TopicTable from "./TopicTable";

const TopicPage = (props) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        // dispatch(setPageComplete(false));
        dispatch(setBagOpening(true));
        const task = addTask(makeOpenBagTask(), true);
        const taskId = task.task.id;
        dispatch(task);
        dispatch(startTask(taskId));
    };

    // React.useEffect(() => {
    //     dispatch(setPageComplete(props.bags.length > 0));
    // }, [props.bags]);

    return (
        <Stack direction="row" spacing={2}>
            <TopicTable />
        </Stack>
    );
};

export default connect((state) => ({
    status: state.status,
    bags: state.bags,
}))(TopicPage);
