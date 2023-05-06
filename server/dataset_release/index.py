from server.dataset_release.processImage import processImage
from server.dataset_release.processPointcloud import processPointcloud
from server.dataset_release.processIMU import processIMU
from server.dataset_release.processOdometry import processOdometry
import server.utils as utils


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
        cleanTopicName = topicName.replace("/", "_")
        if cleanTopicName[0] == "_":
            cleanTopicName = cleanTopicName[1:]
        topicPath = outPath + cleanTopicName + "/"
        topics[topicId]["cleanName"] = cleanTopicName

        def sendSubtaskProgress(percentage=None, details=None):
            sendProgress(
                percentage=percentage / len(topics) + topicIndex / len(topics),
                details=details,
            )

        if topicType == "sensor_msgs/Image":
            result[topicName] = processImage(paths, topicId, topicPath, sendSubtaskProgress)
        elif topicType == "sensor_msgs/PointCloud2":
            result[topicName] = processPointcloud(paths, topicId, topicPath, sendSubtaskProgress)
        elif topicType == "sensor_msgs/Imu":
            result[topicName] = processIMU(paths, topicId, topicPath, sendSubtaskProgress)
        elif topicType == "nav_msgs/Odometry":
            result[topicName] = processOdometry(paths, topicId, topicPath, sendSubtaskProgress)
        else:
            raise Exception("Unknown topic type: " + topicType)
        topics[topicId]["size"] = result[topicName]["size"]

    writeDatasetInfo(datasetName, topics, link, outPath, envInfo)
    utils.writeResultFile(utils.getFolderFromPath(outPath) + "result.json", envInfo, result)

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
        cleanName = value["cleanName"]
        size = value["size"]
        datasetInfo["datasets"][0]["topics"][cleanName] = {
            "type": topicType,
            "id": topicId,
            "size": size,
            "messages": getTopicMessages(topicName, envInfo["envInfo"]),
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
