import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import { setPageComplete, setTempTasks } from "../reducers/status";
import * as TASK from "../reducers/task";
import { getDateTime } from "../utils/convert";

let selectedBags, selectedTopics;

const BagFilterTask = (props) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        selectedBags = props.bags.filter((bag) => bag.selected);
    }, [props.bags]);
    React.useEffect(() => {
        selectedTopics = Object.keys(props.topics).filter((topic) => props.topics[topic].selected);
    }, [props.topics]);

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
            <br />
            <Typography variant="h5">
                The result will be saved in <b>./result.json</b>, click add task to continue...
            </Typography>
        </Box>
    );
};

export default connect((state) => ({
    bags: state.bags,
    topics: state.topics,
}))(BagFilterTask);
