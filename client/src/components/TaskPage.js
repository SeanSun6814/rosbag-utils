import { Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import * as TASK from "../reducers/task";
import BagFilterTask from "./BagFilterTask";
import PointcloudTask from "./PointcloudTask";

const TaskPage = (props) => {
    let title, page;
    if (props.status.task_type === TASK.FILTER_BAG_TASK) {
        title = "Add Filter Bag Task";
        page = <BagFilterTask />;
    } else if (props.status.task_type === TASK.POINTCLOUD_EXPORT_TASK) {
        const numSelected = Object.keys(props.topics).filter((topic) => props.topics[topic].selected).length;
        if (numSelected === 1) {
            title = "Add Export Pointcloud Task";
        } else {
            title = "Add " + numSelected + " Export Pointcloud Tasks";
        }
        page = <PointcloudTask />;
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
    topics: state.topics,
}))(TaskPage);
