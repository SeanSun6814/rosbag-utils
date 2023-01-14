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
