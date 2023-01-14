export default (state = [], action) => {
    console.log(action.type);
    if (action.type === "ADD_TOPIC") {
        const addTopic = action.topic;
        const oldTopics = state;
        let newTopic = { name: addTopic.name, messages: addTopic.messages, type: addTopic.type, appeared_in_bags: 1, selected: false };
        if (oldTopics[addTopic.name]) {
            const oldTopic = oldTopics[addTopic.name];
            newTopic.messages = oldTopic.messages + addTopic.messages;
            if (oldTopic.type !== addTopic.type) newTopic.type = oldTopic.type + ", " + addTopic.type;
            newTopic.appeared_in_bags = oldTopic.appeared_in_bags + 1;
        }
        return { ...oldTopics, [newTopic.name]: newTopic };
    } else if (action.type === "ADD_ALL_TOPICS_FROM_BAG_ARR") {
        const bagArr = action.bags;
        const newState = { ...state };
        bagArr.forEach((bag) => {
            Object.keys(bag.topics).forEach((topic) => {
                const addTopic = bag.topics[topic];
                const oldTopics = state;
                let newTopic = { name: addTopic.name, messages: addTopic.messages, type: addTopic.type, appeared_in_bags: 1, selected: false };
                if (oldTopics[addTopic.name]) {
                    const oldTopic = oldTopics[addTopic.name];
                    newTopic.messages = oldTopic.messages + addTopic.messages;
                    if (oldTopic.type !== addTopic.type) newTopic.type = oldTopic.type + ", " + addTopic.type;
                    newTopic.appeared_in_bags = oldTopic.appeared_in_bags + 1;
                }
                newState[newTopic.name] = newTopic;
            });
        });
        return newState;
    } else if (action.type === "SET_SELECTED_TOPICS") {
        let idxSelected = [];
        Object.keys(state).forEach(() => idxSelected.push(false));
        action.selectedIdxs.forEach((idx) => (idxSelected[idx - 1] = true));
        return Object.keys(state).map((topic, idx) => {
            return { ...state[topic], selected: idxSelected[idx] };
        });
    } else if (action.type === "CLEAR_TOPICS") {
        return {};
    } else {
        return state;
    }
};
