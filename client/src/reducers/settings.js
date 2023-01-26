export const setTheme = (theme) => ({
    type: "SET_THEME",
    theme,
});

export const toggleTheme = () => ({
    type: "TOGGLE_THEME",
});

export default (state = [], action) => {
    if (action.type === "SET_THEME") {
        return { ...state, theme: action.theme };
    } else if (action.type === "TOGGLE_THEME") {
        return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    } else {
        return state;
    }
};
