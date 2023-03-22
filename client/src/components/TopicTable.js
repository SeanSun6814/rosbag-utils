import * as React from "react";
import {
    DataGrid,
    GridToolbar,
} from "@mui/x-data-grid";
import { connect, useDispatch } from "react-redux";
import { setSelectedTopics } from "../reducers/topic";

const columns = [
    { field: "name", headerName: "Topic", flex: 5 },
    { field: "type", headerName: "Type", flex: 3 },
    { field: "messages", headerName: "Messages", flex: 2 },
    { field: "appeared_in_bags", headerName: "In # bags", flex: 1 },
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
                };
            })
        );
    }, [props.topics]);

    React.useEffect(() => {
        // let newSelectionModel = [];
        // Object.keys(props.topics).forEach((topic) => {
        //     if (props.topics[topic].selected) newSelectionModel.push(props.topics[topic].name);
        // });
        // // The selectionModel must only be set once to avoid infinite loop since the selectionModel will update props.topics
        // setSelectionModel(() => newSelectionModel);
    }, []);

    React.useEffect(() => {
        dispatch(setSelectedTopics(selectionModel));
    }, [selectionModel, dispatch]);

    return (
        <div style={{ width: "100%" }}>
            <div style={{ height: "calc(100vh - 290px)" }}>
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
