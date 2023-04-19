import rosbag
import sensor_msgs.point_cloud2 as pc2
import numpy as np
import laspy
import time
import os
import server.utils as utils
import random
import csv


def exportPointCloud(
    paths,
    targetTopic,
    odomStatsTopic,
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
        sendProgress(details="Writing to " + utils.getFilenameFromPath(filename))
        header = laspy.LasHeader(version="1.3", point_format=3)
        lasData = laspy.LasData(header)
        lasData.x = arrayX.finalize()
        lasData.y = arrayY.finalize()
        lasData.z = arrayZ.finalize()
        lasData.gps_time = arrayT.finalize()
        if arrayR.size > 0 and arrayG.size > 0 and arrayB.size > 0:
            print("Writing RGB...")
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

    utils.mkdir(utils.getFolderFromPath(outPathNoExt))
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
    color_variable = 0
    with open(utils.getFolderFromPath(outPathNoExt) + "uncertainty.csv", "w") as file:
        file.write(
            "timestamp, x_uncertainty, y_uncertainty, z_uncertainty, roll_uncertainty, pitch_uncertainty, yaw_uncertainty\n"
        )
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
            topicsInfo = bagIn.get_type_and_topic_info().topics
            totalMessages = sum(
                [topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in [targetTopic]]
            )
            sendProgress(
                percentage=(basePercentage + 0.1 * percentProgressPerBag),
                details=("Processing " + str(totalNumPoints) + " points"),
            )
            sendProgressEveryHowManyMessages = max(random.randint(2, 5), int(totalMessages / (300 / len(paths))))
            bagStartCount = count
            for topic, msg, t in bagIn.read_messages(topics=[targetTopic, odomStatsTopic]):
                if topic == odomStatsTopic:
                    color_variable = min(
                        msg.uncertainty_x,
                        msg.uncertainty_y,
                        msg.uncertainty_z,
                        msg.uncertainty_roll,
                        msg.uncertainty_pitch,
                        msg.uncertainty_yaw,
                    )
                    file.write(
                        str(int(str(t)))
                        + ","
                        + str(msg.uncertainty_x)
                        + ","
                        + str(msg.uncertainty_y)
                        + ","
                        + str(msg.uncertainty_z)
                        + ","
                        + str(msg.uncertainty_roll)
                        + ","
                        + str(msg.uncertainty_pitch)
                        + ","
                        + str(msg.uncertainty_yaw)
                        + "\n"
                    )
                else:
                    count += 1
                    if count % speed != 0:
                        continue

                    if count % sendProgressEveryHowManyMessages == 0:
                        sendProgress(
                            percentage=(
                                basePercentage
                                + ((count - bagStartCount) / totalMessages * 0.89 + 0.1) * percentProgressPerBag
                            ),
                            details=("Processing " + str(totalNumPoints + arrayX.size) + " points"),
                        )

                    arrayTimeStart = time.time_ns()
                    for p in pc2.read_points(msg, field_names=("x", "y", "z"), skip_nans=True):
                        x, y, z = p[0], p[1], p[2]
                        r_value = 1 - color_variable
                        g_value = color_variable
                        b_value = 0
                        arrayR.update(r_value * 65535)
                        arrayG.update(g_value * 65535)
                        arrayB.update(b_value * 65535)

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

                    totalArrayTime += time.time_ns() - arrayTimeStart
                    if arrayX.size > maxPointsPerFile:
                        writeToFile(arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB)
                        (
                            arrayX,
                            arrayY,
                            arrayZ,
                            arrayT,
                            arrayR,
                            arrayG,
                            arrayB,
                        ) = createArrs()

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
    utils.writeResultFile(utils.getFolderFromPath(outPathNoExt) + "result.json", envInfo, result)
    return result
