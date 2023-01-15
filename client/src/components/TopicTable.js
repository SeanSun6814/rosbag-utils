import * as React from "react";
import Button from "@mui/material/Button";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbar,
} from "@mui/x-data-grid";
import { connect, useDispatch } from "react-redux";
import { addTopic, clearTopics, setSelectedTopics } from "../reducers/topic";

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
            id: props.topics[topic].name,
        };
    });

    React.useEffect(() => {
        let newSelectionModel = [];
        Object.keys(props.topics).forEach((topic) => {
            if (props.topics[topic].selected) newSelectionModel.push(props.topics[topic].name);
        });
        setSelectionModel(newSelectionModel);
    }, []);

    React.useEffect(() => {
        dispatch(setSelectedTopics(selectionModel));
    }, [selectionModel]);

    return (
        <div style={{ width: "100%" }}>
            <div style={{ height: "calc(100vh - 290px)" }}>
                <DataGrid
                    checkboxSelection
                    rows={display_format}
                    columns={columns}
                    components={{
                        Toolbar: GridToolbar,
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
