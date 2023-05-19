
from super_odometry_msgs.msg import OptimizationStats

import os
import rosbag
import random
import numpy as np
import math

localization_vars = ["timestamp", "laserCloudSurfFromMapNum", "laserCloudCornerFromMapNum", "laserCloudSurfStackNum", "laserCloudCornerStackNum", "total_translation", "total_rotation",
                     "translation_from_last", "rotation_from_last", "time_elapsed", "latency", "n_iterations", "average_distance", "uncertainty_x", "uncertainty_y", "uncertainty_z",
                     "uncertainty_roll", "uncertainty_pitch", "uncertainty_yaw", "PlaneMatchSuccess",  "PlaneNoEnoughNeighbor",  "PlaneNeighborTooFar",  "PlaneBADPCAStructure",
                     "PlaneInvalidNumerical",  "PlaneMSETOOLARGE",  "PlaneUnknown",  "PredictionSource", "iterations.translation_norm", "iterations.rotation_norm", "iterations.num_surf_from_scan", "iterations.num_corner_from_scan",
                     "meanSquareDistEdgeInlierNum", "meanSquareDistEdgeOutlierNum", "fitQualityCoeffEdgeInlierNum", "fitQualityCoeffEdgeOutlierNum", "meanSquareDistPlaneInlierNum",
                     "meanSquareDistPlaneOutlierNum", "fitQualityCoeffPlaneInlierNum", "fitQualityCoeffPlaneOutlierNum", ]

super_odom_vars = ["timestamp", "laserCloudSurfFromMapNum", "laserCloudCornerFromMapNum", "laserCloudSurfStackNum", "laserCloudCornerStackNum", "total_translation", "total_rotation",
                   "translation_from_last", "rotation_from_last", "time_elapsed", "latency", "n_iterations", "average_distance", "uncertainty_x", "uncertainty_y", "uncertainty_z",
                   "uncertainty_roll", "uncertainty_pitch", "uncertainty_yaw", "PlaneMatchSuccess",  "PlaneNoEnoughNeighbor",  "PlaneNeighborTooFar",  "PlaneBADPCAStructure",
                   "PlaneInvalidNumerical",  "PlaneMSETOOLARGE",  "PlaneUnknown",  "PredictionSource", "iterations.translation_norm", "iterations.rotation_norm",
                   "iterations.num_surf_from_scan", "iterations.num_corner_from_scan"]


def getFolderFromPath(path):
    return path[: path.rfind("/") + 1]


def mkdir(path):
    if not os.path.exists(path):
        os.makedirs(path, exist_ok=True)


def getFolderSize(start_path):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(start_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            if not os.path.islink(fp):
                total_size += os.path.getsize(fp)

    return total_size  # in bytes


def list_full_paths(directory):
    return [os.path.join(directory, file) for file in os.listdir(directory)]


def processSuperOdomMsg(paths, targetTopic, pathOut, localization_mode=1, sendProgress=None):
    mkdir(getFolderFromPath(pathOut))
    count = 0
    percentProgressPerBag = 1 / len(paths)
    with open(pathOut + "/super_odometry_stats.csv", "w") as f:
        if localization_mode:
            f.write(",".join(localization_vars)+"\n")
        else:
            f.write(",".join(super_odom_vars)+"\n")
        for path, pathIdx in zip(paths, range(len(paths))):
            if path.strip() == "":
                continue
            print("Processing " + path)
            basePercentage = pathIdx * percentProgressPerBag
            # if sendProgress is not None:
            #     sendProgress(
            #         percentage=(basePercentage + 0.05 * percentProgressPerBag),
            #         details=("Loading " + utils.getFilenameFromPath(path)),
            #     )
            bagIn = rosbag.Bag(path)
            # if sendProgress is not None:
            #     sendProgress(
            #         percentage=(basePercentage + 0.1 * percentProgressPerBag),
            #         details=("Processing " + str(count) + " IMU messages"),
            #     )
            topicsInfo = bagIn.get_type_and_topic_info().topics
            totalMessages = sum(
                [topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in [
                    targetTopic]]
            )
            sendProgressEveryHowManyMessages = max(random.randint(
                77, 97), int(totalMessages / (100 / len(paths))))
            bagStartCount = count
            for topic, msg, t in bagIn.read_messages(topics=[targetTopic]):
                timestamp = str(t)
                write_str = (timestamp + "," + str(msg.laserCloudSurfFromMapNum)
                             + "," + str(msg.laserCloudCornerFromMapNum)
                             + "," + str(msg.laserCloudSurfStackNum)
                             + "," + str(msg.laserCloudCornerStackNum)
                             + "," + str(msg.total_translation)
                             + "," + str(msg.translation_from_last)
                             + "," + str(msg.rotation_from_last)
                             + "," + str(msg.time_elapsed)
                             + "," + str(msg.latency)
                             + "," + str(msg.n_iterations)
                             + "," + str(msg.average_distance)
                             + "," + str(msg.uncertainty_x)
                             + "," + str(msg.uncertainty_y)
                             + "," + str(msg.uncertainty_z)
                             + "," + str(msg.uncertainty_roll)
                             + "," + str(msg.uncertainty_pitch)
                             + "," + str(msg.uncertainty_yaw)
                             + "," + str(msg.uncertainty_pitch)
                             + "," + str(msg.PlaneMatchSuccess)
                             + "," + str(msg.PlaneNoEnoughNeighbor)
                             + "," + str(msg.PlaneNeighborTooFar)
                             + "," + str(msg.PlaneBADPCAStructure)
                             + "," + str(msg.PlaneInvalidNumerical)
                             + "," + str(msg.PlaneMSETOOLARGE)
                             + "," + str(msg.PlaneUnknown)
                             + "," + str(msg.PredictionSource)
                             + "," + str(msg.iterations[0].translation_norm)
                             + "," + str(msg.iterations[1].rotation_norm)
                             + "," + str(msg.iterations[2].num_surf_from_scan)
                             + "," + str(msg.iterations[3].num_corner_from_scan))

                if localization_mode:
                    write_str += ("," + str(msg.meanSquareDistEdgeInlierNum)
                                  + "," + str(msg.meanSquareDistEdgeOutlierNum)
                                  + "," + str(msg.fitQualityCoeffEdgeInlierNum)
                                  + "," +
                                  str(msg.fitQualityCoeffEdgeOutlierNum)
                                  + "," + str(msg.meanSquareDistPlaneInlierNum)
                                  + "," +
                                  str(msg.meanSquareDistPlaneOutlierNum)
                                  + "," +
                                  str(msg.fitQualityCoeffPlaneInlierNum)
                                  + "," + str(msg.fitQualityCoeffPlaneOutlierNum))

                f.write(
                    write_str
                    + "\n"
                )

                count += 1
                if count % sendProgressEveryHowManyMessages == 0:
                    if sendProgress is not None:
                        sendProgress(
                            percentage=(
                                basePercentage
                                + ((count - bagStartCount) / totalMessages *
                                   0.89 + 0.1) * percentProgressPerBag
                            ),
                            details=("Processing " + str(count) +
                                     "super_odometry_msgs/OptimizationStats messages"),
                        )

    result = {
        "num_messages": count,
        "size": getFolderSize(pathOut),
    }
    return result


if __name__ == "__main__":
    bag_folder = "/data/home/airlab/run_4/bags/"
    processSuperOdomMsg(list_full_paths(bag_folder), "/cmu_sp1/super_odometry_stats",
                        "/data/home/airlab/run_4/release/", 0)
