from . import bagfilter, baglas, bagimg, measure_trajectory, baglas_uncertainty, utils
from .dataset_download import azure_download, read_datasets
from .dataset_release import index as dataset_release
from typing import Dict, List, Tuple, Union, Optional, Any, Callable


def doNothing(percentage=-1, details="", status="RUNNING"):
    # Create your own callback function to read progress updates
    pass


def getBagInfo(path: str) -> Dict[str, Any]:
    """
    Returns a dictionary containing information about a ROS bag file.

    Args:
        path (str): The path to the ROS bag file.

    Returns:
        A dictionary containing the following keys:
        - size (int): The size of the bag file in bytes.
        - path (str): The path to the bag file.
        - startTime (float): The start time of the bag file in seconds.
        - endTime (float): The end time of the bag file in seconds.
        - duration (float): The duration of the bag file in seconds.
        - messages (int): The number of messages in the bag file.
        - topics (dict): A dictionary containing information about each topic in the bag file.
            Each key is the name of a topic, and each value is a dictionary containing the following keys:
            - name (str): The name of the topic.
            - type (str): The message type of the topic.
            - messages (int): The number of messages in the topic.
            - frequency (float): The frequency of the topic in Hz.
    """
    return bagfilter.getBagInfoJson(path)


def filterBag(
    pathsIn: List[str],
    pathsOut: List[str],
    targetTopics: List[str],
    cropType: str = "MANUAL",
    cropTimes: List[Dict[str, float]] = [{"cropStart": 0, "cropEnd": 1e8}],
    autoCropTimes: Dict[str, float] = {"start": 5, "end": 5},
    mergeBags: bool = False,
    trajectoryTopic: str = "",
    onProgress: Callable = doNothing,
) -> Any:
    """
    Exports a filtered ROS bag file.

    Args:
        pathIns (List[str]): A list of paths to the input ROS bag files.
        pathOuts (List[str]): A list of paths to the output ROS bag files.
        targetTopics (List[str]): A list of topics to include in the output bag file.
        cropType (str): The type of cropping to apply to the bag file.
            Must be one of "MANUAL" or "AUTO".
        cropData (List[Dict[str, float]]): A list of dictionaries containing start and end times to crop the bag file.
            Only used if cropType is "MANUAL".
            Each dictionary should contain "cropStart" and "cropEnd" keys with float values, or None if no cropping is needed.
        autoCropData (Dict[str, float]): A dictionary containing start and end times to crop the bag file.
            Only used if cropType is "AUTO".
            The dictionary should contain "start" and "end" keys with float values, or None if no cropping is needed.
        mergeBags (bool): Whether to merge the input bag files into a single output bag file.
            Only the first path in pathOuts is used if this is True.
        trajectoryTopic (str): The name of the topic containing the robot's trajectory.
            Needed for auto cropping.
        envInfo (Dict[str, Any]): A dictionary containing environment information.
        sendProgress (Callable): A function to send progress updates to the user.

    Returns:
        If cropType == "AUTO", returns a list of tuples, where each tuple contains the start and end time of a time range that was kept in the output bag file.
    """
    return bagfilter.exportBag(
        pathsIn,
        pathsOut,
        targetTopics,
        cropType,
        cropTimes,
        autoCropTimes,
        mergeBags,
        trajectoryTopic,
        getEnvInfo(pathsIn, targetTopics),
        onProgress,
    )


def exportPointCloud(
    pathsIn,
    pathOut,
    targetTopic,
    maxPointsPerFile=50000000,
    collapseAxis="",
    speed=1,
    trimCloud=None,
    onProgress=doNothing,
):
    cleanTopicName = targetTopic.replace("/", "_").replace(r"^_", "")
    pathOutNoExt = utils.joinPaths(pathOut, cleanTopicName)
    return baglas.exportPointCloud(
        pathsIn,
        targetTopic,
        pathOutNoExt,
        maxPointsPerFile,
        collapseAxis,
        speed,
        trimCloud,
        getEnvInfo(pathsIn, [targetTopic]),
        onProgress,
    )


def exportPointCloudColor(
    pathsIn,
    pathOut,
    targetTopic,
    odomStatsTopic,
    maxPointsPerFile=50000000,
    collapseAxis="",
    speed=1,
    trimCloud=None,
    onProgress=doNothing,
):
    cleanTopicName = targetTopic.replace("/", "_").replace(r"^_", "")
    pathOutNoExt = utils.joinPaths(pathOut, cleanTopicName)
    return baglas_uncertainty.exportPointCloud(
        pathsIn,
        targetTopic,
        odomStatsTopic,
        pathOutNoExt,
        maxPointsPerFile,
        collapseAxis,
        speed,
        trimCloud,
        getEnvInfo(pathsIn, [targetTopic, odomStatsTopic]),
        onProgress,
    )


def exportVideo(
    pathsIn,
    pathOut,
    targetTopic,
    fps=30,
    speed=1,
    printTimestamp="",
    invertImage=False,
    rangeFor16Bit=None,
    livePreview=False,
    onProgress=doNothing,
):
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

def datasetRelease(pathsIn, pathOut, datasetName, topics, link, onProgress=doNothing, start_time=None, end_time=None):
    return dataset_release.convertBags(
        datasetName,
        pathsIn,
        topics,
        pathOut,
        link,
        getEnvInfo(pathsIn, topics),
        onProgress,
        start_time,
        end_time
    )


def getAvailableDatasets() -> List[Dict[str, Any]]:
    """
    Reads datasets from program database and returns a list of datasets.

    :return: A list of dictionaries containing the data from the datasets.
    """
    return read_datasets.readDatasets()


def downloadDataset(datasetName: str, topics: List[str], pathOut: str, onProgress: Callable = doNothing) -> None:
    """
    Downloads all topics in a dataset.

    Args:
        datasetName (str): The name of the dataset.
        topics (List[str]): A list of topic names to download.
        pathOut (str): The path to save the downloaded topics.
        onProgress (callable): A function to send progress updates. Defaults to doNothing.

    Returns:
        None
    """
    for topic in topics:
        azure_download.downloadTopic(
            datasetName,
            topic,
            pathOut,
            {},
            onProgress,
        )


def getEnvInfo(
    paths: List[str], topics: List[str]
) -> Dict[str, Union[List[Dict[str, Any]], Dict[str, Dict[str, Union[str, int, bool]]]]]:
    """
    Internal function. Not meant to be called by the user.
    Returns a dictionary containing information about the environment.

    Args:
        paths (List[str]): A list of paths to the bags.
        topics (List[str]): A list of topics to include in the environment information.

    Returns:
        A dictionary containing information about the environment. The dictionary has two keys:
        - "bags": A list of dictionaries containing information about each bag. Each dictionary has the following keys:
            - "id": An integer representing the ID of the bag.
            - "path": A string representing the path to the bag.
            - "topics": A dictionary containing information about each topic in the bag. Each key is the name of a topic, and each value is a dictionary with the following keys:
                - "name": A string representing the name of the topic.
                - "messages": An integer representing the number of messages in the topic.
                - "type": A string representing the type of the topic.
                - "appeared_in_bags": An integer representing the number of bags the topic appeared in.
                - "selected": A boolean representing whether the topic is selected.
        - "topics": A dictionary containing information about each topic in the environment. Each key is the name of a topic, and each value is a dictionary with the following keys:
            - "name": A string representing the name of the topic.
            - "messages": An integer representing the total number of messages in the topic across all bags.
            - "type": A string representing the type of the topic.
            - "appeared_in_bags": An integer representing the number of bags the topic appeared in.
            - "selected": A boolean representing whether the topic is selected.
    """
    envInfo = {
        "bags": [],
        "topics": {},
    }
    selected_topics = {topic: True for topic in topics}
    for idx, path in enumerate(paths):
        bagInfo = getBagInfo(path)
        envInfo["bags"].append(bagInfo)
        envInfo["bags"][-1]["id"] = idx + 1
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
                newTopic["messages"] = oldTopic["messages"] + addTopic["messages"]
                if oldTopic["type"] != addTopic["type"]:
                    newTopic["type"] = oldTopic["type"] + ", " + addTopic["type"]
                newTopic["appeared_in_bags"] = oldTopic["appeared_in_bags"] + 1
            envInfo["topics"][newTopic["name"]] = newTopic
            
    envInfo_temp = {}
    envInfo_temp['envInfo'] = envInfo
    
    return envInfo_temp
