import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import * as TASK from "../../../reducers/task";
import { getDateTime } from "../../../utils/convert";
import { setPageComplete, setTempTasks } from "../../../reducers/status";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "Topic", flex: 1, editable: false, sortable: false },
    { field: "type", headerName: "Type", flex: 1, editable: false, sortable: false },
    { field: "name", headerName: "Name", flex: 1, editable: true, sortable: false },
];

let selectedBags, selectedTopics;
let configGlobal;

const PointcloudTask = (props) => {
    const dispatch = useDispatch();
    const [duplicateWarning, setDuplicateWarning] = React.useState(false);
    const [config, setConfig] = React.useState({
        azureLink: "",
        datasetName: "",
        topicNames: [],
    });

    const handleTableEdit = React.useCallback((params) => {
        const id = params.id;
        const key = params.field;
        const value = params.value;
        setConfig((prevState) => {
            const newConfig = { ...prevState };
            const index = newConfig.topicNames.findIndex((item) => item.id === id);
            newConfig.topicNames[index][key] = value;
            return newConfig;
        });
    }, []);

    React.useEffect(() => {
        setConfig((prevState) => {
            const newConfig = { ...prevState };
            newConfig.topicNames = selectedTopics.map((topic) => {
                return {
                    id: topic,
                    type: props.topics[topic].type,
                    name: topic,
                };
            });
            return newConfig;
        });

        dispatch(setPageComplete(true));
        return () => {
            const getRandomId = () => Math.floor(Math.random() * 16534 + 4096).toString(16);
            const sourcePath = selectedBags[0].path.replace(/\/[^/]+$/, "");
            const pathIns = selectedBags.filter((bag) => bag.selected).map((bag) => bag.path);
            const pathOut = sourcePath + "/dataset_release_" + getDateTime() + "_" + getRandomId() + "/";
            let topics = {};
            configGlobal.topicNames.map((topic) => {
                topics[topic.id] = { name: topic.name, type: topic.type };
            });
            dispatch(
                setTempTasks([
                    {
                        action: TASK.DATASET_RELEASE_TASK,
                        datasetName: configGlobal.datasetName,
                        topics: topics,
                        pathIn: pathIns,
                        pathOut: pathOut,
                    },
                ])
            );
        };
    }, [dispatch, props.topics]);

    React.useEffect(() => {
        selectedBags = props.bags.filter((bag) => bag.selected);
    }, [props.bags]);
    React.useEffect(() => {
        selectedTopics = Object.keys(props.topics).filter((topic) => props.topics[topic].selected);
    }, [props.topics]);
    React.useEffect(() => {
        configGlobal = config;
        const dupTopicNames = new Set(config.topicNames.map((topic) => topic.name)).size !== config.topicNames.length;
        setDuplicateWarning(() => dupTopicNames);

        if (dupTopicNames) {
            dispatch(setPageComplete(false));
        } else if (config.azureLink === "") {
            dispatch(setPageComplete(false));
        } else if (config.datasetName === "") {
            dispatch(setPageComplete(false));
        } else {
            dispatch(setPageComplete(true));
        }

    }, [config, dispatch]);


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
                        Dataset Name
                    </Typography>
                    <Typography marginTop={"10px"} fontSize={"1em"} width={"400px"}>
                        A unique identifier for this dataset
                    </Typography>
                    <TextField
                        sx={{ marginTop: "30px" }}
                        label="Dataset Name"
                        placeholder="Subt Challenge Canary Dataset"
                        fullWidth
                        type="text"
                        value={config.datasetName}
                        onChange={(e) => { setConfig((prevState) => ({ ...prevState, datasetName: e.target.value })) }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid><Grid
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
                        Azure link
                    </Typography>
                    <Typography marginTop={"10px"} fontSize={"1em"} width={"600px"}>
                        Make a new folder on Azure and paste the share link here
                    </Typography>
                    <TextField
                        sx={{ marginTop: "30px" }}
                        label="Azure link"
                        placeholder="https://..."
                        fullWidth
                        type="text"
                        value={config.azureLink}
                        onChange={(e) => { setConfig((prevState) => ({ ...prevState, azureLink: e.target.value })) }}
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
                        Topic Names
                    </Typography>
                    <Typography marginTop={"10px"} fontSize={"1em"}>
                        Define friendly names that will be displayed in the dataset download app
                    </Typography>
                    {(duplicateWarning) ?
                        <Typography fontSize={"1em"} marginTop={"15px"} color={"orangered"}>
                            Duplicate topic names are not allowed.
                        </Typography>
                        : <div />}
                    <div style={{ width: "80vw", height: "70vh", marginTop: "15px" }}>
                        <DataGrid rows={config.topicNames} columns={columns} onCellEditCommit={handleTableEdit} />
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default connect((state) => ({
    bags: state.bags,
    topics: state.topics,
}))(PointcloudTask);
