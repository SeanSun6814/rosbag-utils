import rosbag
import json
import yaml
import subprocess


def getBagInfoJson(path):
    print("Getting rosbag info for " + path)
    info_dict = yaml.load(subprocess.Popen(['rosbag', 'info', '--yaml', path], stdout=subprocess.PIPE).communicate()[0], Loader=yaml.FullLoader)
    print(info_dict)
    print("\n\n\n\n")
    info = {}
    info["path"] = info_dict["path"]
    info["start"] = info_dict["start"]
    info["end"] = info_dict["end"]
    info["size"] = info_dict["size"]
    info["duration"] = info_dict["duration"]
    info["messages"] = info_dict["messages"]

    topics = {}
    for t in info_dict["topics"]:
        topics[t["topic"]] = [
            t["type"],
            t["messages"],
            -1,
            int(t["messages"]) / info["duration"]
        ]
    info["topics"] = topics
    info = json.dumps(info)
    return info


def getFirstMoveTime(path, targetTopic):
    print("Getting first move time on " + targetTopic + " for " + path)
    bagIn = rosbag.Bag(path)
    count = 0
    resultTime = -2
    for topic, msg, t in bagIn.read_messages():
        if topic == targetTopic:
            if resultTime == -2:
                resultTime = -1
            pose = msg.pose.pose.position
            if abs(pose.x) > 0.5 or abs(pose.y) > 0.5 or abs(pose.z) > 0.5:
                if count == 0:
                    resultTime = str(t)
                elif count > 5:
                    return resultTime
                count += 1
            else:
                count = 0

    # >=0: result, -1: no movement, -2: topic not found
    return resultTime


def exportBag(pathIn, pathOut, targetTopics, startTime, trajectoryTopic):
    print(
        "Processing bag " + pathIn + " -> " + pathOut + " starting at time " + startTime
    )
    targetTopics = targetTopics.split(" ")
    print("Including topics: " + str(targetTopics))
    startTime = int(startTime)
    if startTime < 0:
        print("Skip bag...")
        return [0, 0, 0, 0, 0]

    bagIn = rosbag.Bag(pathIn)
    lastPos = None
    length = 0.0
    with rosbag.Bag(pathOut, "w") as bagOut:
        for topic, msg, t in bagIn.read_messages():
            if topic in targetTopics and int(str(t)) >= startTime:
                bagOut.write(topic, msg, t)

            if topic == trajectoryTopic:
                pose = msg.pose.pose.position
                pose = [pose.x, pose.y, pose.z, int(str(t))]
                length += dist(pose, lastPos)
                lastPos = pose

    if trajectoryTopic == "" or lastPos is None:
        return [0, 0, 0, -1, 0]
    else:
        lastPos.append(length)
        return lastPos


def dist(a, b):
    if a is None or b is None:
        return 0.0
    [x1, y1, z1, _] = a
    [x2, y2, z2, _] = b
    return (((x2 - x1) ** 2) + ((y2 - y1) ** 2) + ((z2 - z1) ** 2)) ** (1 / 2)


# print(getBagInfoJson("/media/sean/SSD/_ProcessedDatasets/dataset_paper/hawkins_full_loop_r3_09_07/odom_results/2022-07-11-16-13-18.bag"))
# print(getFirstMoveTime("/home/sean/Downloads/subt_datasets/nuc_2021-09-05-14-52-55_1.bag", "/aft_mapped_to_init"))
