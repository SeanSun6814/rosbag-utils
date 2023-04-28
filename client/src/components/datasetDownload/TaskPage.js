import { Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import * as TASK from "../../reducers/task";
import BagFilterTask from "../rosbagUtils/tasks/BagFilterTask";
import ExportVideoTask from "../rosbagUtils/tasks/ExportVideoTask";
import PointcloudTask from "../rosbagUtils/tasks/PointcloudTask";
import MeasureTrajectoryTask from "../rosbagUtils/tasks/MeasureTrajectoryTask";
import ColorPointcloudTask from "../rosbagUtils/tasks/ColorPointcloudTask";
import DatasetReleaseTask from "../rosbagUtils/tasks/DatasetReleaseTask";

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
    } else if (props.status.task_type === TASK.POINTCLOUD_COLOR_TASK) {
        const numSelected = Object.keys(props.topics).filter((topic) => props.topics[topic].selected).length - 1;
        if (numSelected === 1) {
            title = "Add Confidence Pointcloud Task";
        } else {
            title = "Add " + numSelected + " Export Pointcloud Tasks";
        }
        page = <ColorPointcloudTask />;
    } else if (props.status.task_type === TASK.VIDEO_EXPORT_TASK) {
        const numSelected = Object.keys(props.topics).filter((topic) => props.topics[topic].selected).length;
        if (numSelected === 1) {
            title = "Add Export Video Task";
        } else {
            title = "Add " + numSelected + " Export Video Tasks";
        }
        page = <ExportVideoTask />;
    } else if (props.status.task_type === TASK.MEASURE_TRAJECTORY_TASK) {
        title = "Measure Trajectory Task";
        page = <MeasureTrajectoryTask />;
    } else if (props.status.task_type === TASK.DATASET_RELEASE_TASK) {
        title = "Dataset Release Task";
        page = <DatasetReleaseTask />;
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
