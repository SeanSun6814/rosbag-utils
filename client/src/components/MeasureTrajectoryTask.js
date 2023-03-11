import * as React from "react";
import Box from "@mui/material/Box";
import { FormControlLabel, FormGroup, Grid, Switch, Typography } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import { setPageComplete, setTempTasks } from "../reducers/status";
import * as TASK from "../reducers/task";
import { getDateTime } from "../utils/convert";

let selectedBags, selectedTopics;
let configGlobal;

const MeasureTrajectoryTask = (props) => {
    const dispatch = useDispatch();
    const [config, setConfig] = React.useState({
        exportPosition: true,
        exportVelocity: true,
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
            const sourcePath = selectedBags[0].path.replace(/\/[^\/]+$/, "");
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
    }, []);

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
                        Generate CSV files
                    </Typography>
                    <Typography marginTop={"10px"} fontSize={"1.2em"}>
                        Export trajectory position CSV
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch defaultChecked={config.exportPosition} onClick={(event) => setConfig({ ...config, exportPosition: event.target.checked })} />}
                            label={config.exportPosition ? "Enabled" : "Disabled"}
                        />
                    </FormGroup>
                    <Typography marginTop={"10px"} fontSize={"1.2em"}>
                        Export trajectory velocity CSV
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch defaultChecked={config.exportVelocity} onClick={(event) => setConfig({ ...config, exportVelocity: event.target.checked })} />}
                            label={config.exportVelocity ? "Enabled" : "Disabled"}
                        />
                    </FormGroup>
                </Grid></Grid>
            <br />
            <Typography variant="h5">
                Some statistics will be saved in <b>./result.json</b>.
            </Typography>
        </Box>
    );
};

export default connect((state) => ({
    bags: state.bags,
    topics: state.topics,
}))(MeasureTrajectoryTask);
