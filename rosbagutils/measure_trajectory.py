import rosbag
import rospy
import json
import yaml
import subprocess
import traceback
from . import utils
import random
import numpy as np
import math


def measureTrajectory(paths, pathOut, targetTopic, exportPosition, exportVelocity, envInfo, sendProgress):
    utils.mkdir(utils.getFolderFromPath(pathOut))
    firstPos = None
    prevPos = None
    posFile = velFile = None
    length = 0.0
    count = 0
    if exportPosition:
        posFile = open(pathOut + "position.csv", "w")
        posFile.write("timestamp, x, y, z, roll, pitch, yaw\n")
    if exportVelocity:
        velFile = open(pathOut + "velocity.csv", "w")
        velFile.write("timestamp, x, y, z, roll, pitch, yaw\n")

    percentProgressPerBag = 1 / len(paths)
    for path, pathIdx in zip(paths, range(len(paths))):
        if path.strip() == "":
            continue
        print("Processing " + path)
        basePercentage = pathIdx * percentProgressPerBag
        sendProgress(
            percentage=(basePercentage + 0.05 * percentProgressPerBag),
            details=("Loading " + utils.getFilenameFromPath(path)),
        )
        bagIn = rosbag.Bag(path)
        sendProgress(
            percentage=(basePercentage + 0.1 * percentProgressPerBag),
            details=("Processing " + str(count) + " positions"),
        )
        topicsInfo = bagIn.get_type_and_topic_info().topics
        totalMessages = sum([topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in [targetTopic]])
        sendProgressEveryHowManyMessages = max(random.randint(77, 97), int(totalMessages / (100 / len(paths))))
        bagStartCount = count
        for topic, msg, t in bagIn.read_messages(topics=[targetTopic]):
            timestamp = int(str(t))
            (roll, pitch, yaw) = quaternion_to_euler(
                msg.pose.pose.orientation.x,
                msg.pose.pose.orientation.y,
                msg.pose.pose.orientation.z,
                msg.pose.pose.orientation.w,
            )
            pos = {
                "x": msg.pose.pose.position.x,
                "y": msg.pose.pose.position.y,
                "z": msg.pose.pose.position.z,
                "roll": roll,
                "pitch": pitch,
                "yaw": yaw,
                "t": timestamp,
            }
            if prevPos is None:
                prevPos = pos.copy()
                prevPos["t"] = 0
            if exportPosition:
                posFile.write(
                    str(timestamp)
                    + ","
                    + str(pos["x"])
                    + ","
                    + str(pos["y"])
                    + ","
                    + str(pos["z"])
                    + ","
                    + str(pos["roll"])
                    + ","
                    + str(pos["pitch"])
                    + ","
                    + str(pos["yaw"])
                    + "\n"
                )
            if exportVelocity:
                velFile.write(
                    str(timestamp)
                    + ","
                    + str((pos["x"] - prevPos["x"]) / (pos["t"] - prevPos["t"]) * 1e9)
                    + ","
                    + str((pos["y"] - prevPos["y"]) / (pos["t"] - prevPos["t"]) * 1e9)
                    + ","
                    + str((pos["z"] - prevPos["z"]) / (pos["t"] - prevPos["t"]) * 1e9)
                    + ","
                    + str((pos["roll"] - prevPos["roll"]) / (pos["t"] - prevPos["t"]) * 1e9)
                    + ","
                    + str((pos["pitch"] - prevPos["pitch"]) / (pos["t"] - prevPos["t"]) * 1e9)
                    + ","
                    + str((pos["yaw"] - prevPos["yaw"]) / (pos["t"] - prevPos["t"]) * 1e9)
                    + "\n"
                )
            length += dist(pos, prevPos)
            if firstPos is None:
                firstPos = pos
            prevPos = pos
            count += 1
            if count % sendProgressEveryHowManyMessages == 0:
                sendProgress(
                    percentage=(
                        basePercentage + ((count - bagStartCount) / totalMessages * 0.89 + 0.1) * percentProgressPerBag
                    ),
                    details=("Processing " + str(count) + " positions"),
                )

    if exportPosition:
        posFile.close()
    if exportVelocity:
        velFile.close()
    result = {
        "length": length,
        "firstPos": firstPos,
        "lastPose": prevPos,
        "returnToOrigin": bool(dist(firstPos, prevPos) < 5),
    }
    utils.writeResultFile(utils.getFolderFromPath(pathOut) + "result.json", envInfo, result)
    return result


def dist(a, b):
    if a is None or b is None:
        return 0.0
    return (((b["x"] - a["x"]) ** 2) + ((b["y"] - a["y"]) ** 2) + ((b["z"] - a["z"]) ** 2)) ** (1 / 2)


def quaternion_to_euler(x, y, z, w):
    roll = math.atan2(2 * (w * x + y * z), 1 - 2 * (x**2 + y**2))
    pitch = math.asin(2 * (w * y - z * x))
    yaw = math.atan2(2 * (w * z + x * y), 1 - 2 * (y**2 + z**2))

    return np.rad2deg(roll), np.rad2deg(pitch), np.rad2deg(yaw)
