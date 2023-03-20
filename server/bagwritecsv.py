import rosbag
import sensor_msgs.point_cloud2 as pc2
from scipy.ndimage.filters import gaussian_filter1d
import numpy as np
import laspy
import time
import csv


class FastArr:
    def __init__(self, shape=(0,), dtype=float):
        """First item of shape is ingnored, the rest defines the shape"""
        self.shape = shape
        self.data = np.zeros((100, *shape[1:]), dtype=dtype)
        self.capacity = 100
        self.size =    0

    def update(self, x):
        if self.size == self.capacity:
            self.capacity *= 4
            newdata = np.zeros((self.capacity, *self.data.shape[1:]))
            newdata[: self.size] = self.data
            self.data = newdata

        self.data[self.size] = x
        self.size += 1

    def finalize(self):
        return self.data[: self.size]


def exportCsv(paths, targetTopic, outPath):
    time_arr, data_arr = FastArr(), FastArr()
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
                time_arr.update(int(str(t)))

    smooth_data_arr = gaussian_filter1d(data_arr.finalize(), sigma=80)
    with open(outPath, "w") as file:
        for t, v in zip(time_arr.finalize(), smooth_data_arr):
            file.write(str(t) + "," + str(v) + "\n")


# exportCsv(
#     "/mnt/f/_Datasets/long_corridor/core_2018-01-28-11-32-32_0.bag\n"
#     + "/mnt/f/_Datasets/long_corridor/core_2018-01-28-11-34-59_1.bag\n"
#     + "/mnt/f/_Datasets/long_corridor/core_2018-01-28-11-37-23_2.bag\n",
#     "/cmu_rc2/super_odometry_stats",
#     "/mnt/f/long_corridor_uncertainty_80.csv",
# )
