export default (state = [], action) => {
    if (action.type === "ADD_TOPIC") {
        const addTopic = action.topic;
        const oldTopics = state;
        let newTopic;
        if (oldTopics[addTopic.name]) {
            const oldTopic = oldTopics[addTopic.name];
            newTopic.messages = oldTopic.messages + addTopic.messages;
            if (oldTopic.type !== addTopic.type) newTopic.type = oldTopic.type + ", " + addTopic.type;
            newTopic.appeared_in_bags = oldTopic.appeared_in_bags + addTopic.appeared_in_bags;
        } else {
            newTopic = { name: addTopic.name, messages: addTopic.messages, type: addTopic.type, appeared_in_bags: 0 };
        }
        return { ...oldTopics, [newTopic.name]: newTopic };
    } else if (action.type === "ADD_ALL_TOPICS_FROM_BAG") {
        return null;
    } else if (action.type === "CLEAR_TOPICS") {
        return {};
    } else {
        return state;
    }
};
