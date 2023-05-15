from . import bagfilter, baglas, bagimg, measure_trajectory, baglas_uncertainty
from .dataset_download import azure_download, read_datasets
from .dataset_release import index as dataset_release


def doNothing(percentage=-1, details="", status="RUNNING"):
    # Create your own callback function to read progress updates
    pass


def getBagInfo(path):
    return bagfilter.getBagInfoJson(path)


def filterBag(pathsIn, pathOut, targetTopics, cropType, cropData, autoCropData, mergeBags, odometryTopic, onProgress=doNothing):
    return bagfilter.exportBag(
        pathsIn,
        pathOut,
        targetTopics,
        cropType,
        cropData,
        autoCropData,
        mergeBags,
        odometryTopic,
        getEnvInfo(pathsIn, targetTopics),
        onProgress,
    )


def exportPointCloud(pathsIn, pathOut, targetTopic, maxPointsPerFile=50000000, collapseAxis="", speed=1, trimCloud=None, onProgress=doNothing):
    # TODO: Change pathOut to pathOutNoExt
    return baglas.exportPointCloud(
        pathsIn,
        targetTopic,
        pathOut,
        maxPointsPerFile,
        collapseAxis,
        speed,
        trimCloud,
        getEnvInfo(pathsIn, [targetTopic]),
        onProgress,
    )


def exportPointCloudColor(pathsIn, pathOut, targetTopic, odomStatsTopic, maxPointsPerFile=50000000, collapseAxis="", speed=1, trimCloud=None, onProgress=doNothing):
    # TODO: Change pathOut to pathOutNoExt
    return baglas_uncertainty.exportPointCloud(
        pathsIn,
        targetTopic,
        odomStatsTopic,
        pathOut,
        maxPointsPerFile,
        collapseAxis,
        speed,
        trimCloud,
        getEnvInfo(pathsIn, [targetTopic, odomStatsTopic]),
        onProgress,
    )


def exportVideo(pathsIn, pathOut, targetTopic, fps=30, speed=1, printTimestamp="", invertImage=False, rangeFor16Bit=None, livePreview=False, onProgress=doNothing):
    return bagimg.exportVideo(
        pathsIn,
        pathOut,
        targetTopic,
        speed,
        fps,
        printTimestamp,
        invertImage,
        rangeFor16Bit,
        livePreview,
        getEnvInfo(pathsIn, [targetTopic]),
        onProgress,
    )


def measureTrajectory(pathsIn, pathOut, targetTopic, exportPosition=True, exportVelocity=True, onProgress=doNothing):
    return measure_trajectory.measureTrajectory(
        pathsIn,
        pathOut,
        targetTopic,
        exportPosition,
        exportVelocity,
        getEnvInfo(pathsIn, [targetTopic]),
        onProgress,
    )


def datasetRelease(pathsIn, pathOut, datasetName, topics, link, onProgress=doNothing):
    return dataset_release.convertBags(
        datasetName,
        pathsIn,
        topics,
        pathOut,
        link,
        getEnvInfo(pathsIn, topics),
        onProgress,
    )


def readAvailableDatasets():
    return read_datasets.readDatasets()


def downloadDataset(datasetName, topics, pathOut, onProgress=doNothing):
    for topic in topics:
        azure_download.downloadTopic(
            datasetName,
            topic,
            pathOut,
            {},
            onProgress,
        )


def getEnvInfo(paths, topics):
    envInfo = {
        "bags": [],
        "topics": {},
    }
    selected_topics = {topic: True for topic in topics}
    for idx, path in enumerate(paths):
        bagInfo = getBagInfo(path)
        envInfo["bags"].append(bagInfo)
        envInfo["bags"][-1]["id"] = idx+1
        envInfo["bags"][-1]["selected"] = True
        for topic, addTopic in bagInfo["topics"].items():
            if addTopic["name"] not in selected_topics:
                continue
            newTopic = {
                "name": addTopic["name"],
                "messages": addTopic["messages"],
                "type": addTopic["type"],
                "appeared_in_bags": 1,
                "selected": True,
            }
            if newTopic["name"] in envInfo["topics"]:
                oldTopic = envInfo["topics"][newTopic["name"]]
                newTopic["messages"] = oldTopic["messages"] + \
                    addTopic["messages"]
                if oldTopic["type"] != addTopic["type"]:
                    newTopic["type"] = oldTopic["type"] + \
                        ", " + addTopic["type"]
                newTopic["appeared_in_bags"] = oldTopic["appeared_in_bags"] + 1
            envInfo["topics"][newTopic["name"]] = newTopic
    return envInfo


# {
#     "size":13624743432,
#     "path":"../testdata/2023-01-11-12-44-56.bag",
#     "startTime":1667966573.249855,
#     "endTime":1667967129.396759,
#     "duration":556.146904,
#     "messages":12772,
#     "topics":{
#         "/aft_mapped_to_init_imu":{
#             "name":"/aft_mapped_to_init_imu",
#             "type":"nav_msgs/Odometry",
#             "messages":2756,
#             "frequency":4.955525204182383
#         },
#         "/velodyne_cloud_registered_imu_confidence":{
#             "name":"/velodyne_cloud_registered_imu_confidence",
#             "type":"sensor_msgs/PointCloud2",
#             "messages":2756,
#             "frequency":4.955525204182383
#         },
#         "/velodyne_cloud_registered_imu_geometry":{
#             "name":"/velodyne_cloud_registered_imu_geometry",
#             "type":"sensor_msgs/PointCloud2",
#             "messages":2756,
#             "frequency":4.955525204182383
#         },
#         "/velodyne_cloud_registered_imu_rgb":{
#             "name":"/velodyne_cloud_registered_imu_rgb",
#             "type":"sensor_msgs/PointCloud2",
#             "messages":1792,
#             "frequency":3.2221702343595178
#         },
#         "/velodyne_cloud_registered_imu_thermal":{
#             "name":"/velodyne_cloud_registered_imu_thermal",
#             "type":"sensor_msgs/PointCloud2",
#             "messages":2712,
#             "frequency":4.87640941717802
#         }
#     }
# }

# "envInfo": {
#         "bags": [
#             {
#                 "id": 1,
#                 "selected": true,
#                 "path": "/home/sean/Documents/airlab/rosbag-utils/testdata/core_2022-11-08-23-16-59_3.bag",
#                 "size": 1198254564,
#                 "startTime": 1667967419.405089,
#                 "endTime": 1667967437.64995,
#                 "duration": 18.244861,
#                 "messages": 24111,
#                 "topics": {
#                     "/cmu_rc3/aft_mapped_to_init_imu": {
#                         "name": "/cmu_rc3/aft_mapped_to_init_imu",
#                         "type": "nav_msgs/Odometry",
#                         "messages": 91,
#                         "frequency": 4.987705853171477
#                     },
#                     "/cmu_rc3/camera_1/image_raw": {
#                         "name": "/cmu_rc3/camera_1/image_raw",
#                         "type": "sensor_msgs/Image",
#                         "messages": 437,
#                         "frequency": 23.95195008610918
#                     }
#                 }
#             }
#         ]
    # "topics": [
    #             {
    #                 "name": "/cmu_rc3/super_odometry_stats",
    #                 "messages": 91,
    #                 "type": "super_odometry_msgs/OptimizationStats",
    #                 "appeared_in_bags": 1,
    #                 "selected": true
    #             },
    #             {
    #                 "name": "/cmu_rc3/velodyne_cloud_registered_imu",
    #                 "messages": 91,
    #                 "type": "sensor_msgs/PointCloud2",
    #                 "appeared_in_bags": 1,
    #                 "selected": true
    #             }
    #         ]
#     },
