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

    writeDatasetInfo(datasetName, topics, link, outPath)

    utils.writeResultFile(utils.getFolderFromPath(outPath) + "result.json", envInfo, result)

    return result


def writeDatasetInfo(datasetName, topics, link, outPath):
    datasetInfo = {
        "datasets": {
            datasetName: {
                "link": link,
                "isTartanairV2": False,
                "topics": {},
            }
        }
    }
    for topicId, value in topics.items():
        topicName = value["name"]
        topicType = value["type"]
        cleanName = value["cleanName"]
        datasetInfo["datasets"][datasetName]["topics"][cleanName] = {
            "type": topicType,
            "id": topicId,
        }

    filename = outPath + datasetName + ".json"
    with open(filename, "w") as f:
        f.write(utils.json.dumps(datasetInfo, indent=4))


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
