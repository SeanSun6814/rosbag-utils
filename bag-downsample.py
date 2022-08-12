import rosbag
import rospy
import json
import yaml
import subprocess
import traceback
import numpy as np
from std_msgs.msg import String
from random import randrange


def exportBag(pathIn, pathOut, targetTopics):
    print(
        "Processing bag "
        + pathIn
        + " -> "
        + pathOut
    )
    targetTopics = targetTopics.split(" ")
    print("Including topics: " + str(targetTopics))

    bagIn = rosbag.Bag(pathIn)
    count4 = count5 = 0
    with rosbag.Bag(pathOut, "w") as bagOut:
        for topic, msg, t in bagIn.read_messages():
            if topic in targetTopics:
                bagOut.write(topic, msg, t)

            if topic == "/camera_5/image_raw":
                if count5 % 5 == 0:
                    bagOut.write("/camera_5/image_raw_1000", msg, t)
                if count5 % 10 == 0:
                    bagOut.write("/camera_5/image_raw_500", msg, t)
                count5 += 1

            elif topic == "/camera_4/image_raw":
                if count4 % 5 == 0:
                    bagOut.write("/camera_4/image_raw_1000", msg, t)
                if count4 % 10 == 0:
                    bagOut.write("/camera_4/image_raw_500", msg, t)
                count4 += 1

    print("Finished export bag")


# exportBag(
#     "/home/sean/Documents/Github/rosbag-utils/testdata/2022-07-21-15-04-32.bag",
#     "/home/sean/Documents/Github/rosbag-utils/testdata/2022-07-21-15-04-32_out.bag",
#     "/thermal/image",
#     "0",
#     "16584303310",
# )

# exportBag(
#     "/mnt/e/thermal_data/thermal_test/2018-01-28-11-19-26.bag",
#     "/mnt/e/thermal_data/thermal_test/thermal_test_delayed_45ms.bag",
#     "/thermal/image",
#     "0",
#     "26584303310",
# )

exportBag(
    "/media/sean/SSD/360cam/g360_calib/test1.bag",
    "/media/sean/SSD/360cam/g360_calib/test1_downsampled.bag",
    "/thermal/image /imu/data /camera_4/image_raw /camera_5/image_raw"
)
