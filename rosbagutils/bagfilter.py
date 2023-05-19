import rosbag
import rospy
import json
import yaml
import subprocess
import traceback
from . import utils
import random
from typing import Dict, List, Tuple, Union, Optional, Any, Callable


def getBagInfoJson(path: str) -> Dict[str, Any]:
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
    info = {}
    try:
        print("Getting rosbag info for " + path)
        # info_dict = yaml.load(subprocess.Popen(["rosbag", "info", "--yaml", path], stdout=subprocess.PIPE).communicate()[0], Loader=yaml.FullLoader)
        info_dict = yaml.load(rosbag.Bag(path, "r")._get_yaml_info(), Loader=yaml.FullLoader)
        info["size"] = 0
        info["path"] = ""
        info["startTime"] = 0
        info["endTime"] = 0
        info["duration"] = 0
        info["messages"] = 0
        info["topics"] = {}
        info["size"] = info_dict["size"]
        info["path"] = info_dict["path"]
        info["startTime"] = info_dict["start"]
        info["endTime"] = info_dict["end"]
        info["duration"] = info_dict["duration"]
        info["messages"] = info_dict["messages"]

        topics = {}
        for t in info_dict["topics"]:
            topics[t["topic"]] = {
                "name": t["topic"],
                "type": t["type"],
                "messages": t["messages"],
                "frequency": int(t["messages"]) / info["duration"],
            }
        info["topics"] = topics
        print("Finished getting bag info")
        return info
    except Exception:
        print("Get bag info ERROR: ")
        traceback.print_exc()
        raise Exception("Error getting bag info")


def exportBag(
    pathIns: List[str],
    pathOuts: List[str],
    targetTopics: List[str],
    cropType: str,
    cropTimes: List[Dict[str, float]],
    autoCropTimes: Dict[str, float],
    mergeBags: bool,
    trajectoryTopic: str,
    envInfo: Dict[str, Any],
    sendProgress: Callable,
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
    print("Including topics: " + str(targetTopics))
    progressPerBag = 1.0 / (len(pathIns)) / (3.0 if cropType == "AUTO" else 1.0)
    progressSoFar = 0.0

    def openBagWithProgress(pathIn, addPercentage=0.0, detailsThen=""):
        nonlocal progressSoFar
        progressSoFar += addPercentage / 2
        sendProgress(
            percentage=progressSoFar,
            details="Loading " + utils.getFilenameFromPath(pathIn),
        )
        bagIn = rosbag.Bag(pathIn)
        progressSoFar += addPercentage / 2
        sendProgress(percentage=progressSoFar, details=detailsThen)
        return bagIn

    def autoGetCroppingArray():
        nonlocal progressSoFar

        def getFirstMoveTime(bagIn):
            initialPosition = None
            for topic, msg, t in bagIn.read_messages(topics=[trajectoryTopic]):
                pose = msg.pose.pose.position
                if initialPosition is None:
                    initialPosition = pose
                if (
                    abs(pose.x - initialPosition.x) > 0.5
                    or abs(pose.y - initialPosition.y) > 0.5
                    or abs(pose.z - initialPosition.z) > 0.5
                ):
                    return t.to_time() - bagIn.get_start_time()
            print("No first move time found")
            return -1

        def getFinalPosition(pathIn):
            finalPosition = None
            bagIn = openBagWithProgress(pathIn, 0, "Finding final location")
            for topic, msg, t in bagIn.read_messages(topics=[trajectoryTopic]):
                pose = msg.pose.pose.position
                finalPosition = pose
            return finalPosition

        def getLastMoveTime(bagIn, finalPosition):
            lastMoveTime = -1
            for topic, msg, t in bagIn.read_messages(topics=[trajectoryTopic]):
                pose = msg.pose.pose.position
                if finalPosition is not None and (
                    abs(pose.x - finalPosition.x) > 0.5
                    or abs(pose.y - finalPosition.y) > 0.5
                    or abs(pose.z - finalPosition.z) > 0.5
                ):
                    lastMoveTime = t.to_time()
            return lastMoveTime - bagIn.get_start_time()

        initialPosition = None
        cropTimes = []
        # first set cropStart using the first move time
        for pathIn, idx in zip(pathIns, range(len(pathIns))):
            bagIn = openBagWithProgress(pathIn, progressPerBag, "Finding first move time")
            duration = bagIn.get_end_time() - bagIn.get_start_time()
            firstMoveTime = getFirstMoveTime(bagIn)
            if firstMoveTime >= 0:
                cropTimes.append(
                    {
                        "cropStart": firstMoveTime - autoCropTimes["start"],
                        "cropEnd": duration,
                    }
                )
                for i in range(idx + 1, len(pathIns)):
                    cropTimes.append({"cropStart": 0, "cropEnd": duration})
                break
            else:
                cropTimes.append({"cropStart": duration + 1, "cropEnd": duration})

        sendProgress(percentage=0.33, details="Finding last move time")
        progressSoFar = 0.33
        finalPosition = getFinalPosition(pathIns[-1])
        for pathIn, cropTime in zip(pathIns[::-1], cropTimes[::-1]):
            bagIn = openBagWithProgress(pathIn, progressPerBag, "Finding last move time")
            lastMoveTime = getLastMoveTime(bagIn, finalPosition)
            if lastMoveTime >= 0:
                cropTime["cropEnd"] = lastMoveTime + autoCropTimes["end"]
                break
            else:
                cropTime["cropEnd"] = -1
        sendProgress(percentage=0.66, details="Writing to bags")
        progressSoFar = 0.66
        return cropTimes

    def exportToOneFileUsingManualCropping(pathIns, pathOut, cropTimes):
        nonlocal progressSoFar
        utils.mkdir(utils.getFolderFromPath(pathOut))
        with rosbag.Bag(pathOut, "w") as bagOut:
            for pathIn, cropTime in zip(pathIns, cropTimes):
                if cropTime["cropStart"] >= cropTime["cropEnd"]:
                    print("Skipping bag: " + pathIn + " because cropStart >= cropEnd")
                    continue
                bagIn = openBagWithProgress(
                    pathIn,
                    progressPerBag * 0.1,
                    "Writing to " + utils.getFilenameFromPath(pathOut),
                )
                startTime = rospy.Time.from_sec(bagIn.get_start_time() + cropTime["cropStart"])
                endTime = rospy.Time.from_sec(bagIn.get_start_time() + cropTime["cropEnd"])
                topicsInfo = bagIn.get_type_and_topic_info().topics
                totalMessages = sum(
                    [topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in targetTopics]
                )
                sendProgressEveryHowManyMessages = max(
                    random.randint(87, 97), int(totalMessages / (100 / len(pathIns)))
                )
                count = -1
                for topic, msg, t in bagIn.read_messages(topics=targetTopics, start_time=startTime, end_time=endTime):
                    bagOut.write(topic, msg, t)
                    count += 1
                    if count % sendProgressEveryHowManyMessages == 0:
                        progressSoFar += progressPerBag * 0.9 / (totalMessages / sendProgressEveryHowManyMessages)
                        sendProgress(
                            percentage=progressSoFar,
                            details=("Processing " + str(count) + "/" + str(totalMessages) + " messages"),
                        )
                print("Finished export bag: " + pathIn)

    def exportToSeparateFilesUsingManualCropping(cropTimes):
        for pathIn, pathOut, cropTime in zip(pathIns, pathOuts, cropTimes):
            if cropTime["cropStart"] >= cropTime["cropEnd"]:
                print("Skipping bag: " + pathIn + " because cropStart >= cropEnd")
                continue
            exportToOneFileUsingManualCropping([pathIn], pathOut, [cropTime])

    def exportToSeparateFilesUsingAutoCropping():
        cropTimes = autoGetCroppingArray()
        exportToSeparateFilesUsingManualCropping(cropTimes)
        return cropTimes

    def exportToOneFileUsingAutoCropping():
        cropTimes = autoGetCroppingArray()
        exportToOneFileUsingManualCropping(pathIns, pathOuts[0], cropTimes)
        return cropTimes

    if cropType == "AUTO" and mergeBags:
        cropTimes = exportToOneFileUsingAutoCropping()
    elif cropType == "AUTO" and not mergeBags:
        cropTimes = exportToSeparateFilesUsingAutoCropping()
    elif cropType == "MANUAL" and mergeBags:
        exportToOneFileUsingManualCropping(pathIns, pathOuts[0], cropTimes)
    elif cropType == "MANUAL" and not mergeBags:
        exportToSeparateFilesUsingManualCropping(cropTimes)

    result = cropTimes
    utils.mkdir(utils.getFolderFromPath(pathOuts[0]))  # in the case of all bags are skipped
    utils.writeResultFile(utils.getFolderFromPath(pathOuts[0]) + "result.json", envInfo, result)
    return result
