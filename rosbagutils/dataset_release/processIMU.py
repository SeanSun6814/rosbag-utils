import rosbag
import rospy
import json
import yaml
import subprocess
import traceback
from .. import utils
import random
import numpy as np
from tqdm import tqdm
import math


def processIMU(paths, targetTopic, pathOut, sendProgress, start_time=None, end_time=None):
    utils.mkdir(utils.getFolderFromPath(pathOut))
    count = 0
    percentProgressPerBag = 1 / len(paths)
    with open(pathOut + "/imu_data.csv", "w") as f:
        f.write("timestamp, q_x, q_y, q_z, q_w, ang_vel_x, ang_vel_y, ang_vel_z, lin_acc_x, lin_acc_y, lin_acc_z\n")
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
                details=("Processing " + str(count) + " IMU messages"),
            )
            topicsInfo = bagIn.get_type_and_topic_info().topics
            totalMessages = sum(
                [topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in [
                    targetTopic]]
            )
            sendProgressEveryHowManyMessages = max(random.randint(
                77, 97), int(totalMessages / (100 / len(paths))))
            bagStartCount = count
            for topic, msg, t in tqdm(bagIn.read_messages(topics=[targetTopic], start_time=start_time, end_time=end_time), total=totalMessages):
                timestamp = str(t)
                q_x, q_y, q_z, q_w = (
                    msg.orientation.x,
                    msg.orientation.y,
                    msg.orientation.z,
                    msg.orientation.w,
                )

                ang_vel_x, ang_vel_y, ang_vel_z = (
                    msg.angular_velocity.x,
                    msg.angular_velocity.y,
                    msg.angular_velocity.z,
                )

                lin_acc_x, lin_acc_y, lin_acc_z = (
                    msg.linear_acceleration.x,
                    msg.linear_acceleration.y,
                    msg.linear_acceleration.z,
                )

                f.write(
                    timestamp
                    + ","
                    + str(q_x)
                    + ","
                    + str(q_y)
                    + ","
                    + str(q_z)
                    + ","
                    + str(q_w)
                    + ","
                    + str(ang_vel_x)
                    + ","
                    + str(ang_vel_y)
                    + ","
                    + str(ang_vel_z)
                    + ","
                    + str(lin_acc_x)
                    + ","
                    + str(lin_acc_y)
                    + ","
                    + str(lin_acc_z)
                    + "\n"
                )

                count += 1
                if count % sendProgressEveryHowManyMessages == 0:
                    sendProgress(
                        percentage=(
                            basePercentage
                            + ((count - bagStartCount) / totalMessages *
                               0.89 + 0.1) * percentProgressPerBag
                        ),
                        details=("Processing " + str(count) + " IMU messages"),
                    )

    result = {
        "num_messages": count,
        "size": utils.getFolderSize(pathOut),
    }
    return result
