export const addTopic = (topic) => ({
    type: "ADD_TOPIC",
    topic,
});

export const addAllTopicsFromBags = (bags) => ({
    type: "ADD_ALL_TOPICS_FROM_BAG_ARR",
    bags,
});

export const removeTopic = (name) => ({
    type: "REMOVE_TOPIC",
    name,
});

export const setSelectedTopics = (selectedIdxs) => ({
    type: "SET_SELECTED_TOPICS",
    selectedIdxs,
});

export const clearTopics = () => ({
    type: "CLEAR_TOPICS",
});

export const makeTopic = ({ name, type, messages, frequency }) => ({
    name,
    type,
    messages,
    frequency,
});
