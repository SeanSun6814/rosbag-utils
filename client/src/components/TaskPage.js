import { Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import * as TASK from "../reducers/task";
import BagFilterTask from "./BagFilterTask";

const TaskPage = (props) => {
    let title, page;
    if (props.status.task_type === TASK.FILTER_BAG_TASK) {
        title = "Filter Bag Task";
        page = <BagFilterTask />;
    } else if (props.status.task_type === TASK.POINTCLOUD_EXPORT_TASK) {
        title = "Export Pointcloud Task";
    } else if (props.status.task_type === TASK.VIDEO_EXPORT_TASK) {
        title = "Export Video Task";
    } else if (props.status.task_type === TASK.MEASURE_TRAJECTORY_TASK) {
        title = "Measure Trajectory Task";
    } else title = "Unknown Task";
    return (
        <div>
            <Typography sx={{ fontSize: "2em" }}>Configure {title}</Typography>
            {page}
        </div>
    );
};

export default connect((state) => ({
    status: state.status,
}))(TaskPage);
