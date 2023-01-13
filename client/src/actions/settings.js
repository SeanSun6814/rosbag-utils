export const setTheme = ({ theme } = {}) => ({
    type: "SET_THEME",
    theme,
});

export const toggleTheme = () => ({
    type: "TOGGLE_THEME",
});

export const setWSConnection = ({ ws_connected } = {}) => ({
    type: "SET_WS_CONNECTION",
    ws_connected,
});
