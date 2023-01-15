import * as React from "react";
import Button from "@mui/material/Button";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from "@mui/x-data-grid";
import { connect, useDispatch } from "react-redux";
import * as convert from "../utils/convert";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { renderProgress } from "./CellProgressBar";

import { renderStatus } from "./CellProgressChip";

const TaskTable = (props) => {
    const dispatch = useDispatch();
    const [useMoreInfo, setUseMoreInfo] = React.useState(false);
    const [displayFormat, setDisplayFormat] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    React.useEffect(() => {
        if (useMoreInfo)
            setColumns(() => [
                { field: "id", headerName: "#", minWidth: 75 },
                { field: "uuid", headerName: "Task ID", minWidth: 325 },
                { field: "type", headerName: "Task", minWidth: 200 },
                { field: "isSystem", headerName: "System Task", minWidth: 120 },
                { field: "startTime", headerName: "Start Time", minWidth: 200 },
                { field: "endTime", headerName: "End Time", minWidth: 200 },
                { field: "status", headerName: "Status", minWidth: 125 },
                { field: "progress", headerName: "Progress", renderCell: renderProgress, minWidth: 200 },
            ]);
        else
            setColumns(() => [
                { field: "id", headerName: "#", flex: 0.5 },
                { field: "type", headerName: "Task", flex: 2 },
                { field: "status", headerName: "Status", flex: 1, renderCell: renderStatus },
                { field: "progress", headerName: "Progress", flex: 1.4, renderCell: renderProgress },
            ]);
    }, [useMoreInfo]);

    React.useEffect(() => {
        setDisplayFormat(() =>
            props.tasks
                .filter((task) => useMoreInfo || !task.isSystem)
                .map((task, idx) => {
                    return {
                        ...task,
                        id: idx + 1,
                        uuid: task.id,
                        type: task.config.action,
                        startTime: task.startTime < 0 ? "Never" : convert.getDateTime(task.startTime, true),
                        endTime: task.endTime < 0 ? "Never" : convert.getDateTime(task.endTime, true),
                        progress: task.progress,
                    };
                })
        );
    }, [props.tasks, useMoreInfo]);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Button variant="text" size="small" onClick={() => setUseMoreInfo(() => !useMoreInfo)} startIcon={<FolderOpenIcon />}>
                    {useMoreInfo ? "Less" : "More"} info
                </Button>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (
        <div style={{ width: "100%" }}>
            <div style={{ height: "calc(100vh - 290px)" }}>
                <DataGrid
                    rows={displayFormat}
                    columns={columns}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </div>
        </div>
    );
};
export default connect((state) => ({
    tasks: state.tasks,
    status: state.status,
}))(TaskTable);
