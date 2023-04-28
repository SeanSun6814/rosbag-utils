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
import * as convert from "../../utils/convert";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { renderProgress } from "./../rosbagUtils/CellProgressBar";
import { renderStatus } from "./../rosbagUtils/CellProgressChip";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeTask } from "../../reducers/task";
import { IconButton } from "@mui/material";
import ModalViewCode from "../rosbagUtils/ModalViewCode";

const TaskTable = (props) => {
    const dispatch = useDispatch();
    const [useMoreInfo, setUseMoreInfo] = React.useState(false);
    const [displayFormat, setDisplayFormat] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const [showCode, setShowCode] = React.useState(false);
    const [content, setContent] = React.useState("");

    React.useEffect(() => {
        const renderButton = (params) => {
            return (
                <IconButton
                    // disabled={params.value == "RUNNING"}
                    disabled={false}
                    color="primary"
                    onClick={(e) => {
                        dispatch(removeTask(params.id));
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            );
        };
        if (useMoreInfo)
            setColumns(() => [
                { field: "number", headerName: "#", minWidth: 75 },
                { field: "id", headerName: "Task ID", minWidth: 325 },
                { field: "type", headerName: "Task", minWidth: 200 },
                { field: "isSystem", headerName: "System Task", minWidth: 120 },
                { field: "startTime", headerName: "Start Time", minWidth: 200 },
                { field: "endTime", headerName: "End Time", minWidth: 200 },
                { field: "status", headerName: "Status", minWidth: 125 },
                { field: "progress", headerName: "Progress", renderCell: renderProgress, minWidth: 200 },
                { field: "actions", headerName: "Actions", minWidth: 75, renderCell: renderButton },
            ]);
        else
            setColumns(() => [
                { field: "number", headerName: "#", flex: 0.5, minWidth: 1 },
                { field: "type", headerName: "Task", flex: 2, minWidth: 1 },
                { field: "status", headerName: "Status", flex: 1, renderCell: renderStatus, minWidth: 1 },
                { field: "progress", headerName: "Progress", flex: 1.2, renderCell: renderProgress, minWidth: 1 },
                { field: "actions", headerName: "Actions", flex: 0.8, renderCell: renderButton, minWidth: 1 },
            ]);

        setDisplayFormat(() =>
            props.tasks
                .filter((task) => useMoreInfo || !task.isSystem)
                .map((task, idx) => {
                    return {
                        ...task,
                        number: idx + 1,
                        id: task.id,
                        type: task.config.action,
                        startTime: task.startTime < 0 ? "Never" : convert.getDateTime(task.startTime, true),
                        endTime: task.endTime < 0 ? "Never" : convert.getDateTime(task.endTime, true),
                        progress: task.progress,
                        actions: task.status === "RUNNING" ? "RUNNING" : "IDLE",
                    };
                })
        );
    }, [props.tasks, useMoreInfo, dispatch]);

    const clearCompletedTasks = () => {
        props.tasks.forEach((task) => {
            if (task.status === "COMPLETE") dispatch(removeTask(task.id));
        });
    };

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
                <Button variant="text" size="small" onClick={() => clearCompletedTasks()} startIcon={<DeleteIcon />}>
                    Clear Completed
                </Button>
            </GridToolbarContainer>
        );
    }

    return (
        <div style={{ width: "100%" }}>
            <div style={{ height: "calc(100vh - 290px)" }}>
                <DataGrid
                    disableSelectionOnClick
                    rows={displayFormat}
                    columns={columns}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    onRowClick={(e) => {
                        console.log("Clicked on row: ", e.id);
                        setContent(
                            () =>
                                JSON.stringify(
                                    props.tasks.find((task) => task.id === e.id),
                                    null,
                                    4
                                ) + "\n"
                        );
                        setShowCode(() => true);
                    }}
                />
            </div>
            <ModalViewCode open={showCode} setOpen={setShowCode} content={content} language={"javascript"} />
        </div>
    );
};
export default connect((state) => ({
    tasks: state.tasks,
    status: state.status,
}))(TaskTable);
