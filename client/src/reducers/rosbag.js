export default (state = [], action) => {
    if (action.type === "ADD_BAG") {
        return [...state, action.bag];
    } else if (action.type === "REMOVE_BAG") {
        return state.filter(({ name }) => name !== action.name);
    } else if (action.type === "SET_SELECTED_BAGS") {
        let idxSelected = [];
        state.forEach(() => idxSelected.push(false));
        action.selectedIdxs.forEach((idx) => (idxSelected[idx - 1] = true));
        return state.map((bag, idx) => {
            return { ...bag, selected: idxSelected[idx] };
        });
    } else {
        return state;
    }
};
