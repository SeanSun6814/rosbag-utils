export default (state = [], action) => {
    if (action.type === "ADD_TASK") {
        return [...state, action.task];
    } else if (action.type === "REMOVE_TASK") {
        return state.filter(({ id }) => id !== action.id);
    } else {
        return state;
    }
};
