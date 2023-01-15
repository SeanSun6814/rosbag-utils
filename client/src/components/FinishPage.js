import React from "react";
import { connect, useDispatch } from "react-redux";
import { setPageComplete, setTempTasks } from "../reducers/status";
import { addTask } from "../reducers/task";
import TaskTable from "./TaskTable";

const FinishPage = (props) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setPageComplete(true));
    }, []);

    React.useEffect(() => {
        const tmpTasks = props.status.temp_tasks;
        tmpTasks.forEach((task) => {
            dispatch(addTask(task, false));
        });
        if (tmpTasks.length > 0) dispatch(setTempTasks([]));
    }, [props.status]);

    return (
        <div>
            <TaskTable />
        </div>
    );
};

export default connect((state) => ({
    status: state.status,
}))(FinishPage);
