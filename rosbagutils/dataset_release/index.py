from ..dataset_release.processImage import processImage
from ..dataset_release.processPointcloud import processPointcloud
from ..dataset_release.processIMU import processIMU
from ..dataset_release.processOdometry import processOdometry
from .. import utils


def convertBags(datasetName, paths, topics, outPath, link, envInfo, sendProgress):
    # topics is dictionary of dictionaries
    # "topics": {
    #     "/cmu_rc3/debug/imu_error_stamp": {
    #         "name": "/cmu_rc3/debug/imu_error_stamp",
    #         "type": "std_msgs/Float32"
    #     }
    # },

    utils.mkdir(outPath)
    result = {}

    for topicIndex, (topicId, value) in enumerate(topics.items()):
        topicName = value["name"]
        topicType = value["type"]
        topicName = topicName.replace("/", "_")
        if topicName[0] == "_":
            topicName = topicName[1:]
        topicPath = outPath + topicName + "/"
        topics[topicId]["name"] = topicName

        def sendSubtaskProgress(percentage=None, details=None):
            sendProgress(
                percentage=percentage / len(topics) + topicIndex / len(topics),
                details=details,
            )

        if topicType == "sensor_msgs/Image":
            result[topicName] = processImage(
                paths, topicId, topicPath, sendSubtaskProgress)
        elif topicType == "sensor_msgs/PointCloud2":
            result[topicName] = processPointcloud(
                paths, topicId, topicPath, sendSubtaskProgress)
        elif topicType == "sensor_msgs/Imu":
            result[topicName] = processIMU(
                paths, topicId, topicPath, sendSubtaskProgress)
        elif topicType == "nav_msgs/Odometry":
            result[topicName] = processOdometry(
                paths, topicId, topicPath, sendSubtaskProgress)
        else:
            raise Exception("Unknown topic type: " + topicType)
        topics[topicId]["size"] = result[topicName]["size"]

    writeDatasetInfo(datasetName, topics, link, outPath, envInfo)
    utils.writeResultFile(utils.getFolderFromPath(
        outPath) + "result.json", envInfo, result)

    return result


def writeDatasetInfo(datasetName, topics, link, outPath, envInfo):
    duration, messages = getDurationAndMessages(envInfo["envInfo"])
    datasetInfo = {
        "datasets": [
            {
                "name": datasetName,
                "link": link,
                "isTartanairV2": False,
                "duration": duration,
                "messages": messages,
                "topics": {},
            }
        ]
    }

    for topicId, value in topics.items():
        topicName = value["name"]
        topicType = value["type"]
        size = value["size"]
        datasetInfo["datasets"][0]["topics"][topicName] = {
            "type": topicType,
            "id": topicId,
            "size": size,
            "messages": getTopicMessages(topicId, envInfo["envInfo"]),
        }

    filename = outPath + datasetName + ".json"
    with open(filename, "w") as f:
        f.write(utils.json.dumps(datasetInfo, indent=4))


def getDurationAndMessages(envInfo):
    bags = envInfo["bags"]
    duration, messages = 0, 0
    for bag in bags:
        duration += bag["duration"]
        messages += bag["messages"]
    return duration, messages


def getTopicMessages(topic, envInfo):
    bags = envInfo["bags"]
    messages = 0
    for bag in bags:
        if topic in bag["topics"]:
            messages += bag["topics"][topic]["messages"]
    return messages


def getEnvInfo(paths, topics):
    envInfo = {
        "bags": [],
        "topics": {},
    }
    for idx, path in enumerate(paths):
        bagInfo = utils.readJson(path + "bagInfo.json")
        envInfo["bags"].append(bagInfo)
        envInfo["bags"][-1]["id"] = idx+1
        envInfo["bags"][-1]["selected"] = True
        for topic, addTopic in bagInfo["topics"].items():
            newTopic = {
                "name": addTopic["name"],
                "messages": addTopic["messages"],
                "type": addTopic["type"],
                "appeared_in_bags": 1,
                "selected": False,
            }
            if newTopic["name"] in envInfo["topics"]:
                oldTopic = envInfo["topics"][newTopic["name"]]
                newTopic["messages"] = oldTopic["messages"] + addTopic["messages"]
                if oldTopic["type"] != addTopic["type"]:
                    newTopic["type"] = oldTopic["type"] + ", " + addTopic["type"]
                newTopic["appeared_in_bags"] = oldTopic["appeared_in_bags"] + 1
            envInfo["topics"][newTopic["name"]] = newTopic
    return envInfo


# def getEnvInfo(paths, topics):
#     envInfo = {
#         "bags": [],
#         "topics": {},
#     }
#     selected_topics = {topic: True for topic in topics}
#     for idx, path in enumerate(paths):
#         bagInfo = utils.readJson(path + "bagInfo.json")
#         envInfo["bags"].append(bagInfo)
#         envInfo["bags"][-1]["id"] = idx+1
#         envInfo["bags"][-1]["selected"] = True
#         for topic, addTopic in bagInfo["topics"].items():
#             if addTopic["name"] not in selected_topics:
#                 continue
#             newTopic = {
#                 "name": addTopic["name"],
#                 "messages": addTopic["messages"],
#                 "type": addTopic["type"],
#                 "appeared_in_bags": 1,
#                 "selected": False,
#             }
#             if newTopic["name"] in envInfo["topics"]:
#                 oldTopic = envInfo["topics"][newTopic["name"]]
#                 newTopic["messages"] = oldTopic["messages"] + addTopic["messages"]
#                 if oldTopic["type"] != addTopic["type"]:
#                     newTopic["type"] = oldTopic["type"] + ", " + addTopic["type"]
#                 newTopic["appeared_in_bags"] = oldTopic["appeared_in_bags"] + 1
#             envInfo["topics"][newTopic["name"]] = newTopic
#     return envInfo
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

# {
#     "datasets": {
#         "subt_canary": {
#             "link": "https://.../subt_mrs/subt_canary",
#             "isTartanairV2": false,
#             "topics": {
#                 "rgb camera": {
#                     "type": "sensor_msg/image",
#                     "id": "/camera_0",
#                     "size": 1000000
#                 },
#                 "thermal camera": {
#                     "type": "sensor_msg/image",
#                     "id": "/thermal_image",
#                     "size": 1000000
#                 },
#                 "imu": {
#                     "type": "sensor_msg/imu_data",
#                     "id": "/imu_0",
#                     "size": 1000000
#                 }
#             }
#         }
#     }
# }
