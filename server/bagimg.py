import rosbag
import json
from cv_bridge import CvBridge
import cv2
import numpy as np
import os
from tdigest import TDigest
import server.utils
import random

font = cv2.FONT_HERSHEY_SIMPLEX
textLocation = (10, 30)
textLocationBelow = (10, 60)
fontScale = 1
fontColor = (0, 0, 255)
thickness = 2
lineType = cv2.LINE_AA


def exportVideo(
    paths,
    pathOut,
    targetTopic,
    speed,
    fps,
    printTimestamp,
    invertImage,
    rangeFor16Bit,
    livePreview,
    envInfo,
    sendProgress,
):
    speed = int(speed)
    fps = int(fps)
    server.utils.mkdir(server.utils.getFolderFromPath(pathOut))
    print("Exporting video from " + targetTopic + " to " + pathOut)
    print("Input bags: " + str(paths))

    bridge = CvBridge()
    startTime = -1
    video = None
    frameCount = -1
    minDigest, maxDigest = None, None
    is16BitImage = False
    percentProgressPerBag = 1 / len(paths)

    def formatTime(time, startime):
        return str(round((time - startime) * 1e-9, 3)) + "s"

    for path, pathIdx in zip(paths, range(len(paths))):
        if path.strip() == "":
            continue
        print("Processing " + path)
        basePercentage = pathIdx * percentProgressPerBag
        sendProgress(
            percentage=(basePercentage + 0.05 * percentProgressPerBag),
            details=("Loading " + server.utils.getFilenameFromPath(path)),
        )
        bagIn = rosbag.Bag(path)
        sendProgress(
            percentage=(basePercentage + 0.1 * percentProgressPerBag),
            details=("Processing " + str(frameCount + 1) + " images"),
        )
        topicsInfo = bagIn.get_type_and_topic_info().topics
        totalMessages = sum(
            [
                topicsInfo[topic].message_count if topic in topicsInfo else 0
                for topic in [targetTopic]
            ]
        )
        sendProgressEveryHowManyMessages = max(
            random.randint(7, 9), int(totalMessages / (300 / len(paths)))
        )
        bagStartCount = frameCount
        for topic, msg, t in bagIn.read_messages(topics=[targetTopic]):
            if startTime == -1:
                startTime = int(str(t))
                if rangeFor16Bit is None:
                    minDigest, maxDigest = TDigest(), TDigest()
                video = cv2.VideoWriter(
                    pathOut,
                    cv2.VideoWriter_fourcc(*"mp4v"),
                    fps,
                    (msg.width, msg.height),
                )
                print("Video dimensions: " + str(msg.width) + "x" + str(msg.height))
                print("Input encoding: ", msg.encoding)

            frameCount += 1
            if frameCount % speed != 0:
                continue

            if frameCount % sendProgressEveryHowManyMessages == 0:
                sendProgress(
                    percentage=(
                        basePercentage
                        + (
                            (frameCount - bagStartCount + 1) / totalMessages * 0.89
                            + 0.1
                        )
                        * percentProgressPerBag
                    ),
                    details=("Processing " + str(frameCount) + " images"),
                )

            cv_img = np.array(bridge.imgmsg_to_cv2(msg))
            if "16UC1" in msg.encoding or "mono16" in msg.encoding:
                is16BitImage = True
                if rangeFor16Bit is None:
                    minVal = cv_img.min()
                    maxVal = cv_img.max()
                    minDigest.update(minVal)
                    maxDigest.update(maxVal)
                else:
                    minVal = rangeFor16Bit[0]
                    maxVal = rangeFor16Bit[1]

                rangeVal = maxVal - minVal
                cv_img = ((cv_img - minVal) / rangeVal * 256).astype("uint8")
                cv_img = cv2.cvtColor(cv_img, cv2.COLOR_GRAY2RGB)
            elif "rgb" in msg.encoding.lower():
                    cv_img = cv2.cvtColor(cv_img, cv2.COLOR_RGB2BGR)

            if invertImage:
                cv_img = cv2.bitwise_not(cv_img)

            if printTimestamp == "sec":
                cv2.putText(
                    cv_img,
                    formatTime(int(str(t)), startTime),
                    textLocation,
                    font,
                    fontScale,
                    fontColor,
                    thickness,
                    lineType,
                )
            elif printTimestamp == "timestamp":
                cv2.putText(
                    cv_img,
                    str(t),
                    textLocation,
                    font,
                    fontScale,
                    fontColor,
                    thickness,
                    lineType,
                )
            elif printTimestamp == "both":
                cv2.putText(
                    cv_img,
                    formatTime(int(str(t)), startTime),
                    textLocation,
                    font,
                    fontScale,
                    fontColor,
                    thickness,
                    lineType,
                )
                cv2.putText(
                    cv_img,
                    str(t),
                    textLocationBelow,
                    font,
                    fontScale,
                    fontColor,
                    thickness,
                    lineType,
                )

            video.write(cv_img)
            if livePreview:
                cv2.imshow("Video preview", cv_img)
                cv2.waitKey(1)

    calculated16BitRangePercentages = {"minBrightness": {}, "maxBrightness": {}}

    if rangeFor16Bit is None and is16BitImage:
        for i in range(0, 101, 1):
            calculated16BitRangePercentages["maxBrightness"][i] = maxDigest.percentile(
                i
            )
        print("")
        for i in range(0, 101, 1):
            calculated16BitRangePercentages["minBrightness"][i] = minDigest.percentile(
                i
            )

    video.release()
    if livePreview:
        cv2.destroyAllWindows()

    result = {
        "numFrames": frameCount,
        "calculated16BitRangePercentages": calculated16BitRangePercentages,
    }
    server.utils.writeResultFile(
        server.utils.getFolderFromPath(pathOut) + "result.json", envInfo, result
    )
    return result
