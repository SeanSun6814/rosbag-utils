import * as React from "react";
import {
    DataGrid,
    GridToolbar,
} from "@mui/x-data-grid";
import { connect, useDispatch } from "react-redux";
import { setSelectedTopics } from "../../reducers/topic";
import { humanFileSize } from "../../utils/convert";

const columns = [
    { field: "name", headerName: "Topic", flex: 5 },
    { field: "type", headerName: "Type", flex: 3 },
    { field: "appeared_in_bags", headerName: "In # datasets", flex: 2 },
    { field: "messages", headerName: "Messages", flex: 2 },
    { field: "size", headerName: "Size", flex: 2 },
];

const TopicTable = (props) => {
    const dispatch = useDispatch();
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [displayFormat, setDisplayFormat] = React.useState([]);

    React.useEffect(() => {
        setDisplayFormat(() =>
            Object.keys(props.topics).map((topic) => {
                return {
                    ...props.topics[topic],
                    id: props.topics[topic].name,
                    size: humanFileSize(props.topics[topic].size)
                };
            })
        );
    }, [props.topics]);

    React.useEffect(() => {
        dispatch(setSelectedTopics(selectionModel));
    }, [selectionModel, dispatch]);

    return (
        <div style={{ width: "100%" }}>
            <div style={{ height: "calc(100vh - 230px)" }}>
                <DataGrid
                    checkboxSelection
                    rows={displayFormat}
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
