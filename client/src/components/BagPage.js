import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { setPageComplete } from "../actions/settings";
import { useDispatch } from "react-redux";
import { addTask, startTask, makeOpenBagTask } from "../actions/task";

export default function BagPage() {
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    const handleClick = () => {
        setLoading((prevLoading) => true);
        dispatch(setPageComplete({ complete: false }));
        const task = addTask(makeOpenBagTask(), true);
        const taskId = task.task.id;
        dispatch(task);
        dispatch(startTask(taskId));
    };

    React.useEffect(() => {
        dispatch(setPageComplete({ complete: true }));
    }, []);

    return (
        <Stack direction="row" spacing={2}>
            <LoadingButton loading={loading} loadingPosition="start" startIcon={<AddIcon />} variant="contained" size="large" onClick={(e) => handleClick()}>
                Add
            </LoadingButton>
        </Stack>
    );
}
