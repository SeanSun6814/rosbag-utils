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


def exportPointCloud(paths, targetTopic, outPathNoExt, maxPointsPerFile):
    def writeToFile(arrayX, arrayY, arrayZ, fileNum):
        las = pylas.create()
        las.x = arrayX.finalize()
        las.y = arrayY.finalize()
        las.z = arrayZ.finalize()
        filename = outPathNoExt + "_" + str(fileNum) + ".las"
        print("Writing to " + filename)
        las.write(filename)

    def createArrs():
        return FastArr(), FastArr(), FastArr()

    paths = paths.split("\n")
    print("Exporting point cloud from " + targetTopic + " to " + outPathNoExt)

    print("Input bags: " + str(paths))
    outFileCount = 0
    arrayX, arrayY, arrayZ = createArrs()
    startTime = time.time_ns()
    totalArrayTime = 0
    for path in paths:
        if path.strip() == "":
            continue
        print("Processing " + path)
        bagIn = rosbag.Bag(path)
        for topic, msg, t in bagIn.read_messages():
            if topic == targetTopic:
                arrayTimeStart = time.time_ns()
                for p in pc2.read_points(
                    msg, field_names=("x", "y", "z"), skip_nans=True
                ):
                    arrayX.update(p[0])
                    arrayY.update(p[1])
                    arrayZ.update(p[2])
                totalArrayTime += time.time_ns() - arrayTimeStart
                if arrayX.size > maxPointsPerFile:
                    writeToFile(arrayX, arrayY, arrayZ, outFileCount)
                    arrayX, arrayY, arrayZ = createArrs()
                    outFileCount += 1

    writeToFile(arrayX, arrayY, arrayZ, outFileCount)
    print("Total points: " + str(arrayX.size))
    endTime = time.time_ns()
    print("Total time used = " + str((endTime - startTime) * 1e-9))
    print("Array time used = " + str(totalArrayTime * 1e-9))


# exportPointCloud(
#     "/home/sean/Documents/Github/rosbag-utils/testdata/nuc_2021-09-05-14-51-43_0.bag\n"
#     + "/home/sean/Documents/Github/rosbag-utils/testdata/nuc_2021-09-05-14-52-55_1.bag\n"
#     + "/home/sean/Documents/Github/rosbag-utils/testdata/nuc_2021-09-05-14-53-54_2.bag\n"
#     + "/home/sean/Documents/Github/rosbag-utils/testdata/nuc_2021-09-05-15-50-25_95.bag\n"
#     + "/home/sean/Documents/Github/rosbag-utils/testdata/nuc_2021-09-05-15-50-57_96.bag\n",
#     "/velodyne_cloud_registered",
#     "/media/sean/SSD/pointcloud_all",
#     50000000,
# )

# exportPointCloud(
#     "/home/sean/Documents/Github/rosbag-utils/testdata/nuc_2021-09-05-15-50-25_95.bag",
#     "/velodyne_cloud_registered", "/media/sean/SSD/pointcloud95"
# )
