export const addBag = ({ id, path, size, startTime, endTime, duration, messages, topics } = {}) => ({
    type: "ADD_BAG",
    bag: {
        id,
        selected: true,
        path,
        size,
        startTime,
        endTime,
        duration,
        messages,
        topics,
    },
});

export const removeBag = (path) => ({
    type: "REMOVE_BAG",
    path,
});

export const setSelectedBags = (selectedIdxs) => ({
    type: "SET_SELECTED_BAGS",
    selectedIdxs,
});

export default (state = [], action) => {
    if (action.type === "ADD_BAG") {
        const numBagsBefore = state.length;
        const newId = numBagsBefore + 1;
        return [...state, { ...action.bag, id: newId }];
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
