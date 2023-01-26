import rosbag
import sensor_msgs.point_cloud2 as pc2
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


def dist3d(pos1, pos2):
    return ((pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2 + (pos1[2] - pos2[2]) ** 2) ** 0.5


def exportPointCloud(
    paths,
    targetTopic,
    outPathNoExt,
    maxPointsPerFile,
    collapseAxis,
    speed,
    xMinMax,
    yMinMax,
    zMinMax,
    odomStatsTopic,
    odomPosTopic,
    colorCsvFile,
):
    outFileCount = 0
    totalNumPoints = 0
    speed = int(speed)

    def writeToFile(arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB, arrayI):
        nonlocal outFileCount, totalNumPoints
        totalNumPoints += arrayX.size
        filename = outPathNoExt + "_" + str(outFileCount) + ".las"
        print("Writing to " + filename)
        header = laspy.LasHeader(version="1.3", point_format=3)
        lasData = laspy.LasData(header)
        lasData.x = arrayX.finalize()
        lasData.y = arrayY.finalize()
        lasData.z = arrayZ.finalize()
        lasData.red = arrayR.finalize()
        lasData.green = arrayG.finalize()
        lasData.blue = arrayB.finalize()
        lasData.intensity = arrayI.finalize()
        lasData.gps_time = arrayT.finalize()
        lasData.write(filename)
        outFileCount += 1

    def createArrs():
        return FastArr(), FastArr(), FastArr(), FastArr(), FastArr(), FastArr(), FastArr(), FastArr()

    maxPointsPerFile = int(maxPointsPerFile)
    paths = paths.split("\n")
    print("Exporting point cloud from " + targetTopic + " to " + outPathNoExt)

    print("Input bags: " + str(paths))
    arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB, arrayI = createArrs()
    startTime = time.time_ns()
    totalArrayTime = 0
    count = -1
    color_variable = 1
    position_variable = (0, 0, 0)
    color_variable_csv = []
    color_variable_idx = 0
    if colorCsvFile != "":
        print("Using csv file: " + colorCsvFile)
        with open(colorCsvFile) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=",")
            for row in csv_reader:
                color_variable_csv.append([float(row[0]), float(row[1])])

    for path in paths:
        if path.strip() == "":
            continue
        print("Processing " + path)
        bagIn = rosbag.Bag(path)
        for topic, msg, t in bagIn.read_messages(topics=[targetTopic, odomStatsTopic, odomPosTopic]):

            if topic == odomStatsTopic:
                color_variable = msg.uncertainty_x
                continue
            elif topic == odomPosTopic:
                position_variable = (msg.pose.pose.position.x, msg.pose.pose.position.y, msg.pose.pose.position.z)
                continue

            if colorCsvFile != "":
                while color_variable_idx + 1 < len(color_variable_csv) and color_variable_csv[color_variable_idx + 1][0] < int(str(t)):
                    color_variable_idx += 1
                color_variable = color_variable_csv[color_variable_idx][1]

            count += 1
            if count % speed != 0:
                continue

            arrayTimeStart = time.time_ns()
            for p in pc2.read_points(msg, skip_nans=True):
                x, y, z, intensity = p[0], p[1], p[2], p[3]
                print("intensity:", intensity)
                if xMinMax != None and (x < xMinMax[0] or x > xMinMax[1]):
                    continue
                if yMinMax != None and (y < yMinMax[0] or y > yMinMax[1]):
                    continue
                if zMinMax != None and (z < zMinMax[0] or z > zMinMax[1]):
                    continue

                if collapseAxis == "x":
                    x = 0
                elif collapseAxis == "y":
                    y = 0
                elif collapseAxis == "z":
                    z = 0

                #####################  CONFIG  #####################
                USE_IMU = True
                USE_INVERT_FOR_WHITE_BACKGROUND = False
                USE_DISCARD_RADIUS = 6
                r_value = 1 - color_variable
                g_value = color_variable
                b_value = 0
                ####################################################

                if dist3d((x, y, z), position_variable) > USE_DISCARD_RADIUS:
                    continue

                arrayT.update(int(str(t)))
                arrayI.update(intensity)

                if USE_IMU:
                    arrayX.update(x)
                    arrayY.update(y)
                    arrayZ.update(z)
                else:
                    arrayX.update(x)
                    arrayY.update(z)
                    arrayZ.update(y)

                if USE_INVERT_FOR_WHITE_BACKGROUND:
                    r_value = 1 - r_value
                    g_value = 1 - g_value
                    b_value = 1 - b_value

                arrayR.update(r_value * 65535)
                arrayG.update(g_value * 65535)
                arrayB.update(b_value * 65535)

            totalArrayTime += time.time_ns() - arrayTimeStart
            if arrayX.size > maxPointsPerFile:
                writeToFile(arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB, arrayI)
                arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB, arrayI = createArrs()

    if arrayX.size > 0:
        writeToFile(arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB, arrayI)

    print("Total points: " + str(totalNumPoints))
    endTime = time.time_ns()
    print("Total time used = " + str((endTime - startTime) * 1e-9))
    print("Array time used = " + str(totalArrayTime * 1e-9))
    return {"numFiles": outFileCount, "numPoints": totalNumPoints}


exportPointCloud(
    # "/mnt/f/_Datasets/long_corridor/core_2018-01-28-11-32-32_0.bag\n"+
    #  "/mnt/f/_Datasets/long_corridor/core_2018-01-28-11-34-59_1.bag\n"+
    # "/mnt/f/_Datasets/long_corridor/core_2018-01-28-11-37-23_2.bag\n",
    # "/mnt/f/_Datasets/tepper_snow/core_2022-03-12-07-26-57_0.bag",
    # "/mnt/f/_Datasets/2022-08-18_spot_multi_floor/run_4/bags/core_2022-08-18-17-16-31_0.bag",
    "/mnt/c/Users/Sean/Downloads/2022-10-05-12-55-18.bag",
    "/velodyne_cloud_registered_imu",
    "/mnt/f/long_corridor_uncertainty_intens_rad6_3m_smooth40_not",
    1e12,
    "none",
    1,
    None,
    None,
    None,
    "NOT/cmu_sp1/super_odometry_stats",
    "/cmu_sp1/aft_mapped_to_init_imu",
    "/mnt/f/long_corridor_uncertainty_40.csv",
)
