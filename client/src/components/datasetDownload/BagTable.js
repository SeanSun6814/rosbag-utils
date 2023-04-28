import * as React from "react";
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
import { setSelectedBags } from "../../reducers/rosbag";

const columns = [
    { field: "name", headerName: "Name", flex: 3 },
    { field: "topic_count", headerName: "Topics", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "messages", headerName: "Messages", flex: 1 },
    { field: "size", headerName: "Size", flex: 1 },
];

const BagTable = (props) => {
    const dispatch = useDispatch();
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [displayFormat, setDisplayFormat] = React.useState([]);

    React.useEffect(() => {
        setDisplayFormat(() =>
            props.bags.map((bag) => {
                return {
                    id: bag.id,
                    name: bag.name,
                    duration: bag.duration + "s",
                    messages: bag.messages,
                    size: convert.humanFileSize(
                        Object.keys(bag.topics).reduce((acc, topic) => { return acc + bag.topics[topic].size; }, 0)
                    ),
                    topic_count: Object.keys(bag.topics).length,
                };
            })
        );
    }, [props.bags]);

    React.useEffect(() => {
        dispatch(setSelectedBags(selectionModel));
    }, [selectionModel, dispatch]);

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
        <div style={{ height: "calc(100vh - 230px)" }}>
            <DataGrid
                checkboxSelection
                disableSelectionOnClick
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
    );
};
export default connect((state) => ({
    bags: state.bags,
    status: state.status,
}))(BagTable);