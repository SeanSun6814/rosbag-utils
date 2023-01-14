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
import { setSelectedBags } from "../actions/rosbag";
import { addAllTopicsFromBags, addTopic, clearTopics, setSelectedTopics } from "../actions/topic";

const columns = [
    { field: "name", headerName: "Topic", flex: 5 },
    { field: "type", headerName: "Type", flex: 3 },
    { field: "messages", headerName: "Messages", flex: 2 },
    { field: "appeared_in_bags", headerName: "In # bags", flex: 1 },
];

const TopicTable = (props) => {
    const [selectionModel, setSelectionModel] = React.useState([]);
    const dispatch = useDispatch();

    const display_format = Object.keys(props.topics).map((topic, idx) => {
        return {
            ...props.topics[topic],
            id: idx + 1,
        };
    });

    React.useEffect(() => {
        const selectedBags = props.bags.filter((bag) => bag.selected);
        dispatch(clearTopics());
        dispatch(addAllTopicsFromBags(selectedBags));
    }, []);

    React.useEffect(() => {
        dispatch(setSelectedTopics(selectionModel));
    }, [selectionModel]);

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
        <div style={{ width: "100%" }}>
            <div style={{ height: "calc(100vh - 290px)" }}>
                <DataGrid
                    checkboxSelection
                    rows={display_format}
                    columns={columns}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                    selectionModel={selectionModel}
                />
            </div>
        </div>
    );
};
export default connect((state) => ({
    bags: state.bags,
    topics: state.topics,
    status: state.status,
}))(TopicTable);
