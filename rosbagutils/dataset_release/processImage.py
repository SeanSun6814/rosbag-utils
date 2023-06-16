import rosbag
import json
from cv_bridge import CvBridge
import cv2
import numpy as np
import os
from tdigest import TDigest
from .. import utils
from tqdm import tqdm
import random

font = cv2.FONT_HERSHEY_SIMPLEX
textLocation = (10, 30)
textLocationBelow = (10, 60)
fontScale = 1
fontColor = (0, 0, 255)
thickness = 2
lineType = cv2.LINE_AA


def processImage(paths, targetTopic, pathOut, sendProgress, start_time=None, end_time=None):
    utils.mkdir(utils.getFolderFromPath(pathOut))
    # print("Exporting images from " + targetTopic + " to " + pathOut)
    # print("Input bags: " + str(paths))

    bridge = CvBridge()
    startTime = -1
    frameCount = -1
    percentProgressPerBag = 1 / len(paths)
    with open(pathOut + "/timestamps.txt", "w") as f:
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
                details=("Processing " + str(frameCount + 1) + " images"),
            )
            topicsInfo = bagIn.get_type_and_topic_info().topics
            totalMessages = sum(
                [topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in [targetTopic]]
            )
            sendProgressEveryHowManyMessages = max(random.randint(7, 9), int(totalMessages / (300 / len(paths))))
            bagStartCount = frameCount
            for topic, msg, t in tqdm(
                bagIn.read_messages(topics=[targetTopic], start_time=start_time, end_time=end_time), total=totalMessages
            ):
                frameCount += 1

                if frameCount % sendProgressEveryHowManyMessages == 0:
                    sendProgress(
                        percentage=(
                            basePercentage
                            + ((frameCount - bagStartCount + 1) / totalMessages * 0.89 + 0.1) * percentProgressPerBag
                        ),
                        details=("Processing " + str(frameCount) + " images"),
                    )
                msg
                cv_img = np.array(bridge.imgmsg_to_cv2(msg))

                if "rgb" in msg.encoding.lower():
                    cv_img = cv2.cvtColor(cv_img, cv2.COLOR_RGB2BGR)

                cv2.imwrite(pathOut + "/" + str(frameCount) + ".png", cv_img)
                f.write(str(t) + "\n")

    result = {
        "numFrames": frameCount,
        "size": utils.getFolderSize(pathOut),
    }
    return result
