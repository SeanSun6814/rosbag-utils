import * as React from "react";
import Stack from "@mui/material/Stack";
import { setPageComplete } from "../../reducers/status";
import { useDispatch, connect } from "react-redux";
import TopicTable from "./TopicTable";
import TaskTypes from "./TaskTypes";

const TopicPage = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setPageComplete(false));
    }, [dispatch]);

    return (
        <Stack direction="row" spacing={2}>
            <TopicTable />
            <TaskTypes />
        </Stack>
    );
};

export default connect((state) => ({
    status: state.status,
    bags: state.bags,
}))(TopicPage);
