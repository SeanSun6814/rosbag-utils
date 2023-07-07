import rosbag
import sensor_msgs.point_cloud2 as pc2
from scipy.ndimage.filters import gaussian_filter1d
import numpy as np
import laspy
import time
import csv
from . import utils


def exportCsv(paths, targetTopic, outPath):
    time_arr, data_arr = utils.FastArr(), utils.FastArr()
    paths = paths.split("\n")
    print("Exporting csv from " + targetTopic + " to " + outPath)

    print("Input bags: " + str(paths))
    for path in paths:
        if path.strip() == "":
            continue
        print("Processing " + path)
        bagIn = rosbag.Bag(path)
        for topic, msg, t in bagIn.read_messages(topics=[targetTopic]):
            if topic == targetTopic:
                # print(msg.uncertainty_x)
                data_arr.update(msg.uncertainty_x)
                time_arr.update(int(str(msg.header.stamp)))

    smooth_data_arr = gaussian_filter1d(data_arr.finalize(), sigma=80)
    with open(outPath, "w") as file:
        for t, v in zip(time_arr.finalize(), smooth_data_arr):
            file.write(str(msg.header.stamp) + "," + str(v) + "\n")


# exportCsv(
#     "/mnt/f/_Datasets/long_corridor/core_2018-01-28-11-32-32_0.bag\n"
#     + "/mnt/f/_Datasets/long_corridor/core_2018-01-28-11-34-59_1.bag\n"
#     + "/mnt/f/_Datasets/long_corridor/core_2018-01-28-11-37-23_2.bag\n",
#     "/cmu_rc2/super_odometry_stats",
#     "/mnt/f/long_corridor_uncertainty_80.csv",
# )
