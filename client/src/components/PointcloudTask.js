import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, TextField, Typography } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import * as TASK from "../reducers/task";
import { Stack } from "@mui/system";
import { getDateTime } from "../utils/convert";
import { setPageComplete, setTempTasks } from "../reducers/status";

let selectedBags, selectedTopics;
let collapseAxisEnabledGlobal, collapseAxisGlobal, trimCloudEnabledGlobal, trimCloudGlobal, downsampleFactorGlobal, maxPointsPerFileGlobal;

const PointcloudTask = (props) => {
    const dispatch = useDispatch();
    const [collapseAxisEnabled, setCollapseAxisEnabled] = React.useState(false);
    const [collapseAxis, setCollapseAxis] = React.useState("X");
    const [trimCloudEnabled, setTrimCloudEnabled] = React.useState(false);
    const [trimCloud, setTrimCloud] = React.useState({ xMin: -100, xMax: 100, yMin: -100, yMax: 100, zMin: -100, zMax: 100 });
    const [downsampleFactor, setDownsampleFactor] = React.useState(1);
    const [maxPointsPerFile, setMaxPointsPerFile] = React.useState(50000000);

    React.useEffect(() => {
        dispatch(setPageComplete(true));
        return () => {
            const getRandomId = () => Math.floor(Math.random() * 16534 + 4096).toString(16);
            const targetTopics = selectedTopics;
            let tempTasks = [];

            targetTopics.forEach((topic) => {
                const sourcePath = selectedBags[0].path.replace(/\/[^\/]+$/, "");
                const pathIns = selectedBags.filter((bag) => bag.selected).map((bag) => bag.path);
                const topic_clean_name = topic.replace(/\//g, "_");
                const filename = (topic_clean_name + "_").replace(/__/g, "_").replace(/_$/g, "").replace(/^_/, "");
                const pathOut = sourcePath + "/pointcloud_" + getDateTime() + "_" + getRandomId() + "/" + filename;

                tempTasks.push({
                    action: TASK.POINTCLOUD_EXPORT_TASK,
                    paths: pathIns,
                    targetTopic: topic,
                    outPathNoExt: pathOut,
                    maxPointsPerFile: maxPointsPerFileGlobal,
                    collapseAxis: collapseAxisEnabledGlobal ? collapseAxisGlobal : "",
                    speed: downsampleFactorGlobal,
                    trimCloud: trimCloudEnabledGlobal ? trimCloudGlobal : "",
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
        collapseAxisEnabledGlobal = collapseAxisEnabled;
    }, [collapseAxisEnabled]);
    React.useEffect(() => {
        collapseAxisGlobal = collapseAxis;
    }, [collapseAxis]);
    React.useEffect(() => {
        trimCloudEnabledGlobal = trimCloudEnabled;
    }, [trimCloudEnabled]);
    React.useEffect(() => {
        trimCloudGlobal = trimCloud;
    }, [trimCloud]);
    React.useEffect(() => {
        downsampleFactorGlobal = downsampleFactor;
    }, [downsampleFactor]);
    React.useEffect(() => {
        maxPointsPerFileGlobal = maxPointsPerFile;
    }, [maxPointsPerFile]);

    const handleCollapseAxisSwitch = (event) => {
        setCollapseAxisEnabled(() => event.target.checked);
    };

    const handleTrimCloudSwitch = (event) => {
        setTrimCloudEnabled(() => event.target.checked);
    };

    const handleTrimCloudChange = (event, key) => {
        setTrimCloud((prev) => {
            return {
                ...prev,
                [key]: event.target.value,
            };
        });
    };

    const handleDownsampleFactorChange = (event) => {
        setDownsampleFactor(() => event.target.value);
    };

    const handleMaxPointsPerFileChange = (event) => {
        setMaxPointsPerFile(() => event.target.value);
    };

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
                        Collapse axis
                    </Typography>
                    <Typography marginTop={"10px"} fontSize={"1em"}>
                        The resulting pointcloud will be flattened in the selected axis.
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch defaultChecked={false} onClick={handleCollapseAxisSwitch} />}
                            label={collapseAxisEnabled ? "Enabled" : "Disabled"}
                        />
                    </FormGroup>
                    <FormControl fullWidth sx={{ marginTop: "30px" }} disabled={!collapseAxisEnabled}>
                        <InputLabel id="collapseAxisDropdownLabel">Axis</InputLabel>
                        <Select labelId="collapseAxisDropdownLabel" id="collapseAxisDropdown" value={collapseAxis} label="Axis" onChange={() => {}}>
                            <MenuItem key={"X"} value={"X"} onClick={() => setCollapseAxis(() => "X")}>
                                X
                            </MenuItem>
                            <MenuItem key={"Y"} value={"Y"} onClick={() => setCollapseAxis(() => "Y")}>
                                Y
                            </MenuItem>
                            <MenuItem key={"Z"} value={"Z"} onClick={() => setCollapseAxis(() => "Z")}>
                                Z
                            </MenuItem>
                        </Select>
                    </FormControl>
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
                        Downsample pointcloud
                    </Typography>
                    <Typography marginTop={"10px"} fontSize={"1em"}>
                        Only include one frame for every how many frames
                    </Typography>
                    <TextField
                        sx={{ marginTop: "30px" }}
                        label="Downsample Factor"
                        type="number"
                        value={downsampleFactor}
                        onChange={(e) => {
                            handleDownsampleFactorChange(e);
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
                        Split point cloud into multiple files
                    </Typography>
                    <Typography marginTop={"10px"} fontSize={"1em"}>
                        Max number of points per file (lower = less memory usage while exporting)
                    </Typography>
                    <TextField
                        sx={{ marginTop: "30px" }}
                        label="Max points"
                        type="number"
                        value={maxPointsPerFile}
                        onChange={(e) => {
                            handleMaxPointsPerFileChange(e);
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
                        Trim pointcloud
                    </Typography>
                    <Typography marginTop={"10px"} fontSize={"1em"}>
                        Only export the points within range
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch defaultChecked={false} onClick={handleTrimCloudSwitch} />}
                            label={trimCloudEnabled ? "Enabled" : "Disabled"}
                        />
                    </FormGroup>
                    <TextField
                        sx={{ marginTop: "30px" }}
                        label="X Min"
                        type="number"
                        value={trimCloud.xMin}
                        onChange={(e) => {
                            handleTrimCloudChange(e, "xMin");
                        }}
                        disabled={!trimCloudEnabled}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        sx={{ marginTop: "30px", marginLeft: "20px" }}
                        label="X Max"
                        type="number"
                        value={trimCloud.xMax}
                        onChange={(e) => {
                            handleTrimCloudChange(e, "xMax");
                        }}
                        disabled={!trimCloudEnabled}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />
                    <TextField
                        sx={{ marginTop: "30px" }}
                        label="Y Min"
                        type="number"
                        value={trimCloud.yMin}
                        onChange={(e) => {
                            handleTrimCloudChange(e, "yMin");
                        }}
                        disabled={!trimCloudEnabled}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        sx={{ marginTop: "30px", marginLeft: "20px" }}
                        label="Y Max"
                        type="number"
                        value={trimCloud.yMax}
                        onChange={(e) => {
                            handleTrimCloudChange(e, "yMax");
                        }}
                        disabled={!trimCloudEnabled}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br />
                    <TextField
                        sx={{ marginTop: "30px" }}
                        label="Z Min"
                        type="number"
                        value={trimCloud.zMin}
                        onChange={(e) => {
                            handleTrimCloudChange(e, "zMin");
                        }}
                        disabled={!trimCloudEnabled}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        sx={{ marginTop: "30px", marginLeft: "20px" }}
                        label="Z Max"
                        type="number"
                        value={trimCloud.zMax}
                        onChange={(e) => {
                            handleTrimCloudChange(e, "zMax");
                        }}
                        disabled={!trimCloudEnabled}
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
}))(PointcloudTask);
