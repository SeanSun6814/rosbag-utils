import * as React from "react";
import Stack from "@mui/material/Stack";
import { setBagOpening, setPageComplete } from "../reducers/status";
import { useDispatch, connect } from "react-redux";
import TopicTable from "./TopicTable";
import TaskTypes from "./TaskTypes";

const TopicPage = (props) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setPageComplete(false));
    }, []);

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
