import rosbag
import sensor_msgs.point_cloud2 as pc2
import numpy as np
import laspy
import time
import os
import server.utils
import random


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


def exportPointCloud(
    paths,
    targetTopic,
    outPathNoExt,
    maxPointsPerFile,
    collapseAxis,
    speed,
    trimCloud,
    envInfo,
    sendProgress,
):
    def writeToFile(arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB):
        nonlocal outFileCount, totalNumPoints
        totalNumPoints += arrayX.size
        filename = outPathNoExt + "_" + str(outFileCount) + ".las"
        print("Writing to " + filename)
        sendProgress(details="Writing to " + server.utils.getFilenameFromPath(filename))
        header = laspy.LasHeader(version="1.3", point_format=3)
        lasData = laspy.LasData(header)
        lasData.x = arrayX.finalize()
        lasData.y = arrayY.finalize()
        lasData.z = arrayZ.finalize()
        lasData.gps_time = arrayT.finalize()
        if arrayR.size > 0 and arrayG.size > 0 and arrayB.size > 0:
            lasData.red = arrayR.finalize()
            lasData.green = arrayG.finalize()
            lasData.blue = arrayB.finalize()
        lasData.write(filename)
        outFileCount += 1

    def createArrs():
        return (
            FastArr(),
            FastArr(),
            FastArr(),
            FastArr(),
            FastArr(),
            FastArr(),
            FastArr(),
        )

    server.utils.mkdir(server.utils.getFolderFromPath(outPathNoExt))
    maxPointsPerFile = int(maxPointsPerFile)
    outFileCount = 0
    totalNumPoints = 0
    speed = int(speed)
    print("Exporting point cloud from " + targetTopic + " to " + outPathNoExt)
    print("Input bags: " + str(paths))
    percentProgressPerBag = 1 / len(paths)

    arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB = createArrs()
    startTime = time.time_ns()
    totalArrayTime = 0
    count = -1
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
        topicsInfo = bagIn.get_type_and_topic_info().topics
        totalMessages = sum(
            [
                topicsInfo[topic].message_count if topic in topicsInfo else 0
                for topic in [targetTopic]
            ]
        )
        sendProgress(
            percentage=(basePercentage + 0.1 * percentProgressPerBag),
            details=("Processing " + str(totalNumPoints) + " points"),
        )
        sendProgressEveryHowManyMessages = max(
            random.randint(2, 5), int(totalMessages / (100 / len(paths)))
        )
        bagStartCount = count
        for topic, msg, t in bagIn.read_messages(topics=[targetTopic]):
            count += 1
            if count % speed != 0:
                continue

            if count % sendProgressEveryHowManyMessages == 0:
                sendProgress(
                    percentage=(
                        basePercentage
                        + ((count - bagStartCount) / totalMessages * 0.89 + 0.1)
                        * percentProgressPerBag
                    ),
                    details=(
                        "Processing " + str(totalNumPoints + arrayX.size) + " points"
                    ),
                )

            arrayTimeStart = time.time_ns()
            for p in pc2.read_points(
                msg, field_names=("x", "y", "z", "rgba"), skip_nans=True
            ):
                x, y, z = p[0], p[1], p[2]
                if len(p) > 3:
                    rgb = p[3]
                    r_value = (rgb & 0x00FF0000) >> 16
                    g_value = (rgb & 0x0000FF00) >> 8
                    b_value = rgb & 0x000000FF
                    arrayR.update(r_value)
                    arrayG.update(g_value)
                    arrayB.update(b_value)

                if trimCloud != None:
                    if x < trimCloud["xMin"] or x > trimCloud["xMax"]:
                        continue
                    if y < trimCloud["yMin"] or y > trimCloud["yMax"]:
                        continue
                    if z < trimCloud["zMin"] or z > trimCloud["zMax"]:
                        continue

                if collapseAxis == "X":
                    x = 0
                elif collapseAxis == "Y":
                    y = 0
                elif collapseAxis == "Z":
                    z = 0

                arrayT.update(int(str(t)))
                arrayX.update(x)
                arrayY.update(y)
                arrayZ.update(z)

                # # If data is not in _imu format:
                # arrayX.update(x)
                # arrayY.update(z)
                # arrayZ.update(y)

            totalArrayTime += time.time_ns() - arrayTimeStart
            if arrayX.size > maxPointsPerFile:
                writeToFile(arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB)
                arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB = createArrs()

    if arrayX.size > 0:
        writeToFile(arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB)

    print("Total points: " + str(totalNumPoints))
    endTime = time.time_ns()
    print("Total time used = " + str((endTime - startTime) * 1e-9))
    print("Array time used = " + str(totalArrayTime * 1e-9))
    result = {
        "numFiles": outFileCount,
        "numPoints": totalNumPoints,
        "totalTimeUsed": str((endTime - startTime) * 1e-9),
        "arrayTimeUsed": str(totalArrayTime * 1e-9),
        "totalTopics": count + 1,
    }
    server.utils.writeResultFile(
        server.utils.getFolderFromPath(outPathNoExt) + "result.json", envInfo, result
    )
    return result
