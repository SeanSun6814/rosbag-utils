export const setWSConnection = (ws_connected) => ({
    type: "SET_WS_CONNECTION",
    ws_connected,
});

export const setServerBusy = (busy) => ({
    type: "SET_SERVER_BUSY",
    busy,
});

export const setPageComplete = (complete) => ({
    type: "SET_PAGE_COMPLETE",
    complete,
});

export const setBagOpening = (complete) => ({
    type: "SET_BAG_OPENING",
    complete,
});

export const setPageNumber = (page_number) => ({
    type: "SET_PAGE_NUMBER",
    page_number,
});

export const setTaskType = (task_type) => ({
    type: "SET_TASK_TYPE",
    task_type,
});

export default (state = [], action) => {
    if (action.type === "SET_WS_CONNECTION") {
        return { ...state, ws_connected: action.ws_connected };
    } else if (action.type === "SET_SERVER_BUSY") {
        return { ...state, server_busy: action.busy };
    } else if (action.type === "SET_PAGE_COMPLETE") {
        return { ...state, page_complete: action.complete };
    } else if (action.type === "SET_BAG_OPENING") {
        return { ...state, bag_opening: action.complete };
    } else if (action.type === "SET_PAGE_NUMBER") {
        return { ...state, page_number: action.page_number };
    } else if (action.type === "SET_TASK_TYPE") {
        return { ...state, task_type: action.task_type };
    } else if (action.type === "SET_TEMP_TASKS") {
        return { ...state, temp_tasks: action.tasks };
    } else {
        return state;
    }
};

export const setTempTasks = (tasks) => ({
    type: "SET_TEMP_TASKS",
    tasks,
});
