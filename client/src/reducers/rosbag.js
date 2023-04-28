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

export const addDataset = ({ id, name, link, isTartanairV2, duration, messages, topics } = {}) => ({
    type: "ADD_BAG",
    bag: {
        id,
        selected: false,
        name,
        link,
        isTartanairV2,
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

export const clearBags = () => ({
    type: "CLEAR_BAGS",
});


export default (state = [], action) => {
    if (action.type === "ADD_BAG") {
        return [...state, { ...action.bag, id: state.length + 1 }];
    } else if (action.type === "REMOVE_BAG") {
        return state.filter(({ name }) => name !== action.name);
    } else if (action.type === "SET_SELECTED_BAGS") {
        let idxSelected = [];
        state.forEach(() => idxSelected.push(false));
        action.selectedIdxs.forEach((idx) => (idxSelected[idx - 1] = true));
        return state.map((bag, idx) => {
            return { ...bag, selected: idxSelected[idx] };
        });
    } else if (action.type === "CLEAR_BAGS") {
        return [];
    } else {
        return state;
    }
};
