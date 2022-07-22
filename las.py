import rosbag
import sensor_msgs.point_cloud2 as pc2
import numpy as np
import pylas
import time


class FastArr:
    def __init__(self, shape=(0,), dtype=float):
        """First item of shape is ingnored, the rest defines the shape"""
        self.shape = shape
        self.data = np.zeros((100, *shape[1:]), dtype=dtype)
        self.capacity = 100
        self.size = 0

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


def exportPointCloud(path, targetTopic, outPath):
    
    bagIn = rosbag.Bag(path)
    count = 0
    arrayX = FastArr()
    arrayY = FastArr()
    arrayZ = FastArr()
    startTime = time.time_ns()
    totalArrayTime = 0
    for topic, msg, t in bagIn.read_messages():
        if topic == targetTopic:
            count += 1
            if count % 10 == 0:
                print("Processed " + str(count) + " messages")

            arrayTimeStart = time.time_ns()
            for p in pc2.read_points(msg, field_names=("x", "y", "z"), skip_nans=True):
                arrayX.update(p[0])
                arrayY.update(p[1])
                arrayZ.update(p[2])
                # print(" x : %f  y: %f  z: %f" % (p[0], p[1], p[2]))
            totalArrayTime += time.time_ns() - arrayTimeStart

    print("Total points: " + str(arrayX.size))
    las = pylas.create()
    las.x = arrayX.finalize()
    las.y = arrayY.finalize()
    las.z = arrayZ.finalize()
    las.write(outPath)
    endTime = time.time_ns()
    print("Total time used = " + str((endTime - startTime) * 1e-9))
    print("Array time used = " + str(totalArrayTime * 1e-9))

# exportPointCloud(
#     "/home/sean/Documents/Github/rosbag-utils/testdata/nuc_2021-09-05-14-53-54_2.bag",
#     "/velodyne_cloud_registered", "/media/sean/SSD/pointcloud2.las"
# )

# exportPointCloud(
#     "/home/sean/Documents/Github/rosbag-utils/testdata/nuc_2021-09-05-15-50-25_95.bag",
#     "/velodyne_cloud_registered", "/media/sean/SSD/pointcloud95.las"
# )
