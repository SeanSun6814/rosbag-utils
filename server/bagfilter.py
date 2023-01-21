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
        info_dict = yaml.load(subprocess.Popen(["rosbag", "info", "--yaml", path], stdout=subprocess.PIPE).communicate()[0], Loader=yaml.FullLoader)
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
                "frequency": int(t["messages"]) / info["duration"],
            }
        info["topics"] = topics
    except Exception:
        print("Get bag info ERROR: ")
        traceback.print_exc()
    print("Finished getting bag info")
    return info


def exportBag(pathIns, pathOuts, targetTopics, cropType, cropTimes, autoCropTimes, mergeBags, trajectoryTopic, envInfo, sendProgress):
    print("Including topics: " + str(targetTopics))
    progressPerBag = 1.0 / (len(pathIns)) / (3.0 if cropType == "AUTO" else 1.0)
    progressSoFar = 0.0

    def openBagWithProgress(pathIn, addPercentage=0, detailsThen=""):
        nonlocal progressSoFar
        progressSoFar += addPercentage / 2
        sendProgress(percentage=progressSoFar, details="Loading " + server.utils.getFilenameFromPath(pathIn))
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
                if abs(pose.x - initialPosition.x) > 0.5 or abs(pose.y - initialPosition.y) > 0.5 or abs(pose.z - initialPosition.z) > 0.5:
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
                    abs(pose.x - finalPosition.x) > 0.5 or abs(pose.y - finalPosition.y) > 0.5 or abs(pose.z - finalPosition.z) > 0.5
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
                cropTimes.append({"cropStart": firstMoveTime - autoCropTimes["start"], "cropEnd": duration})
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
                bagIn = openBagWithProgress(pathIn, progressPerBag * 0.1, "Writing to " + server.utils.getFilenameFromPath(pathOut))
                startTime = rospy.Time.from_sec(bagIn.get_start_time() + cropTime["cropStart"])
                endTime = rospy.Time.from_sec(bagIn.get_start_time() + cropTime["cropEnd"])
                topicsInfo = bagIn.get_type_and_topic_info().topics
                totalMessages = sum([topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in targetTopics])
                sendProgressEveryHowManyMessages = max(random.randint(87, 97), int(totalMessages / (100 / len(pathIns))))
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
    server.utils.mkdir(server.utils.getFolderFromPath(pathOuts[0]))  # in the case of all bags are skipped
    server.utils.writeResultFile(server.utils.getFolderFromPath(pathOuts[0]) + "result.json", envInfo, result)
    return result


# def measureTrajectory(pathIn, pathOut, targetTopics, startTime, endTime, trajectoryTopic):
#     print("Processing bag " + pathIn + " -> " + pathOut + " for time range " + startTime + "-" + endTime)
#     targetTopics = targetTopics.split(" ")
#     print("Including topics: " + str(targetTopics))

#     if abs(-1 - float(startTime)) < 0.01:
#         print("Skip bag...")
#         return [0, 0, 0, 0, 0]

#     startTime = float(startTime) * 1e9
#     endTime = float(endTime) * 1e9

#     bagIn = rosbag.Bag(pathIn)
#     lastPos = None
#     length = 0.0
#     with rosbag.Bag(pathOut, "w") as bagOut:
#         for topic, msg, t in bagIn.read_messages(topics=targetTopics):
#             timestamp = float(str(t))
#             if timestamp >= startTime and timestamp <= endTime:
#                 if topic in targetTopics:
#                     bagOut.write(topic, msg, t)

#                 if topic == trajectoryTopic:
#                     pose = msg.pose.pose.position
#                     pose = [pose.x, pose.y, pose.z, timestamp]
#                     length += dist(pose, lastPos)
#                     lastPos = pose
#             elif timestamp > endTime:
#                 break

#     print("Finished export bag")
#     if trajectoryTopic == "" or lastPos is None:
#         return [0, 0, 0, -1, 0]
#     else:
#         lastPos.append(length)
#         return lastPos


# def dist(a, b):
#     if a is None or b is None:
#         return 0.0
#     [x1, y1, z1, _] = a
#     [x2, y2, z2, _] = b
#     return (((x2 - x1) ** 2) + ((y2 - y1) ** 2) + ((z2 - z1) ** 2)) ** (1 / 2)


# print(getBagInfoJson("/media/sean/SSD/_ProcessedDatasets/dataset_paper/hawkins_full_loop_r3_09_07/odom_results/2022-07-11-16-13-18.bag"))
# print(getFirstMoveTime("/home/sean/Downloads/subt_datasets/nuc_2021-09-05-14-52-55_1.bag", "/aft_mapped_to_init"))

# exportBag(
#     [
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-28-33_0.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-31-11_1.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-33-45_2.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-36-20_3.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-38-53_4.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-41-27_5.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-44-01_6.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-46-36_7.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-49-11_8.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-51-46_9.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-54-21_10.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-56-57_11.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-59-33_12.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-14-02-06_13.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-14-04-37_14.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-14-07-07_15.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-14-09-41_16.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-14-12-18_17.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-14-14-53_18.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-14-17-26_19.bag",
#     ],
#     [
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-28-33_0.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-31-11_1.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-33-45_2.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-36-20_3.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-38-53_4.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-41-27_5.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-44-01_6.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-46-36_7.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-49-11_8.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-51-46_9.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-54-21_10.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-56-57_11.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-59-33_12.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-14-02-06_13.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-14-04-37_14.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-14-07-07_15.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-14-09-41_16.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-14-12-18_17.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-14-14-53_18.bag",
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-14-17-26_19.bag",
#     ],
#     ["/cmu_rc3/aft_mapped_to_init_imu"],
#     "AUTO",
#     [
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#     ],
#     {"start": 0, "end": 0},
#     True,
#     "/cmu_rc3/aft_mapped_to_init_imu",
#     lambda x: x,
# )
