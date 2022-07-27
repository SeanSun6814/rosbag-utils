import rosbag
import json
from cv_bridge import CvBridge
import cv2
import numpy as np

font = cv2.FONT_HERSHEY_SIMPLEX
textLocation = (10,30)
fontScale = 1
fontColor = (0,0,255)
thickness = 2
lineType = cv2.LINE_AA


def exportVideo(paths, pathOut, targetTopic, speed, printTimestamp):
    bagIn = rosbag.Bag(paths)
    bridge = CvBridge()
    startTime = -1
    video = None
    def formatTime(time, startime):
        return str(round((time - startime) * 1e-9, 3)) + "s"
    
    frameCount = -1
    for topic, msg, t in bagIn.read_messages(topics=[targetTopic]):
        if startTime == -1:
            startTime = int(str(t))
            video = cv2.VideoWriter(pathOut, cv2.VideoWriter_fourcc(*'mp4v'), 30, (msg.width,msg.height))
            print("Video dimensions: " + str(msg.width) + "x" + str(msg.height))

        frameCount += 1
        if frameCount % speed != 0:
            continue

        if "16UC1" in msg.encoding or "mono16" in msg.encoding:
            cv_img = np.array(bridge.imgmsg_to_cv2(msg))
            cv_img = (cv_img / 256).astype("uint8")
        elif "8UC1" in msg.encoding or "mono8" in msg.encoding:
            cv_img = np.array(bridge.imgmsg_to_cv2(msg, desired_encoding="mono8"))
        else:
            cv_img = np.array(bridge.imgmsg_to_cv2(msg))

        if (printTimestamp):
            cv2.putText(cv_img, formatTime(int(str(t)), startTime), 
                textLocation, 
                font, 
                fontScale,
                fontColor,
                thickness,
                lineType)

        video.write(cv_img)
        cv2.imshow('Video preview', cv_img)
        cv2.waitKey(1)

    video.release()
    cv2.destroyAllWindows()


# exportVideo("/media/sean/SSD/thermal_data/thermal_outside.bag",
#            "/media/sean/SSD/thermal_data/thermal_outside.mp4",
#            "/thermal/image",
#            1, True
#            )
