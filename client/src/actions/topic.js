export const addTopic = ({ topic } = {}) => ({
    type: "ADD_TOPIC",
    topic,
});

export const removeTopic = ({ name } = {}) => ({
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
