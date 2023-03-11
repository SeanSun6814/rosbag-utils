import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { FormControlLabel, FormGroup, Switch, TextField, Typography } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import * as TASK from "../reducers/task";
import { getDateTime } from "../utils/convert";
import { setPageComplete, setTempTasks } from "../reducers/status";

let selectedBags, selectedTopics;
let configGlobal;

const ExportVideoTask = (props) => {
    const dispatch = useDispatch();
    const [config, setConfig] = React.useState({
        videoSpeed: 1,
        fps: 30,
        invertImage: false,
        includeTimestampSeconds: true,
        includeTimestampROS: false,
        useManual16BitRange: false,
        brightness16BitMin: 0,
        brightness16BitMax: 65535,
        livePreview: true,
    });

    React.useEffect(() => {
        dispatch(setPageComplete(true));
        return () => {
            const targetTopics = selectedTopics;
            let tempTasks = [];
            const getRandomId = () => Math.floor(Math.random() * 16534 + 4096).toString(16);

            targetTopics.forEach((topic) => {
                const sourcePath = selectedBags[0].path.replace(/\/[^\/]+$/, "");
                const pathIns = selectedBags.filter((bag) => bag.selected).map((bag) => bag.path);
                const topic_clean_name = topic.replace(/\//g, "_");
                const filename = (topic_clean_name + "_").replace(/__/g, "_").replace(/_$/g, "").replace(/^_/, "") + ".mp4";
                const pathOut = sourcePath + "/video_" + getDateTime() + "_" + getRandomId() + "/" + filename;
                let printTimestamp = "none";
                if (configGlobal.includeTimestampSeconds && configGlobal.includeTimestampROS) printTimestamp = "both";
                else if (configGlobal.includeTimestampSeconds) printTimestamp = "sec";
                else if (configGlobal.includeTimestampROS) printTimestamp = "timestamp";

                tempTasks.push({
                    action: TASK.VIDEO_EXPORT_TASK,
                    paths: pathIns,
                    pathOut: pathOut,
                    targetTopic: topic,
                    speed: configGlobal.videoSpeed,
                    fps: configGlobal.fps,
                    printTimestamp,
                    invertImage: configGlobal.invertImage,
                    useManual16BitRange: configGlobal.useManual16BitRange,
                    rangeFor16Bit: [configGlobal.brightness16BitMin, configGlobal.brightness16BitMax],
                    livePreview: configGlobal.livePreview,
                });
            });
            dispatch(setTempTasks(tempTasks));
        };
    }, []);

    React.useEffect(() => {
        selectedBags = props.bags.filter((bag) => bag.selected);
    }, [props.bags]);
    React.useEffect(() => {
        selectedTopics = Object.keys(props.topics).filter((topic) => props.topics[topic].selected);
    }, [props.topics]);
    React.useEffect(() => {
        configGlobal = config;
    }, [config]);

    return (
        <Box sx={{ width: "100%", height: "calc(100vh - 18em)", overflow: "hidden", overflowY: "scroll" }}>
            <Grid container rowSpacing={1} justify="space-between">
                <Grid
                    width={"fit-content"}
                    minWidth={"300px"}
                    height={"fit-content"}
                    minHeight={"200px"}
                    padding={"25px"}
                    borderRadius={"15px"}
                    boxShadow={"10"}
                    xs={6}
                    margin={"35px"}
                >
                    <Typography marginBottom={"10px"} fontSize={"1.6em"}>
                        Video speed
                    </Typography>
                    <Typography marginTop={"10px"} fontSize={"1em"}>
                        Speed up video by how many times
                    </Typography>
                    <TextField
                        sx={{ marginTop: "30px" }}
                        label="Speed up factor"
                        type="number"
                        value={config.videoSpeed}
                        onChange={(e) => {
                            setConfig((prev) => ({
                                ...prev,
                                videoSpeed: e.target.value,
                            }));
                        }}
                        InputProps={{
                            inputProps: { min: 1 },
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid
                    width={"fit-content"}
                    minWidth={"300px"}
                    height={"fit-content"}
                    minHeight={"200px"}
                    padding={"25px"}
                    borderRadius={"15px"}
                    boxShadow={"10"}
                    xs={6}
                    margin={"35px"}
                >
                    <Typography marginBottom={"10px"} fontSize={"1.6em"}>
                        Frames Per Second
                    </Typography>
                    <Typography marginTop={"10px"} fontSize={"1em"}>
                        The FPS of the output video
                    </Typography>
                    <TextField
                        sx={{ marginTop: "30px" }}
                        label="FPS"
                        type="number"
                        value={config.fps}
                        onChange={(e) => {
                            setConfig((prev) => ({
                                ...prev,
                                fps: e.target.value,
                            }));
                        }}
                        InputProps={{
                            inputProps: { min: 1 },
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid
                    width={"fit-content"}
                    minWidth={"300px"}
                    height={"fit-content"}
                    minHeight={"200px"}
                    padding={"25px"}
                    borderRadius={"15px"}
                    boxShadow={"10"}
                    xs={6}
                    margin={"35px"}
                >
                    <Typography marginBottom={"10px"} fontSize={"1.6em"}>
                        Live Preview
                    </Typography>
                    <Typography marginTop={"10px"} marginBottom={"10px"} fontSize={"1em"}>
                        View the video as it is being exported
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={config.livePreview}
                                    onClick={(e) => {
                                        setConfig((prev) => ({
                                            ...prev,
                                            livePreview: e.target.checked,
                                        }));
                                    }}
                                />
                            }
                            label={config.livePreview ? "Enabled" : "Disabled"}
                        />
                    </FormGroup>
                </Grid>
                <Grid
                    width={"fit-content"}
                    minWidth={"300px"}
                    height={"fit-content"}
                    minHeight={"200px"}
                    padding={"25px"}
                    borderRadius={"15px"}
                    boxShadow={"10"}
                    xs={6}
                    margin={"35px"}
                >
                    <Typography marginBottom={"10px"} fontSize={"1.6em"}>
                        Invert Image
                    </Typography>
                    <Typography marginTop={"10px"} marginBottom={"10px"} fontSize={"1em"}>
                        Invert the colors in the video
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={config.invertImage}
                                    onClick={(e) => {
                                        setConfig((prev) => ({
                                            ...prev,
                                            invertImage: e.target.checked,
                                        }));
                                    }}
                                />
                            }
                            label={config.invertImage ? "Enabled" : "Disabled"}
                        />
                    </FormGroup>
                </Grid>
                <Grid
                    width={"fit-content"}
                    minWidth={"300px"}
                    height={"fit-content"}
                    minHeight={"200px"}
                    padding={"25px"}
                    borderRadius={"15px"}
                    boxShadow={"10"}
                    xs={6}
                    margin={"35px"}
                >
                    <Typography marginBottom={"10px"} fontSize={"1.6em"}>
                        Include timestamp
                    </Typography>
                    <Typography marginTop={"10px"} marginBottom={"10px"} fontSize={"1em"}>
                        Print the timestamp into the video
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={config.includeTimestampSeconds}
                                    onClick={(e) => {
                                        setConfig((prev) => ({
                                            ...prev,
                                            includeTimestampSeconds: e.target.checked,
                                        }));
                                    }}
                                />
                            }
                            label={"Display Seconds"}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={config.includeTimestampROS}
                                    onClick={(e) => {
                                        setConfig((prev) => ({
                                            ...prev,
                                            includeTimestampROS: e.target.checked,
                                        }));
                                    }}
                                />
                            }
                            label={"Display ROS Timestamp"}
                        />
                    </FormGroup>
                </Grid>
                <Grid
                    width={"fit-content"}
                    minWidth={"300px"}
                    height={"fit-content"}
                    minHeight={"200px"}
                    padding={"25px"}
                    borderRadius={"15px"}
                    boxShadow={"10"}
                    xs={6}
                    margin={"35px"}
                >
                    <Typography marginBottom={"10px"} fontSize={"1.6em"}>
                        Brightness Range (16-bit only)
                    </Typography>
                    <Typography marginTop={"10px"} fontSize={"1em"}>
                        Manually specify the brightness range of the 16-bit image to display
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={config.useManual16BitRange}
                                    onClick={(e) => {
                                        setConfig((prev) => ({
                                            ...prev,
                                            useManual16BitRange: e.target.checked,
                                        }));
                                    }}
                                />
                            }
                            label={config.useManual16BitRange ? "Enabled" : "Disabled"}
                        />
                    </FormGroup>
                    <TextField
                        sx={{ marginTop: "30px", width: "150px" }}
                        label="Min brightness"
                        type="number"
                        value={config.brightness16BitMin}
                        disabled={!config.useManual16BitRange}
                        onChange={(e) => {
                            setConfig((prev) => ({
                                ...prev,
                                brightness16BitMin: e.target.value,
                            }));
                        }}
                        InputProps={{
                            inputProps: { min: 0, max: 65535 },
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        sx={{ marginTop: "30px", marginLeft: "20px", width: "150px" }}
                        label="Max brightness"
                        type="number"
                        value={config.brightness16BitMax}
                        disabled={!config.useManual16BitRange}
                        onChange={(e) => {
                            setConfig((prev) => ({
                                ...prev,
                                brightness16BitMax: e.target.value,
                            }));
                        }}
                        InputProps={{
                            inputProps: { min: 0, max: 65535 },
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default connect((state) => ({
    bags: state.bags,
    topics: state.topics,
}))(ExportVideoTask);
