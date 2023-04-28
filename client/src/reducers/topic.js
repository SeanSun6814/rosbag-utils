export const addTopic = (topic) => ({
    type: "ADD_TOPIC",
    topic,
});

export const addAllTopicsFromBags = (bags) => ({
    type: "ADD_ALL_TOPICS_FROM_BAG_ARR",
    bags,
});

export const addAllTopicsFromDatasets = (datasets) => ({
    type: "ADD_ALL_TOPICS_FROM_DATASET_ARR",
    datasets,
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
                let newTopic = { name: addTopic.name, messages: addTopic.messages, type: addTopic.type, appeared_in_bags: 1, selected: false };
                if (newState[addTopic.name]) {
                    const oldTopic = newState[addTopic.name];
                    newTopic.messages = oldTopic.messages + addTopic.messages;
                    if (oldTopic.type !== addTopic.type) newTopic.type = oldTopic.type + ", " + addTopic.type;
                    newTopic.appeared_in_bags = oldTopic.appeared_in_bags + 1;
                }
                newState[newTopic.name] = newTopic;
            });
        });
        return newState;
    } else if (action.type === "ADD_ALL_TOPICS_FROM_DATASET_ARR") {
        const datasetArr = action.datasets;
        console.log("RECEIVED_DATASETARR", datasetArr)
        const newState = { ...state };
        datasetArr.forEach((dataset) => {
            Object.keys(dataset.topics).forEach((topic) => {
                const addTopic = dataset.topics[topic];
                let newTopic = { name: topic, messages: addTopic.messages, type: addTopic.type, size: addTopic.size, appeared_in_bags: 1, selected: false };
                if (newState[topic]) {
                    const oldTopic = newState[topic];
                    newTopic.messages = oldTopic.messages + addTopic.messages;
                    if (oldTopic.type !== addTopic.type) newTopic.type = oldTopic.type + ", " + addTopic.type;
                    newTopic.appeared_in_bags = oldTopic.appeared_in_bags + 1;
                    newTopic.size = oldTopic.size + addTopic.size;
                }
                newState[newTopic.name] = newTopic;
            });
        });
        return newState;
    } else if (action.type === "SET_SELECTED_TOPICS") {
        const selectedIds = action.selectedIdxs;
        let newState = {};
        Object.keys(state).forEach((topic) => {
            newState[topic] = { ...state[topic], selected: false };
        });
        selectedIds.forEach((id) => {
            newState[id].selected = true;
        });
        return newState;
    } else if (action.type === "CLEAR_TOPICS") {
        return {};
    } else {
        return state;
    }
};


/**
 * Dataset example:
 * 
 * {
    "id": 4,
    "selected": true,
    "name": "cave_3",
    "link": "https://test3",
    "isTartanairV2": false,
    "duration": 200,
    "messages": 2000,
    "topics": {
        "aft_mapped_to_init_imu": {
            "type": "nav_msgs/Odometry",
            "id": "/aft_mapped_to_init_imu",
            "size": 53819,
            "messages": 30
        },
        "imu_data": {
            "type": "sensor_msgs/Imu",
            "id": "/imu/data",
            "size": 3200342,
            "messages": 40
        }
    }
}

 */