import * as React from "react";
import DoneIcon from "@mui/icons-material/Done";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ErrorIcon from '@mui/icons-material/Error';
import { blue, green, orange, red } from "@mui/material/colors";
import { Chip } from "@mui/material";

function CellProgressChip(params) {
    if (params.value === "COMPLETE") {
        return {
            icon: <DoneIcon style={{ fill: green[800] }} />,
            label: "Done",
            style: {
                borderColor: green[800],
            },
        };
    } else if (params.value === "WAITING") {
        return {
            icon: <ScheduleIcon style={{ fill: orange[800] }} />,
            label: "Waiting",
            style: {
                borderColor: orange[800],
                borderSize: 2,
            },
        };
    } else if (params.value === "RUNNING") {
        return {
            icon: <PlayArrowIcon style={{ fill: blue[800] }} />,
            label: "Running",
            style: {
                borderColor: blue[800],
            },
        };
    } else if (params.value === "READY") {
        return {
            icon: <ScheduleIcon style={{ fill: orange[800] }} />,
            label: "Queued",
            style: {
                borderColor: orange[800],
            },
        };
    } else if (params.value === "ERROR") {
        return {
            icon: <ErrorIcon style={{ fill: red[800] }} />,
            label: "Error",
            style: {
                borderColor: red[800],
            },
        };
    }
}

export function renderStatus(params) {
    return <Chip variant="outlined" {...CellProgressChip(params)} />;
}
