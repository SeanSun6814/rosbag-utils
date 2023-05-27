import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Grid, Paper } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import * as TASK from "../../reducers/task";
import { setPageNumber, setTaskType } from "../../reducers/status";

const TaskTypes = (props) => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const [filterBagEnabled, setFilterBagEnabled] = React.useState(false);
    const [datasetReleaseEnabled, setDatasetReleaseEnabled] = React.useState(false);
    const [exportPointcloudEnabled, setExportPointcloudEnabled] = React.useState(false);
    const [exportVideoEnabled, setExportVideoEnabled] = React.useState(false);
    const [measureTrajectoryEnabled, setMeasureTrajectoryEnabled] = React.useState(false);
    const [confidenceCloudEnabled, setConfidenceCloudEnabled] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(() => (isExpanded ? panel : false));
    };

    React.useEffect(() => {
        let filterBagEnabled = true;
        let datasetReleaseEnabled = true;
        let exportPointcloudEnabled = true;
        let exportVideoEnabled = true;
        let measureTrajectoryEnabled = true;
        let confidenceCloudEnabled = true;
        let numStatSelected = 0;
        let numSelected = 0;
        Object.keys(props.topics).forEach((topicName) => {
            const topic = props.topics[topicName];
            if (topic.selected) {
                if (
                    topic.type !== "sensor_msgs/Imu" &&
                    topic.type !== "sensor_msgs/PointCloud2" &&
                    topic.type !== "sensor_msgs/Image" &&
                    topic.type !== "nav_msgs/Odometry" && 
                    topic.type !== "std_msgs/String" &&
                    topic.type !== "tf2_msgs/TFMessage" &&
                    topic.type !== "super_odometry_msgs/OptimizationStats"
                )
                    datasetReleaseEnabled = false;
                if (topic.type !== "sensor_msgs/PointCloud2") exportPointcloudEnabled = false;
                if (topic.type !== "sensor_msgs/Image") exportVideoEnabled = false;
                if (topic.type !== "nav_msgs/Odometry") measureTrajectoryEnabled = false;
                if (topic.type !== "sensor_msgs/PointCloud2" && topic.type !== "super_odometry_msgs/OptimizationStats") confidenceCloudEnabled = false;
                if (topic.type === "super_odometry_msgs/OptimizationStats") numStatSelected++;
                numSelected++;
            }
        });

        setFilterBagEnabled(() => filterBagEnabled && numSelected > 0);
        setDatasetReleaseEnabled(() => datasetReleaseEnabled && numSelected > 0);
        setExportPointcloudEnabled(() => exportPointcloudEnabled && numSelected > 0);
        setExportVideoEnabled(() => exportVideoEnabled && numSelected > 0);
        setMeasureTrajectoryEnabled(() => measureTrajectoryEnabled && numSelected > 0);
        setConfidenceCloudEnabled(() => confidenceCloudEnabled && numSelected > 1 && numStatSelected === 1);
    }, [props.topics]);

    const buttonHandler = (event, task) => {
        event.stopPropagation();
        if (task) {
            console.log(task);
            dispatch(setTaskType(task));
            dispatch(setPageNumber(2));
        }
    };

    return (
        <Grid container justifyContent="center" sx={{ width: "35vw" }}>
            <Paper
                elevation={12}
                sx={{ borderRadius: "15px", marginTop: "30px", padding: "15px", paddingBottom: "40px", backgroundColor: "inactive", height: "fit-content" }}
            >
                <Typography sx={{ fontSize: "2em", textAlign: "center", marginBottom: "15px" }}>Tasks</Typography>
                <Accordion expanded={expanded === "panel6"} onChange={handleChange("panel6")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6bh-content" id="panel6bh-header">
                        <Grid container>
                            <Grid item>
                                <Typography sx={{ fontSize: "1.2em" }}>Dataset Release</Typography>
                            </Grid>
                            <Grid item xs>
                                <Grid container direction="row-reverse">
                                    <Grid item>
                                        <Button
                                            disabled={!datasetReleaseEnabled}
                                            size="small"
                                            variant="contained"
                                            sx={{ marginRight: "10px" }}
                                            onClick={(e) => {
                                                buttonHandler(e, TASK.DATASET_RELEASE_TASK);
                                            }}
                                            onChange={buttonHandler}
                                        >
                                            Add task
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Export dataset in the format of Azure data release.</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                        <Grid container>
                            <Grid item>
                                <Typography sx={{ fontSize: "1.2em" }}>Filter Bag File</Typography>
                            </Grid>
                            <Grid item xs>
                                <Grid container direction="row-reverse">
                                    <Grid item>
                                        <Button
                                            disabled={!filterBagEnabled}
                                            size="small"
                                            variant="contained"
                                            sx={{ marginRight: "10px" }}
                                            onClick={(e) => {
                                                buttonHandler(e, TASK.FILTER_BAG_TASK);
                                            }}
                                            onChange={buttonHandler}
                                        >
                                            Add Task
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Filter out the useful topics from rosbags. Select multiple topics to keep them in the exported bag.</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                        <Grid container>
                            <Grid item>
                                <Typography sx={{ fontSize: "1.2em" }}>Export Point Cloud</Typography>
                            </Grid>
                            <Grid item xs>
                                <Grid container direction="row-reverse">
                                    <Grid item>
                                        <Button
                                            disabled={!exportPointcloudEnabled}
                                            size="small"
                                            variant="contained"
                                            sx={{ marginRight: "10px" }}
                                            onClick={(e) => {
                                                buttonHandler(e, TASK.POINTCLOUD_EXPORT_TASK);
                                            }}
                                            onChange={buttonHandler}
                                        >
                                            Add Task
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Convert the cloud points from rosbags to the .las format. Topics must be in the <b>sensor_msgs/PointCloud2</b> format. Note: if multiple
                            topics are selected, multiple tasks will be generated.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                        <Grid container>
                            <Grid item>
                                <Typography sx={{ fontSize: "1.2em" }}>Export Video</Typography>
                            </Grid>
                            <Grid item xs>
                                <Grid container direction="row-reverse">
                                    <Grid item>
                                        <Button
                                            disabled={!exportVideoEnabled}
                                            size="small"
                                            variant="contained"
                                            sx={{ marginRight: "10px" }}
                                            onClick={(e) => {
                                                buttonHandler(e, TASK.VIDEO_EXPORT_TASK);
                                            }}
                                            onChange={buttonHandler}
                                        >
                                            Add Task
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Visualize the image topics from rosbags. We can also export the images as video to disk. Topics must be in the <b>sensor_msgs/Image </b>
                            format. Note: if multiple topics are selected, multiple tasks will be generated.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                        <Grid container>
                            <Grid item>
                                <Typography sx={{ fontSize: "1.2em" }}>Measure Trajectory</Typography>
                            </Grid>
                            <Grid item xs>
                                <Grid container direction="row-reverse">
                                    <Grid item>
                                        <Button
                                            disabled={!measureTrajectoryEnabled}
                                            size="small"
                                            variant="contained"
                                            sx={{ marginRight: "10px" }}
                                            onClick={(e) => {
                                                buttonHandler(e, TASK.MEASURE_TRAJECTORY_TASK);
                                            }}
                                            onChange={buttonHandler}
                                        >
                                            Add task
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Measure the length of the trajectory, and export its linear and angular velocity. Topic must be in the <b>nav_msgs/Odometry </b>
                            format.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5bh-content" id="panel5bh-header">
                        <Grid container>
                            <Grid item>
                                <Typography sx={{ fontSize: "1.2em" }}>Confidence Cloud</Typography>
                            </Grid>
                            <Grid item xs>
                                <Grid container direction="row-reverse">
                                    <Grid item>
                                        <Button
                                            disabled={!confidenceCloudEnabled}
                                            size="small"
                                            variant="contained"
                                            sx={{ marginRight: "10px" }}
                                            onClick={(e) => {
                                                buttonHandler(e, TASK.POINTCLOUD_COLOR_TASK);
                                            }}
                                            onChange={buttonHandler}
                                        >
                                            Add task
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Color the point cloud according to confidence values! This task needs one <b>super_odometry_msgs/OptimizationStats</b> topic and can color many <b>sensor_msgs/PointCloud2</b> topics.</Typography>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </Grid>
    );
};

export default connect((state) => ({
    topics: state.topics,
}))(TaskTypes);
