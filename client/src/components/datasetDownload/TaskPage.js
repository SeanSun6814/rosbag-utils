import * as React from "react";
import Box from "@mui/material/Box";
import { FormControlLabel, FormGroup, Grid, Switch, TextField, Typography } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import { setPageComplete, setTempTasks } from "../../reducers/status";
import * as TASK from "../../reducers/task";
import { getDateTime } from "../../utils/convert";


let selectedBags, selectedTopics;
let configGlobal;

const TaskPage = (props) => {

    const dispatch = useDispatch();
    const [config, setConfig] = React.useState({
        convertToRosbag: true,
        downloadPath: "",
    });

    React.useEffect(() => {
        selectedBags = props.bags.filter((bag) => bag.selected);
    }, [props.bags]);
    React.useEffect(() => {
        selectedTopics = Object.keys(props.topics).filter((topic) => props.topics[topic].selected);
    }, [props.topics]);
    React.useEffect(() => {
        configGlobal = config;
    }, [config]);

    React.useEffect(() => {
        dispatch(setPageComplete(true));

        return () => {
            const getRandomId = () => Math.floor(Math.random() * 16534 + 4096).toString(16);
            const targetTopics = selectedTopics;
            const sourcePath = selectedBags[0].path.replace(/\/[^/]+$/, "");
            const pathIns = selectedBags.filter((bag) => bag.selected).map((bag) => bag.path);
            let tempTasks = [];

            targetTopics.forEach((topic) => {
                const exportPath = sourcePath + "/trajectory_" + getDateTime() + "_" + getRandomId() + "/";
                tempTasks.push({
                    action: TASK.MEASURE_TRAJECTORY_TASK,
                    exportPosition: configGlobal.exportPosition,
                    exportVelocity: configGlobal.exportVelocity,
                    targetTopic: topic,
                    pathIns: pathIns,
                    pathOut: exportPath,
                });
            });
            dispatch(setTempTasks(tempTasks));
        };
    }, [dispatch]);

    return (
        <div>
            <Typography sx={{ fontSize: "2em" }}>Configure Download Task</Typography>

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
                        margin={"35px"}
                    >
                        <Typography marginBottom={"10px"} fontSize={"1.6em"}>
                            Download location
                        </Typography>
                        <Typography marginTop={"10px"} fontSize={"1em"} width={"400px"}>
                            Where to save the dataset
                        </Typography>
                        {/* {datasetNameWarning !== "" && (
                            <Typography fontSize={"1em"} marginTop={"15px"} color={"orangered"}>
                                {datasetNameWarning}
                            </Typography>)} */}
                        <TextField
                            sx={{ marginTop: "30px" }}
                            label="Download Path"
                            placeholder="/home/user/dataset/"
                            fullWidth
                            type="text"
                            value={config.downloadPath}
                            onChange={(e) => { setConfig((prevState) => ({ ...prevState, downloadPath: e.target.value })) }}
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
                        margin={"35px"}
                    >
                        <Typography marginBottom={"10px"} fontSize={"1.6em"}>
                            Dataset Format
                        </Typography>
                        <Typography marginTop={"10px"} marginBottom={"10px"} fontSize={"1.2em"}>
                            Save dataset as
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch defaultChecked={true} onClick={(event) => setConfig({ ...config, convertToRosbag: event.target.checked })} />}
                                label={config.convertToRosbag ? "ROS Bags" : "Individual files"}
                            />
                        </FormGroup>
                    </Grid></Grid>
            </Box>
        </div>
    );
};

export default connect((state) => ({
    bags: state.bags,
    topics: state.topics,
}))(TaskPage);
