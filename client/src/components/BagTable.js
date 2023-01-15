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
import { setSelectedBags } from "../reducers/rosbag";

const columns = [
    { field: "id", headerName: "#", flex: 0.5 },
    { field: "file", headerName: "Files", flex: 5 },
    { field: "time", headerName: "Start Time", flex: 2 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "size", headerName: "Size", flex: 1 },
    { field: "topic_count", headerName: "Topics", flex: 1 },
    { field: "messages", headerName: "Messages", flex: 1 },
];

let selectedBags;

const BagTable = (props) => {
    const dispatch = useDispatch();
    const [useFullPath, setUseFullPath] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [displayFormat, setDisplayFormat] = React.useState([]);

    React.useEffect(() => {
        setDisplayFormat(() =>
            props.bags.map((bag) => {
                return {
                    ...bag,
                    size: convert.humanFileSize(bag.size),
                    topic_count: Object.keys(bag.topics).length,
                    file: useFullPath ? bag.path : bag.path.split("/").pop(),
                    time: convert.getDateTime(bag.startTime * 1000, true),
                };
            })
        );
    }, [props.bags, useFullPath]);

    React.useEffect(() => {
        selectedBags = props.bags.filter((bag) => bag.selected);
    }, [props.bags]);

    React.useEffect(() => {
        setSelectionModel(selectedBags.map((bag) => bag.id));
    }, [props.status.server_busy]);

    React.useEffect(() => {
        dispatch(setSelectedBags(selectionModel));
    }, [selectionModel]);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Button variant="text" size="small" onClick={() => setUseFullPath(() => !useFullPath)} startIcon={<FolderOpenIcon />}>
                    {useFullPath ? "Hide" : "Show"} path
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
                    checkboxSelection
                    rows={displayFormat}
                    columns={columns}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(() => newSelectionModel);
                    }}
                    selectionModel={selectionModel}
                />
            </div>
        </div>
    );
};
export default connect((state) => ({
    bags: state.bags,
    status: state.status,
}))(BagTable);
