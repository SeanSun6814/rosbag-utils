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
import { connect } from "react-redux";
import * as convert from "../utils/convert";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

const columns = [
    { field: "file", headerName: "Files", flex: 5 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "size", headerName: "Size", flex: 1 },
    { field: "topic_count", headerName: "Topics", flex: 1 },
    { field: "messages", headerName: "Messages", flex: 1 },
];

const TopicTable = (props) => {
    const [useFullPath, setUseFullPath] = React.useState(false);

    const display_format = props.bags.map((bag) => {
        return {
            ...bag,
            size: convert.humanFileSize(bag.size),
            topic_count: Object.keys(bag.topics).length,
            file: useFullPath ? bag.path : bag.path.split("/").pop(),
        };
    });

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (
        <div style={{ width: "50vw" }}>
            <div style={{ height: "70vh" }}>
                <DataGrid
                    rows={display_format}
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
    bags: state.bags,
}))(TopicTable);
