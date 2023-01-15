import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Grid, Paper } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import * as TASK from "../reducers/task";
import { setPageNumber, setTaskType } from "../reducers/status";

const TaskTypes = (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    let filterBagEnabled = true;
    let exportPointcloudEnabled = true;
    let exportVideoEnabled = true;
    let measureTrajectoryEnabled = true;
    let numSelected = 0;
    Object.keys(props.topics).forEach((topicName) => {
        const topic = props.topics[topicName];
        if (topic.selected) {
            if (topic.type !== "sensor_msgs/PointCloud2") exportPointcloudEnabled = false;
            if (topic.type !== "sensor_msgs/Image") exportVideoEnabled = false;
            if (topic.type !== "nav_msgs/Odometry") measureTrajectoryEnabled = false;
            numSelected++;
        }
    });

    filterBagEnabled &&= numSelected > 0;
    exportPointcloudEnabled &&= numSelected > 0;
    exportVideoEnabled &&= numSelected > 0;
    measureTrajectoryEnabled &&= numSelected > 0;

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
            <Paper elevation={12} sx={{ borderRadius: "15px", marginTop: "50px", marginBottom: "50px", padding: "15px", backgroundColor: "inactive" }}>
                <Typography sx={{ fontSize: "2em", textAlign: "center", marginBottom: "15px" }}>Tasks</Typography>
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
                        <Typography>Filter out the useful topics from rosbags. We'll also generate some important statistics about your data. </Typography>
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
                        <Typography>Convert the cloud points from rosbags to the .las format.</Typography>
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
                        <Typography>Visualize the image topics from rosbags. We can also export the images as video to disk. </Typography>
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
                                            Add Task
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Visualize the image topics from rosbags. We can also export the images as video to disk. </Typography>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </Grid>
    );
};

export default connect((state) => ({
    topics: state.topics,
}))(TaskTypes);
