import rosbag
import sensor_msgs.point_cloud2 as pc2
import numpy as np
import liblas
import time


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
):
    outFileCount = 0
    totalNumPoints = 0
    currentNumPoint = 0
    speed = int(speed)
    outFile = None
    filename = ""

    def initOutFile():
        nonlocal outFileCount, outFile, filename, currentNumPoint
        las_header = liblas.header.Header()
        las_header.data_format_id = 3
        las_header.minor_version = 2
        filename = outPathNoExt + "_" + str(outFileCount) + ".las"
        outFile = file.File(filename, mode="w", header=las_header)
        totalNumPoints += currentNumPoint
        currentNumPoint = 0

    def writeOutFile():
        print("Writing to " + filename)
        outFileCount += 1

    initOutFile()
    maxPointsPerFile = int(maxPointsPerFile)
    paths = paths.split("\n")
    print("Exporting point cloud from " + targetTopic + " to " + outPathNoExt)
    print("Input bags: " + str(paths))
    count = -1
    for path in paths:
        if path.strip() == "":
            continue
        print("Processing " + path)
        bagIn = rosbag.Bag(path)
        for topic, msg, t in bagIn.read_messages(topics=[targetTopic]):
            count += 1
            if count % speed != 0:
                continue

            for p in pc2.read_points(msg, field_names=("x", "y", "z"), skip_nans=True):
                x, y, z = p[0], p[1], p[2]
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

                point = liblas.point.Point()
                point.x = x
                point.y = y
                point.z = z
                point.color = liblas.color.Color(255, 127, 80)
                currentNumPoint += 1
                outFile.write(point)

                if currentNumPoint >= maxPointsPerFile:
                    writeOutFile()
                    initOutFile()
    if currentNumPoint > 0:
        writeOutFile()
    return {"numFiles": outFileCount, "numPoints": totalNumPoints}


exportPointCloud(
    "/mnt/f/_Datasets/tepper_snow/core_2022-03-12-07-47-23_8.bag\n",
    "/velodyne_cloud_registered",
    "/mnt/f/test_pointcloud",
    500000000,
    "none",
    1,
    None,
    None,
    None,
)
