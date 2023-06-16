# from super_odometry_msgs.msg import OptimizationStats

import os
import rosbag
import random
import numpy as np
from .. import utils
from tqdm import tqdm
import math

full_var_list = [
    "timestamp",
    "laserCloudSurfFromMapNum",
    "laserCloudCornerFromMapNum",
    "laserCloudSurfStackNum",
    "laserCloudCornerStackNum",
    "total_translation",
    "total_rotation",
    "translation_from_last",
    "rotation_from_last",
    "time_elapsed",
    "latency",
    "n_iterations",
    "average_distance",
    "uncertainty_x",
    "uncertainty_y",
    "uncertainty_z",
    "uncertainty_roll",
    "uncertainty_pitch",
    "uncertainty_yaw",
    "PlaneMatchSuccess",
    "PlaneNoEnoughNeighbor",
    "PlaneNeighborTooFar",
    "PlaneBADPCAStructure",
    "PlaneInvalidNumerical",
    "PlaneMSETOOLARGE",
    "PlaneUnknown",
    "PredictionSource",
    "meanSquareDistEdgeInlierNum",
    "meanSquareDistEdgeOutlierNum",
    "fitQualityCoeffEdgeInlierNum",
    "fitQualityCoeffEdgeOutlierNum",
    "meanSquareDistPlaneInlierNum",
    "meanSquareDistPlaneOutlierNum",
    "fitQualityCoeffPlaneInlierNum",
    "fitQualityCoeffPlaneOutlierNum",
]

iteration_var_list = ["translation_norm", "rotation_norm", "num_surf_from_scan", "num_corner_from_scan"]


def get_info(bag: rosbag.Bag, targetTopic: str):
    headers: list(str) = []
    num_iterations: int = 0
    i = 0
    for topic, msg, t in bag.read_messages(topics=[targetTopic]):
        num_iterations = msg.n_iterations
        i += 1
        if i > 5:
            break
        member_list = dir(msg)
        member_list = [elem for elem in member_list if elem[0] != "_"]

        for var in full_var_list:
            if var in member_list:
                if var not in headers:
                    headers.append(var)

    return headers, num_iterations


def processSuperOdomStats(paths, targetTopic, pathOut, sendProgress=None, start_time=None, end_time=None):
    utils.mkdir(utils.getFolderFromPath(pathOut))
    count = 0
    percentProgressPerBag = 1 / len(paths)
    with open(pathOut + "/super_odometry_stats.csv", "w") as f:
        for path, pathIdx in zip(paths, range(len(paths))):
            if path.strip() == "":
                continue
            print("Processing " + path)
            basePercentage = pathIdx * percentProgressPerBag
            if sendProgress is not None:
                sendProgress(
                    percentage=(basePercentage + 0.05 * percentProgressPerBag),
                    details=("Loading " + utils.getFilenameFromPath(path)),
                )
            bagIn = rosbag.Bag(path)
            if sendProgress is not None:
                sendProgress(
                    percentage=(basePercentage + 0.1 * percentProgressPerBag),
                    details=("Processing " + str(count) + " SuperOdomStats messages"),
                )
            topicsInfo = bagIn.get_type_and_topic_info().topics
            totalMessages = sum(
                [topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in [targetTopic]]
            )
            sendProgressEveryHowManyMessages = max(random.randint(77, 97), int(totalMessages / (100 / len(paths))))
            bagStartCount = count

            headers, num_iterations = get_info(bagIn, targetTopic)
            if pathIdx == 0:
                header_write_str = "timestamp" + ","
                for header in headers:
                    header_write_str += str(header) + ","

                for i in range(num_iterations):
                    for iter_header in iteration_var_list:
                        header_write_str += "iteration" + str(i) + "_" + iter_header + ","

                header_write_str = header_write_str[:-1] + "\n"
                f.write(header_write_str)
            i = 0
            for topic, msg, t in tqdm(
                bagIn.read_messages(topics=[targetTopic], start_time=start_time, end_time=end_time), total=totalMessages
            ):
                write_str = str(msg.header.stamp) + ","

                for attr in headers:
                    write_str += str(getattr(msg, attr)) + ","

                for iter in msg.iterations:
                    for iter_attr in iteration_var_list:
                        write_str += str(getattr(iter, iter_attr)) + ","

                write_str = write_str[:-1]
                f.write(write_str + "\n")

                count += 1
                if count % sendProgressEveryHowManyMessages == 0:
                    if sendProgress is not None:
                        sendProgress(
                            percentage=(
                                basePercentage
                                + ((count - bagStartCount) / totalMessages * 0.89 + 0.1) * percentProgressPerBag
                            ),
                            details=("Processing " + str(count) + "SuperOdomStats messages"),
                        )

    result = {
        "num_messages": count,
        "size": utils.getFolderSize(pathOut),
    }
    return result
