import rosbag
import rospy
import json
import yaml
import subprocess
import traceback
import server.utils
import random


def getBagInfoJson(path):
    try:
        print("Getting rosbag info for " + path)
        # info_dict = yaml.load(subprocess.Popen(["rosbag", "info", "--yaml", path], stdout=subprocess.PIPE).communicate()[0], Loader=yaml.FullLoader)
        info_dict = yaml.load(rosbag.Bag(path, "r")._get_yaml_info())
        info = {}
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
                "frequency": t["frequency"],
            }
        info["topics"] = topics
    except Exception:
        print("Get bag info ERROR: ")
        traceback.print_exc()
    print("Finished getting bag info")
    return info


def exportBag(
    pathIns,
    pathOuts,
    targetTopics,
    cropType,
    cropTimes,
    autoCropTimes,
    mergeBags,
    trajectoryTopic,
    envInfo,
    sendProgress,
):
    print("Including topics: " + str(targetTopics))
    progressPerBag = 1.0 / (len(pathIns)) / (3.0 if cropType == "AUTO" else 1.0)
    progressSoFar = 0.0

    def openBagWithProgress(pathIn, addPercentage=0, detailsThen=""):
        nonlocal progressSoFar
        progressSoFar += addPercentage / 2
        sendProgress(
            percentage=progressSoFar,
            details="Loading " + server.utils.getFilenameFromPath(pathIn),
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
            bagIn = openBagWithProgress(
                pathIn, progressPerBag, "Finding first move time"
            )
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
            bagIn = openBagWithProgress(
                pathIn, progressPerBag, "Finding last move time"
            )
            lastMoveTime = getLastMoveTime(bagIn, finalPosition)
            if lastMoveTime >= 0:
                cropTime["cropEnd"] = lastMoveTime
                break
            else:
                cropTime["cropEnd"] = -1
        sendProgress(percentage=0.66, details="Writing to bags")
        progressSoFar = 0.66
        return cropTimes

    def exportToOneFileUsingManualCropping(pathIns, pathOut, cropTimes):
        nonlocal progressSoFar
        server.utils.mkdir(server.utils.getFolderFromPath(pathOut))
        with rosbag.Bag(pathOut, "w") as bagOut:
            for pathIn, cropTime in zip(pathIns, cropTimes):
                if cropTime["cropStart"] >= cropTime["cropEnd"]:
                    print("Skipping bag: " + pathIn + " because cropStart >= cropEnd")
                    continue
                bagIn = openBagWithProgress(
                    pathIn,
                    progressPerBag * 0.1,
                    "Writing to " + server.utils.getFilenameFromPath(pathOut),
                )
                startTime = rospy.Time.from_sec(
                    bagIn.get_start_time() + cropTime["cropStart"]
                )
                endTime = rospy.Time.from_sec(
                    bagIn.get_start_time() + cropTime["cropEnd"]
                )
                topicsInfo = bagIn.get_type_and_topic_info().topics
                totalMessages = sum(
                    [
                        topicsInfo[topic].message_count if topic in topicsInfo else 0
                        for topic in targetTopics
                    ]
                )
                sendProgressEveryHowManyMessages = max(
                    random.randint(87, 97), int(totalMessages / (100 / len(pathIns)))
                )
                count = -1
                for topic, msg, t in bagIn.read_messages(
                    topics=targetTopics, start_time=startTime, end_time=endTime
                ):
                    bagOut.write(topic, msg, t)
                    count += 1
                    if count % sendProgressEveryHowManyMessages == 0:
                        progressSoFar += (
                            progressPerBag
                            * 0.9
                            / (totalMessages / sendProgressEveryHowManyMessages)
                        )
                        sendProgress(
                            percentage=progressSoFar,
                            details=(
                                "Processing "
                                + str(count)
                                + "/"
                                + str(totalMessages)
                                + " messages"
                            ),
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
    server.utils.mkdir(
        server.utils.getFolderFromPath(pathOuts[0])
    )  # in the case of all bags are skipped
    server.utils.writeResultFile(
        server.utils.getFolderFromPath(pathOuts[0]) + "result.json", envInfo, result
    )
    return result
