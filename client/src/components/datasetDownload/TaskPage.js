import * as React from "react";
import Box from "@mui/material/Box";
import { FormControlLabel, FormGroup, Grid, Switch, TextField, Typography } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import { setPageComplete, setTempTasks } from "../../reducers/status";
import * as TASK from "../../reducers/task";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import FolderIcon from '@mui/icons-material/Folder';

let selectedDatasets, selectedTopics;
let configGlobal;
let taskId = "";

const TaskPage = (props) => {

    const dispatch = useDispatch();
    const [config, setConfig] = React.useState({
        convertToRosbag: true,
        downloadPath: "",
    });
    const [pathWarning, setPathWarning] = React.useState("");

    React.useEffect(() => {
        selectedDatasets = props.bags.filter((bag) => bag.selected);
    }, [props.bags]);
    React.useEffect(() => {
        selectedTopics = Object.keys(props.topics).filter((topic) => props.topics[topic].selected);
    }, [props.topics]);
    React.useEffect(() => {
        configGlobal = config;
        const regex = /^(\/[\w-]+)+$/;
        const pathValid = regex.test(config.downloadPath);
        const pathEmpty = config.downloadPath === "";

        setPathWarning(() => "");
        setPathWarning((prev) => (!pathValid ? "Invalid path" : prev));
        setPathWarning((prev) => (pathEmpty ? "Required" : prev));

        if (pathEmpty || !pathValid)
            dispatch(setPageComplete(false));
        else
            dispatch(setPageComplete(true));
    }, [config]);

    React.useEffect(() => {
        dispatch(setPageComplete(true));

        return () => {
            let tempTasks = [];
            selectedDatasets.forEach((dataset) => {
                selectedTopics.forEach((topic) => {
                    tempTasks.push({
                        action: TASK.DOWNLOAD_DATASET_TASK,
                        dataset: dataset.name,
                        topic: topic,
                        outPath: configGlobal.downloadPath,
                    });
                });
            });

            // if (convertToRosbag) {
            //     selectedBags.forEach((bag) => {

            // }
            dispatch(setTempTasks(tempTasks));
        };
    }, [dispatch]);

    function handleChooseFolder() {
        const task = TASK.addTask({ action: TASK.CHOOSE_FOLDER_TASK }, true);
        taskId = task.task.id;
        dispatch(task);
        dispatch(TASK.startTask(taskId));
    }

    React.useEffect(() => {
        const task = props.tasks.find((task) => task.id === taskId && task.status === "COMPLETE");
        if (!task) return;
        setConfig((config) => ({ ...config, downloadPath: task.result }));
    }, [props.tasks]);


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
                        <Typography marginTop={"10px"} fontSize={"1.2em"} width={"400px"}>
                            Where to save the dataset
                        </Typography>
                        {pathWarning !== "" && (
                            <Typography fontSize={"1em"} marginTop={"15px"} color={"orangered"}>
                                {pathWarning}
                            </Typography>)}
                        <Grid container direction="row" alignItems="center" marginTop={"30px"}>
                            <Grid width={"400px"}>
                                <TextField
                                    sx={{ paddingRight: "10px" }}
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
                            <Grid sx={{ height: "56px" }}>
                                <LoadingButton loading={props.status.server_busy} variant="contained" size="large" onClick={() => handleChooseFolder()} style={{ height: "100%" }}>
                                    <FolderIcon />
                                </LoadingButton>
                            </Grid>
                        </Grid>
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
    status: state.status,
    tasks: state.tasks,
}))(TaskPage);
