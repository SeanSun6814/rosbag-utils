import { v4 as uuid } from "uuid";

export const addTask = (config, isSystem) => ({
    type: "ADD_TASK",
    task: {
        id: uuid(),
        config,
        status: "WAITING",
        startTime: -1,
        endTime: -1,
        progress: 0,
        progressDetails: "Not started",
        isSystem,
        result: null,
    },
});

export const startTask = (id) => updateTask(id, { status: "READY" });
export const stopTask = (id) => updateTask(id, { status: "WAITING" });

export const updateTask = (id, updates) => ({
    type: "UPDATE_TASK",
    id,
    updates,
});

export const removeTask = (id) => ({
    type: "REMOVE_TASK",
    id,
});

export const clearTasks = () => ({
    type: "CLEAR_TASKS",
});

export const BAG_INFO_TASK = "BAG_INFO_TASK";

export const OPEN_BAG_TASK = "OPEN_BAG_TASK";

export const POINTCLOUD_EXPORT_TASK = "POINTCLOUD_EXPORT_TASK";

export const POINTCLOUD_COLOR_TASK = "POINTCLOUD_COLOR_TASK";

export const VIDEO_EXPORT_TASK = "VIDEO_EXPORT_TASK";

export const FILTER_BAG_TASK = "FILTER_BAG_TASK";

export const MEASURE_TRAJECTORY_TASK = "MEASURE_TRAJECTORY_TASK";

export const makeOpenBagTask = () => ({
    action: OPEN_BAG_TASK,
});

export const makeBagInfoTask = (path) => ({
    action: BAG_INFO_TASK,
    path,
});

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
