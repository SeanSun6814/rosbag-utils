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

def processString(paths, targetTopic, pathOut, sendProgress):
    utils.mkdir(utils.getFolderFromPath(pathOut))
    count = 0
    percentProgressPerBag = 1 / len(paths)
    with open(pathOut + "/string_data.csv", "w") as f:
        f.write("timestamp, data\n")
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
                details=("Processing " + str(count) + " String messages"),
            )
            topicsInfo = bagIn.get_type_and_topic_info().topics
            totalMessages = sum(
                [topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in [targetTopic]]
            )
            sendProgressEveryHowManyMessages = max(random.randint(77, 97), int(totalMessages / (100 / len(paths))))
            bagStartCount = count
            for topic, msg, t in bagIn.read_messages(topics=[targetTopic]):
                timestamp = str(t)
                data = msg.data

                f.write(
                    timestamp
                    + ", "
                    + data
                    + "\n"
                )

                count += 1
                if count % sendProgressEveryHowManyMessages == 0:
                    sendProgress(
                        percentage=(
                            basePercentage
                            + ((count - bagStartCount) / totalMessages * 0.89 + 0.1) * percentProgressPerBag
                        ),
                        details=("Processing " + str(count) + " String messages"),
                    )

    result = {
        "num_messages": count,
        "size": utils.getFolderSize(pathOut),
    }
    return result
