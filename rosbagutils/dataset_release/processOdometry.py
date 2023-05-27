import rosbag
import rospy
import json
import yaml
import subprocess
import traceback
from .. import utils
import random
import numpy as np
import math
from tqdm import tqdm



def processOdometry(paths, targetTopic, pathOut, sendProgress):
    utils.mkdir(utils.getFolderFromPath(pathOut))
    count = 0
    percentProgressPerBag = 1 / len(paths)
    with open(pathOut + "/odometry_data.csv", "w") as f:
        f.write("timestamp, x, y, z, q_x, q_y, q_z, q_w\n")
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
                details=("Processing " + str(count) + " odometry messages"),
            )
            topicsInfo = bagIn.get_type_and_topic_info().topics
            totalMessages = sum(
                [topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in [targetTopic]]
            )
            sendProgressEveryHowManyMessages = max(random.randint(77, 97), int(totalMessages / (100 / len(paths))))
            bagStartCount = count
            for topic, msg, t in tqdm(bagIn.read_messages(topics=[targetTopic]) , total=totalMessages ):
                timestamp = str(t)

                x, y, z = (
                    msg.pose.pose.position.x,
                    msg.pose.pose.position.y,
                    msg.pose.pose.position.z,
                )

                q_x, q_y, q_z, q_w = (
                    msg.pose.pose.orientation.x,
                    msg.pose.pose.orientation.y,
                    msg.pose.pose.orientation.z,
                    msg.pose.pose.orientation.w,
                )

                f.write(
                    timestamp
                    + ", "
                    + str(x)
                    + ", "
                    + str(y)
                    + ", "
                    + str(z)
                    + ", "
                    + str(q_x)
                    + ", "
                    + str(q_y)
                    + ", "
                    + str(q_z)
                    + ", "
                    + str(q_w)
                    + "\n"
                )

                count += 1
                if count % sendProgressEveryHowManyMessages == 0:
                    sendProgress(
                        percentage=(
                            basePercentage
                            + ((count - bagStartCount) / totalMessages * 0.89 + 0.1) * percentProgressPerBag
                        ),
                        details=("Processing " + str(count) + " odometry messages"),
                    )

    result = {
        "num_messages": count,
        "size": utils.getFolderSize(pathOut),
    }
    return result
