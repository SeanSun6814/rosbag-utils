import rosbag
import json
import yaml
import subprocess
import traceback
import numpy as np
from std_msgs.msg import String


class bcolors:
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKCYAN = "\033[96m"
    OKGREEN = "\033[92m"
    WARNING = "\033[93m"
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"


def getBagInfoJson(path):
    try:
        print("Getting rosbag info for " + path)
        info_dict = yaml.load(
            subprocess.Popen(
                ["rosbag", "info", "--yaml", path], stdout=subprocess.PIPE
            ).communicate()[0],
            Loader=yaml.FullLoader,
        )
        info = {}
        info["size"] = 0
        info["path"] = ""
        info["start"] = 0
        info["end"] = 0
        info["duration"] = 0
        info["messages"] = 0
        info["topics"] = {}
        info["size"] = info_dict["size"]
        info["path"] = info_dict["path"]
        info["start"] = info_dict["start"]
        info["end"] = info_dict["end"]
        info["duration"] = info_dict["duration"]
        info["messages"] = info_dict["messages"]

        topics = {}
        for t in info_dict["topics"]:
            topics[t["topic"]] = [
                t["type"],
                t["messages"],
                -1,
                int(t["messages"]) / info["duration"],
            ]
        info["topics"] = topics
    except Exception:
        print("Get bag info ERROR: ")
        traceback.print_exc()
    print("Finished getting bag info")
    return json.dumps(info)


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
                    print("Found first move time: " + str(resultTime))
                    return resultTime
                count += 1
            else:
                count = 0

    # >=0: result, -1: no movement, -2: topic not found
    return resultTime


def exportBag(pathIn, pathOut, targetTopics, startTime, endTime, trajectoryTopic):
    print(
        "Processing bag "
        + pathIn
        + " -> "
        + pathOut
        + " for time range "
        + startTime
        + "-"
        + endTime
    )
    targetTopics = targetTopics.split(" ")
    print("Including topics: " + str(targetTopics))

    if abs(-1 - float(startTime)) < 0.01:
        print("Skip bag...")
        return [0, 0, 0, 0, 0]

    startTime = float(startTime) * 1e9
    endTime = float(endTime) * 1e9

    bagIn = rosbag.Bag(pathIn)
    lastPos = None
    length = 0.0
    with rosbag.Bag(pathOut, "w") as bagOut:
        for topic, msg, t in bagIn.read_messages():
            timestamp = float(str(t))
            if timestamp >= startTime and timestamp <= endTime:
                if topic in targetTopics:
                    bagOut.write(topic, msg, t)

                if topic == trajectoryTopic:
                    pose = msg.pose.pose.position
                    pose = [pose.x, pose.y, pose.z, timestamp]
                    length += dist(pose, lastPos)
                    lastPos = pose
                elif topic == "/imu/data":
                    bagOut.write(topic, msg, t)

                    def quaternion_to_euler_angle_vectorized1(w, x, y, z):
                        ysqr = y * y

                        t0 = +2.0 * (w * x + y * z)
                        t1 = +1.0 - 2.0 * (x * x + ysqr)
                        X = np.degrees(np.arctan2(t0, t1))

                        t2 = +2.0 * (w * y - z * x)
                        t2 = np.where(t2 > +1.0, +1.0, t2)
                        # t2 = +1.0 if t2 > +1.0 else t2

                        t2 = np.where(t2 < -1.0, -1.0, t2)
                        # t2 = -1.0 if t2 < -1.0 else t2
                        Y = np.degrees(np.arcsin(t2))

                        t3 = +2.0 * (w * z + x * y)
                        t4 = +1.0 - 2.0 * (ysqr + z * z)
                        Z = np.degrees(np.arctan2(t3, t4))

                        return X, Y, Z

                    # print(msg)
                    x, y, z = quaternion_to_euler_angle_vectorized1(
                        msg.orientation.w,
                        msg.orientation.x,
                        msg.orientation.y,
                        msg.orientation.z,
                    )
                    xStr = String()
                    xStr.data = str(x)
                    yStr = String()
                    yStr.data = str(y)
                    zStr = String()
                    zStr.data = str(z)
                    bagOut.write("/imu/angles/x", xStr, t)
                    bagOut.write("/imu/angles/y", yStr, t)
                    bagOut.write("/imu/angles/z", zStr, t)
            elif timestamp > endTime:
                break

    print("Finished export bag")
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
exportBag(
    "/home/sean/Documents/Github/rosbag-utils/testdata/2022-07-21-15-04-32.bag",
    "/home/sean/Documents/Github/rosbag-utils/testdata/2022-07-21-15-04-32_out.bag",
    "/thermal/image NOTOPIC",
    "0",
    "1658430331",
    "NOTOPIC",
)
