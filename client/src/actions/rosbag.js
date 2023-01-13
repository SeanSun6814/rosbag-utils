export const addBag = ({ path, size, startTime, endTime, duration, messages, topics } = {}) => ({
    type: "ADD_BAG",
    bag: {
        path,
        size,
        startTime,
        endTime,
        duration,
        messages,
        topics,
    },
});

export const removeBag = ({ path } = {}) => ({
    type: "REMOVE_BAG",
    path,
});
