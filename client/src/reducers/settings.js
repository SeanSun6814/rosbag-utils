export default (state = [], action) => {
    if (action.type === "SET_THEME") {
        return { ...state, theme: action.theme };
    } else if (action.type === "TOGGLE_THEME") {
        return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    } else if (action.type === "SET_WS_CONNECTION") {
        return { ...state, ws_connected: action.ws_connected };
    } else {
        return state;
    }
};
