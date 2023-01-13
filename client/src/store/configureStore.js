import { configureStore } from "@reduxjs/toolkit";
import bags from "../reducers/rosbag";
import topics from "../reducers/topic";
import tasks from "../reducers/task";
import settings from "../reducers/settings";

let initialState = {
    bags: [],
    topics: [],
    tasks: [],
    settings: {
        theme: "light",
        ws_connected: false,
        page_complete: false,
    },
};

const loadState = () => {
    try {
        const serialState = localStorage.getItem("settings");
        if (serialState) {
            const settings = JSON.parse(serialState);
            settings.ws_connected = false;
            settings.page_complete = false;
            initialState.settings = settings;
        }
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
    },
    preloadedState: initialState,
});

store.subscribe((state) => {
    saveState(store.getState().settings);
});

export default store;
