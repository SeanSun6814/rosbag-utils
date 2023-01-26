import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, TextField, Typography } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { setPageComplete, setTempTasks } from "../reducers/status";
import * as TASK from "../reducers/task";
import { Stack } from "@mui/system";
import { getDateTime } from "../utils/convert";

const columns = [
    { field: "file", headerName: "Files", flex: 2.5, editable: false, sortable: false },
    { field: "duration", headerName: "Bag Duration", flex: 1, editable: false, sortable: false },
    { field: "cropStart", headerName: "Crop From", flex: 1, editable: true, sortable: false, type: "number" },
    { field: "cropEnd", headerName: "Crop To", flex: 1, editable: true, sortable: false, type: "number" },
];

let selectedBags, selectedTopics;
let mergeBagsGlobal, cropBagsGlobal, cropDataGlobal, autoCropDataGlobal, odometryTopicGlobal;

const BagFilterTask = (props) => {
    const dispatch = useDispatch();
    const [mergeBags, setMergeBags] = React.useState(false);
    const [cropBags, setCropBags] = React.useState("MANUAL");
    const [autoCropData, setAutoCropData] = React.useState({ start: 5, end: 5 });
    const [odometryTopic, setOdometryTopic] = React.useState("");
    const [cropData, setCropData] = React.useState([]);

    React.useEffect(() => {
        if (cropBags === "AUTO" && odometryTopic === "") dispatch(setPageComplete(false));
        else dispatch(setPageComplete(true));
    }, [cropBags, odometryTopic]);

    const handleCropEdit = React.useCallback((params) => {
        const id = params.id;
        const key = params.field;
        const value = params.value;
        setCropData((prevState) => {
            const newCropData = [...prevState];
            const index = newCropData.findIndex((item) => item.id === id);
            newCropData[index][key] = value;
            return newCropData;
        });
    }, []);
    React.useEffect(() => {
        selectedBags = props.bags.filter((bag) => bag.selected);
    }, [props.bags]);
    React.useEffect(() => {
        selectedTopics = Object.keys(props.topics).filter((topic) => props.topics[topic].selected);
    }, [props.topics]);
    React.useEffect(() => {
        mergeBagsGlobal = mergeBags;
    }, [mergeBags]);
    React.useEffect(() => {
        cropBagsGlobal = cropBags;
    }, [cropBags]);
    React.useEffect(() => {
        cropDataGlobal = cropData;
    }, [cropData]);
    React.useEffect(() => {
        autoCropDataGlobal = autoCropData;
    }, [autoCropData]);
    React.useEffect(() => {
        odometryTopicGlobal = odometryTopic;
    }, [odometryTopic]);

    React.useEffect(() => {
        setCropData((prevState) => {
            return selectedBags.map((bag) => {
                return {
                    ...bag,
                    file: bag.path.split("/").pop(),
                    cropStart: 0,
                    cropEnd: bag.duration,
                };
            });
        });

        return () => {
            const getRandomId = () => Math.floor(Math.random() * 16534 + 4096).toString(16);
            const targetTopics = selectedTopics;
            const sourcePath = selectedBags[0].path.replace(/\/[^\/]+$/, "");
            const exportPath = sourcePath + "/export_" + getDateTime() + "_" + getRandomId() + "/";
            const filenames = selectedBags.map((bag) => (mergeBagsGlobal ? "Combined.bag" : bag.path.replace(/^.*[\\\/]/, "")));
            const pathIns = selectedBags.filter((bag) => bag.selected).map((bag) => bag.path);
            const pathOuts = filenames.map((filename) => exportPath + filename);
            const cropDataSmall = cropDataGlobal.map((bag) => {
                return {
                    cropStart: bag.cropStart,
                    cropEnd: bag.cropEnd,
                };
            });
            const autoCropDataNum = {
                start: parseFloat(autoCropDataGlobal.start),
                end: parseFloat(autoCropDataGlobal.end),
            };
            dispatch(
                setTempTasks([
                    {
                        action: TASK.FILTER_BAG_TASK,
                        pathIn: pathIns,
                        pathOut: pathOuts,
                        cropType: cropBagsGlobal,
                        cropData: cropDataSmall,
                        targetTopics,
                        autoCropData: autoCropDataNum,
                        mergeBags: mergeBagsGlobal,
                        odometryTopic: odometryTopicGlobal,
                    },
                ])
            );
        };
    }, []);

    const handleToggleMergeBags = () => {
        setMergeBags((state) => !state);
    };

    const handleToggleCropBags = (newState) => {
        setCropBags((state) => newState);
    };

    const handleAutoCropData = (changes) => {
        setAutoCropData((prevState) => {
            return {
                ...prevState,
                ...changes,
            };
        });
    };

    return (
        <Box sx={{ width: "100%", height: "calc(100vh - 18em)", overflow: "hidden", overflowY: "scroll" }}>
            <Grid container sx={{}} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
                        Merge Bags
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch defaultChecked={false} onClick={handleToggleMergeBags} />}
                            label={mergeBags ? "Enabled" : "Disabled"}
                        />
                    </FormGroup>
                    <Typography marginTop={"10px"} fontSize={"1em"}>
                        The resulting filtered topics will be written into one bag file.
                    </Typography>
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
                        Crop Bags
                    </Typography>
                    <FormControl>
                        <RadioGroup defaultValue="MANUAL" name="radio-buttons-group">
                            <FormControlLabel value="MANUAL" control={<Radio />} label="Manual Cropping" onClick={() => handleToggleCropBags("MANUAL")} />
                            <FormControlLabel value="AUTO" control={<Radio />} label="Automatic Cropping" onClick={() => handleToggleCropBags("AUTO")} />
                        </RadioGroup>
                    </FormControl>
                    {cropBags === "MANUAL" ? (
                        <div style={{ width: "50vw", height: "50vh" }}>
                            <DataGrid rows={cropData} columns={columns} onCellEditCommit={handleCropEdit} />
                        </div>
                    ) : (
                        <Stack direction="column">
                            <FormControl fullWidth sx={{ marginTop: "30px" }}>
                                <InputLabel id="demo-simple-select-label">Odometry Topic</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={odometryTopic}
                                    label="Odometry Topic"
                                    onChange={() => {}}
                                >
                                    {Object.keys(props.topics)
                                        .filter((topic) => props.topics[topic].type === "nav_msgs/Odometry")
                                        .map((topic) => {
                                            return (
                                                <MenuItem key={topic} value={topic} onClick={() => setOdometryTopic(() => topic)}>
                                                    {topic}
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>
                            <TextField
                                sx={{ marginTop: "30px" }}
                                label="Start Time Margin"
                                type="number"
                                value={autoCropData.start}
                                onChange={(e) => {
                                    handleAutoCropData({ start: e.target.value });
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                sx={{ marginTop: "30px" }}
                                label="End Time Margin"
                                type="number"
                                value={autoCropData.end}
                                onChange={(e) => {
                                    handleAutoCropData({ end: e.target.value });
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Stack>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default connect((state) => ({
    bags: state.bags,
    topics: state.topics,
}))(BagFilterTask);
