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
