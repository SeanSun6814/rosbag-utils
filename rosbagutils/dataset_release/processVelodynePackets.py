import rosbag
import velodyne_decoder as vd
import sensor_msgs.point_cloud2 as pc2
import numpy as np
import laspy
import time
import os
from .. import utils
from tqdm import tqdm
import random
import struct


def processVelodynePackets(paths, targetTopic, pathOut, sendProgress, start_time=None, end_time=None):
    def writeToFile(arrayX, arrayY, arrayZ, arrayIntensity, arrayT, arrayR, arrayG, arrayB):
        nonlocal outFileCount, totalNumPoints
        totalNumPoints += arrayX.size
        filename = pathOut + str(outFileCount) + ".bin"
        with open(filename, "wb") as f:
            num_of_clouds = 1
            f.write(num_of_clouds.to_bytes(4, "little"))
            num_of_points: int = arrayX.size
            f.write(num_of_points.to_bytes(4, "little"))
            if arrayR.size > 0 and arrayG.size > 0 and arrayB.size > 0:
                f.write(0b11000000.to_bytes(1, "little"))
            else:
                f.write(0b10000000.to_bytes(1, "little"))
            for i in range(arrayX.size):
                f.write(struct.pack("<f", arrayX.get_ith(i)))
                f.write(struct.pack("<f", arrayY.get_ith(i)))
                f.write(struct.pack("<f", arrayZ.get_ith(i)))
                f.write(struct.pack("<f", arrayIntensity.get_ith(i)))
                if arrayR.size > 0 and arrayG.size > 0 and arrayB.size > 0:
                    f.write(struct.pack("B", arrayR.get_ith(i)))
                    f.write(struct.pack("B", arrayG.get_ith(i)))
                    f.write(struct.pack("B", arrayB.get_ith(i)))
        outFileCount += 1

    def createArrs():
        return (
            utils.FastArr(),
            utils.FastArr(),
            utils.FastArr(),
            utils.FastArr(),
            utils.FastArr(),
            utils.FastArr(),
            utils.FastArr(),
            utils.FastArr()
        )

    utils.mkdir(utils.getFolderFromPath(pathOut))
    outFileCount = 0
    totalNumPoints = 0
    # print("Exporting point cloud from " + targetTopic + " to " + pathOut)
    # print("Input bags: " + str(paths))
    percentProgressPerBag = 1 / len(paths)

    arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB, arrayIntensity = createArrs()
    startTime = time.time_ns()
    totalArrayTime = 0
    count = -1
    with open(pathOut + "/timestamps.txt", "w") as f:
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
            # for topic, msg, t in tqdm(
            #     bagIn.read_messages(topics=[targetTopic], start_time=start_time, end_time=end_time), total=totalMessages
            # ):
            
            for stamp, points, topic, _ in tqdm(vd.read_bag(path, topics=[targetTopic], as_pcl_structs=True) , total=totalMessages):
            
                count += 1

                if count % sendProgressEveryHowManyMessages == 0:
                    sendProgress(
                        percentage=(
                            basePercentage
                            + ((count - bagStartCount) / totalMessages * 0.89 + 0.1) * percentProgressPerBag
                        ),
                        details=("Processing " + str(totalNumPoints + arrayX.size) + " points"),
                    )
                current_cloud = points.view(np.recarray)
                arrayX.data = current_cloud.x
                arrayY.data = current_cloud.y
                arrayZ.data = current_cloud.z
                arrayIntensity.data = current_cloud.intensity
                
                
                arrayX.size = len(current_cloud.x)
                arrayY.size = len(current_cloud.y)
                arrayZ.size = len(current_cloud.z)
                arrayIntensity.size = len(current_cloud.intensity)
                
                # arrayTimeStart = time.time_ns()
                # for p in pc2.read_points(msg, field_names=("x", "y", "z", "rgba"), skip_nans=True):
                #     x, y, z = p[0], p[1], p[2]
                #     if len(p) > 3:
                #         rgb = p[3]
                #         r_value = (rgb & 0x00FF0000) >> 16
                #         g_value = (rgb & 0x0000FF00) >> 8
                #         b_value = rgb & 0x000000FF
                #         arrayR.update(r_value)
                #         arrayG.update(g_value)
                #         arrayB.update(b_value)

                #     arrayT.update(int(str(stamp)))
                #     arrayX.update(x)
                #     arrayY.update(y)
                #     arrayZ.update(z)

                # totalArrayTime += time.time_ns() - arrayTimeStart
                writeToFile(arrayX, arrayY, arrayZ, arrayIntensity, arrayT, arrayR, arrayG, arrayB)
                arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB, arrayIntensity = createArrs()
                f.write(str(stamp) + "\n")

    print("Total points: " + str(totalNumPoints))
    endTime = time.time_ns()
    print("Total time used = " + str((endTime - startTime) * 1e-9))
    print("Array time used = " + str(totalArrayTime * 1e-9))
    result = {
        "numFiles": outFileCount,
        "numPoints": totalNumPoints,
        "totalTimeUsed": str((endTime - startTime) * 1e-9),
        "arrayTimeUsed": str(totalArrayTime * 1e-9),
        "totalMessages": count + 1,
        "size": utils.getFolderSize(pathOut),
    }
    return result
