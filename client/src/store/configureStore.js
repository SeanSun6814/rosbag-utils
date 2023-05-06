import { configureStore } from "@reduxjs/toolkit";
import bags from "../reducers/rosbag";
import topics from "../reducers/topic";
import tasks from "../reducers/task";
import settings from "../reducers/settings";
import status from "../reducers/status";

let initialState = {
    bags: [],
    topics: {},
    tasks: [],
    settings: {
        theme: "light",
    },
    status: {
        ws_connected: false,
        server_busy: false,
        page_complete: false,
        page_number: 0,
        task_type: "",
        temp_tasks: [],
    },
};

const loadState = () => {
    try {
        const serialState = localStorage.getItem("settings");
        if (serialState) initialState.settings = JSON.parse(serialState);
    } catch (err) {
        console.log(err);
    }
};

const saveState = (state) => {
    try {
        localStorage.setItem("settings", JSON.stringify(state));
    } catch (err) {
        console.log(err);
    }
};

loadState();

const store = configureStore({
    reducer: {
        bags,
        topics,
        tasks,
        settings,
        status,
    },
    preloadedState: initialState,
});

store.subscribe(() => {
    saveState(store.getState().settings);
});

export default store;
