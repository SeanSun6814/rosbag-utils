export default (state = [], action) => {
    if (action.type === "ADD_TOPIC") {
        return [...state, action.bag];
    } else if (action.type === "REMOVE_TOPIC") {
        return state.filter(({ name }) => name !== action.name);
    } else {
        return state;
    }
};
