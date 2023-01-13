export default (state = [], action) => {
    if (action.type === "ADD_BAG") {
        return [...state, action.bag];
    } else if (action.type === "REMOVE_BAG") {
        return state.filter(({ name }) => name !== action.name);
    } else {
        return state;
    }
};
