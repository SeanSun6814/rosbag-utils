export default (state = [], action) => {
    if (action.type === "ADD_TASK") {
        return [...state, action.task];
    } else if (action.type === "UPDATE_TASK") {
        return state.map((task) => {
            if (task.id === action.id) {
                return {
                    ...task,
                    ...action.updates,
                };
            } else {
                return task;
            }
        });
    } else if (action.type === "REMOVE_TASK") {
        return state.filter(({ id }) => id !== action.id);
    } else {
        return state;
    }
};
