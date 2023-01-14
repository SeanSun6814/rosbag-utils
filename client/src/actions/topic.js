export const addTopic = (topic) => ({
    type: "ADD_TOPIC",
    topic,
});

export const addAllTopicsFromBags = (bags) => ({
    type: "ADD_ALL_TOPICS_FROM_BAG",
    bags,
});

export const removeTopic = (name) => ({
    type: "REMOVE_TOPIC",
    name,
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
