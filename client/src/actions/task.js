import { v4 as uuid } from "uuid";

export const addTask = (config, isSystem) => ({
    type: "ADD_TASK",
    task: {
        id: uuid(),
        config,
        status: "WAITING",
        startTime: -1,
        endTime: -1,
        progress: -1,
        isSystem,
        result: null,
    },
});

export const startTask = (id) => updateTask(id, { status: "READY" });

export const updateTask = (id, updates) => ({
    type: "UPDATE_TASK",
    id,
    updates,
});

export const removeTask = (path) => ({
    type: "REMOVE_TASK",
    path,
});

export const clearTasks = () => ({
    type: "CLEAR_TASKS",
});

export const BAG_INFO_TASK = "BAG_INFO_TASK";

export const OPEN_BAG_TASK = "OPEN_BAG_TASK";

export const POINTCLOUD_EXPORT_TASK = "POINTCLOUD_EXPORT_TASK";

export const VIDEO_EXPORT_TASK = "VIDEO_EXPORT_TASK";

export const FILTER_BAG_TASK = "FILTER_BAG_TASK";

export const makePointcloudExportTask = (paths, targetTopic, outPathNoExt, maxPointsPerFile, collapseAxis, speed, xMinMax, yMinMax, zMinMax) => ({
    action: POINTCLOUD_EXPORT_TASK,
    paths,
    targetTopic,
    outPathNoExt,
    maxPointsPerFile,
    collapseAxis,
    speed,
    xMinMax,
    yMinMax,
    zMinMax,
});

export const makeVideoExportTask = (paths, pathOut, targetTopic, speed, fps, printTimestamp, invertImage, rangeFor16Bit) => ({
    action: VIDEO_EXPORT_TASK,
    paths,
    pathOut,
    targetTopic,
    speed,
    fps,
    printTimestamp,
    invertImage,
    rangeFor16Bit,
});

export const makeFilterBagTask = (pathIn, pathOut, targetTopics, startTime, endTime, trajectoryTopic) => ({
    action: FILTER_BAG_TASK,
    pathIn,
    pathOut,
    targetTopics,
    startTime,
    endTime,
    trajectoryTopic,
});

export const makeOpenBagTask = () => ({
    action: OPEN_BAG_TASK,
});

export const makeBagInfoTask = (path) => ({
    action: BAG_INFO_TASK,
    path,
});
