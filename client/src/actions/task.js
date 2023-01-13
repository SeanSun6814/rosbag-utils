import uuid from "uuid";

export const addTask = ({ config, done, startTime, duration } = {}) => ({
    type: "ADD_TASK",
    bag: {
        id: uuid(),
        config,
        done,
        startTime,
        duration,
    },
});

export const removeTask = ({ path } = {}) => ({
    type: "REMOVE_TASK",
    path,
});

export const clearTasks = () => ({
    type: "CLEAR_TASKS",
});

export const POINTCLOUD_EXPORT_TASK = "POINTCLOUD_EXPORT_TASK";

export const VIDEO_EXPORT_TASK = "VIDEO_EXPORT_TASK";

export const FILTER_BAG_TASK = "FILTER_BAG_TASK";

export const makePointcloudExportTask = (paths, targetTopic, outPathNoExt, maxPointsPerFile, collapseAxis, speed, xMinMax, yMinMax, zMinMax) => {
    type: POINTCLOUD_EXPORT_TASK, paths, targetTopic, outPathNoExt, maxPointsPerFile, collapseAxis, speed, xMinMax, yMinMax, zMinMax;
};

export const makeVideoExportTask = (paths, pathOut, targetTopic, speed, fps, printTimestamp, invertImage, rangeFor16Bit) => {
    type: VIDEO_EXPORT_TASK, paths, pathOut, targetTopic, speed, fps, printTimestamp, invertImage, rangeFor16Bit;
};

export const makeFilterBagTask = (pathIn, pathOut, targetTopics, startTime, endTime, trajectoryTopic) => {
    type: FILTER_BAG_TASK, pathIn, pathOut, targetTopics, startTime, endTime, trajectoryTopic;
};
