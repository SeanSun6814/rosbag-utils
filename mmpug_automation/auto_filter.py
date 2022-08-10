import rosbag
import json
import yaml
import subprocess
import traceback
import tkinter as tk
from tkinter import filedialog
import os

MMPUG_SYSTEM_ID = "cmu_rc3"
# define the topics to filter:
ODOMETRY_TOPIC = "/" + MMPUG_SYSTEM_ID + "/aft_mapped_to_init_imu"
ALT_ODOMETRY_TOPIC = "/" + MMPUG_SYSTEM_ID + "/aft_mapped_to_init"

IMU_TOPIC = "/" + MMPUG_SYSTEM_ID + "/imu/data"

REGISTERED_POINTS_TOPIC = "/" + MMPUG_SYSTEM_ID + "/velodyne_cloud_registered_imu"
ALT_REGISTERED_POINTS_TOPIC = "/" + MMPUG_SYSTEM_ID + "/velodyne_cloud_registered"

RAW_POINTS_TOPIC = "/" + MMPUG_SYSTEM_ID + "/velodyne_packets"

TF_TOPIC = "/tf"

RGB_IMAGE_TOPIC = "/" + MMPUG_SYSTEM_ID + "/camera_1/image_raw" # front camera
THERMAL_IMAGE_TOPIC = "/thermal/image" # thermal camera

def getBagInfoJson(path):
    try:
        print("Getting rosbag info for " + path)
        info_dict = yaml.load(subprocess.Popen(['rosbag', 'info', '--yaml', path], stdout=subprocess.PIPE).communicate()[0], Loader=yaml.FullLoader)
        info = {}
        info["size"] = 0
        info["path"] = ""
        info["start"] = 0
        info["end"] = 0
        info["duration"] = 0
        info["messages"] = 0
        info["topics"] = {}
        info["size"] = info_dict["size"]
        info["path"] = info_dict["path"]
        info["start"] = info_dict["start"]
        info["end"] = info_dict["end"]
        info["duration"] = info_dict["duration"]
        info["messages"] = info_dict["messages"]

        topics = {}
        for t in info_dict["topics"]:
            topics[t["topic"]] = [
                t["type"],
                t["messages"],
                -1,
                int(t["messages"]) / info["duration"]
            ]
        info["topics"] = topics
    except Exception:
        print("Get bag info ERROR: ")
        traceback.print_exc()
    print("Finished getting bag info")
    return json.dumps(info)

def getFirstMoveTime(path, targetTopic):
    print("Getting first move time on " + targetTopic + " for " + path)
    bagIn = rosbag.Bag(path)
    count = 0
    resultTime = -2
    for topic, msg, t in bagIn.read_messages(topics=[targetTopic]):
        if resultTime == -2:
            resultTime = -1
        pose = msg.pose.pose.position
        if abs(pose.x) > 0.5 or abs(pose.y) > 0.5 or abs(pose.z) > 0.5:
            if count == 0:
                resultTime = str(t)
            elif count > 5:
                print("Found first move time: " + str(resultTime))
                return resultTime
            count += 1
        else:
            count = 0

    # >=0: result, -1: no movement, -2: topic not found
    return resultTime


def exportBag(pathIn, pathOut, targetTopics, startTime, endTime, trajectoryTopic):
    print(
        "Processing bag " + pathIn + " -> " + pathOut + " for time range " + startTime + "-" + endTime
    )
    targetTopics = targetTopics.split(" ")
    print("Including topics: " + str(targetTopics))

    if abs(-1 - float(startTime)) < 0.01:
        print("Skip bag...")
        return [0, 0, 0, 0, 0]

    startTime = float(startTime) * 1e9
    endTime = float(endTime) * 1e9

    bagIn = rosbag.Bag(pathIn)
    lastPos = None
    length = 0.0
    with rosbag.Bag(pathOut, "w") as bagOut:
        for topic, msg, t in bagIn.read_messages(topics=targetTopics):
            timestamp = float(str(t))
            if timestamp >= startTime and timestamp <= endTime:
                if topic in targetTopics:
                    bagOut.write(topic, msg, t)

                if topic == trajectoryTopic:
                    pose = msg.pose.pose.position
                    pose = [pose.x, pose.y, pose.z, timestamp]
                    length += dist(pose, lastPos)
                    lastPos = pose
            elif timestamp > endTime:
                break

    print("Finished export bag")
    if trajectoryTopic == "" or lastPos is None:
        return [0, 0, 0, -1, 0]
    else:
        lastPos.append(length)
        return lastPos


def dist(a, b):
    if a is None or b is None:
        return 0.0
    [x1, y1, z1, _] = a
    [x2, y2, z2, _] = b
    return (((x2 - x1) ** 2) + ((y2 - y1) ** 2) + ((z2 - z1) ** 2)) ** (1 / 2)


# The function extract all bag files from the given directory
def extract_bag_files(directory):
    bag_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".bag"):
                bag_files.append(os.path.join(root, file))
    return bag_files

# the function extract the system id from the given bag file
def extract_system_id(bag_file):
    possible_topics = ["/cmu_rc3/aft_mapped_to_init_imu", "/cmu_rc3/aft_mapped_to_init"
                    "/cmu_rc2/aft_mapped_to_init_imu", "/cmu_rc2/aft_mapped_to_init",
                    "/cmu_rc1/aft_mapped_to_init_imu", "/cmu_rc1/aft_mapped_to_init"
                    "/cmu_sp1/aft_mapped_to_init_imu", "/cmu_sp1/aft_mapped_to_init",
                    "/cmu_rc4/aft_mapped_to_init_imu", "/cmu_rc4/aft_mapped_to_init",
                    "/cmu_sp2/aft_mapped_to_init_imu", "/cmu_sp2/aft_mapped_to_init",]


    bag = rosbag.Bag(bag_file)
    for topic, msg, t in bag.read_messages(topics=possible_topics):
        return topic.split("/")[1]
    return ""

# the function open a file selector window and return all the selected folder paths
def select_folders():
    dirselect = filedialog.Directory()
    dirs = []
    while True:
        d = dirselect.show()
        if not d: break
        dirs.append(d)
    return dirs

def main():
    global MMPUG_SYSTEM_ID
    global ODOMETRY_TOPIC
    global ALT_ODOMETRY_TOPIC
    global IMU_TOPIC
    global REGISTERED_POINTS_TOPIC
    global ALT_REGISTERED_POINTS_TOPIC
    global RAW_POINTS_TOPIC
    global TF_TOPIC
    global RGB_IMAGE_TOPIC
    global THERMAL_IMAGE_TOPIC

    # get system id from command line
    folders = select_folders()
    if len(folders) == 0:
        print("No folder selected")
        return
    for folder in folders:
        print("Processing folder " + folder)
        bag_files = extract_bag_files(folder)
        if len(bag_files) == 0:
            print("No bag file found in " + folder)
            continue
        MMPUG_SYSTEM_ID = extract_system_id(bag_files[0])
        if MMPUG_SYSTEM_ID == "":
            print("Failed to extract system id from bag file " + bag_files[0])
            continue
        print("System id: " + MMPUG_SYSTEM_ID)
        # define the topics to filter:
        ODOMETRY_TOPIC = "/" + MMPUG_SYSTEM_ID + "/aft_mapped_to_init_imu"
        ALT_ODOMETRY_TOPIC = "/" + MMPUG_SYSTEM_ID + "/aft_mapped_to_init"

        IMU_TOPIC = "/" + MMPUG_SYSTEM_ID + "/imu/data"

        REGISTERED_POINTS_TOPIC = "/" + MMPUG_SYSTEM_ID + "/velodyne_cloud_registered_imu"
        ALT_REGISTERED_POINTS_TOPIC = "/" + MMPUG_SYSTEM_ID + "/velodyne_cloud_registered"

        RAW_POINTS_TOPIC = "/" + MMPUG_SYSTEM_ID + "/velodyne_packets"

        TF_TOPIC = "/tf"

        RGB_IMAGE_TOPIC = "/" + MMPUG_SYSTEM_ID + "/camera_1/image_raw"
        
if __name__ == "__main__":
    main()


    
