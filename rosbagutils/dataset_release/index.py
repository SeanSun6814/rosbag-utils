from ..dataset_release.processImage import processImage
from ..dataset_release.processPointcloud import processPointcloud
from ..dataset_release.processIMU import processIMU
from ..dataset_release.processOdometry import processOdometry
from ..dataset_release.processString import processString
from .. import utils
from typing import Dict, List, Tuple, Union, Optional, Any, Callable


def convertBags(
    datasetName: str,
    paths: Dict[str, str],
    topics: Dict[str, Dict[str, str]],
    outPath: str,
    link: str,
    envInfo: Dict[str, Any],
    sendProgress: Callable,
) -> Dict[str, Any]:
    """
    Converts ROS bag files to a dataset.

    Args:
        datasetName (str): Name of the dataset.
        paths (Dict[str, str]): Dictionary of paths to the bag files.
        topics (Dict[str, Dict[str, str]]): Dictionary of dictionaries containing information about the topics to be processed.
            The keys are the topic names, and the values are dictionaries containing the topic friendly name and type.
            Example:
                "topics": {
                    "/cmu_rc3/debug/imu_error_stamp": {
                        "name": "robot_imu_error_stamp",
                        "type": "std_msgs/Float32"
                    }
                },
        outPath (str): Path to the output directory.
        link (str): Link to the dataset.
        envInfo (Dict[str, Any]): Dictionary containing environment information.
        sendProgress (Callable): Function to send progress updates.

    Returns:
        Dict[str, Any]: Dictionary containing information about the processed topics.
    """

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
            result[topicName] = processImage(paths, topicId, topicPath, sendSubtaskProgress)
        elif topicType == "sensor_msgs/PointCloud2":
            result[topicName] = processPointcloud(paths, topicId, topicPath, sendSubtaskProgress)
        elif topicType == "sensor_msgs/Imu":
            result[topicName] = processIMU(paths, topicId, topicPath, sendSubtaskProgress)
        elif topicType == "nav_msgs/Odometry":
            result[topicName] = processOdometry(paths, topicId, topicPath, sendSubtaskProgress)
        elif topicType == "std_msgs/String":
            result[topicName] = processString(paths, topicId, topicPath, sendSubtaskProgress)
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
        envInfo["bags"][-1]["id"] = idx + 1
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
