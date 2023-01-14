export default (state = [], action) => {
    if (action.type === "SET_WS_CONNECTION") {
        return { ...state, ws_connected: action.ws_connected };
    } else if (action.type === "SET_SERVER_BUSY") {
        return { ...state, server_busy: action.busy };
    } else if (action.type === "SET_PAGE_COMPLETE") {
        return { ...state, page_complete: action.complete };
    } else if (action.type === "SET_BAG_OPENING") {
        return { ...state, bag_opening: action.complete };
    } else {
        return state;
    }
};
