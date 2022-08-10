import re
from turtle import st
import rosbag
from datetime import datetime
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

def getBagInfo(path):
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
    return info

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

def process_a_run(current_run):
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
    print("Processing run " + current_run)
    bags_location = os.path.join(current_run, "bags")
    bag_files = extract_bag_files(bags_location)
    if len(bag_files) == 0:
        print("No bag file found in " + bags_location)
        return None
    MMPUG_SYSTEM_ID = extract_system_id(bag_files[0])
    if MMPUG_SYSTEM_ID == "":
        print("Failed to extract system id from bag file " + bag_files[0])
        return None
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
    THERMAL_IMAGE_TOPIC = "/" + MMPUG_SYSTEM_ID + "/camera_2/image_raw"

    is_start_move = True
    run_export_dir = os.path.join(current_run, "export_"+datetime.datetime.now().strftime("%Y%m%d_%H%M%S"))
    last_pos = [0, 0, 0, 0, 0]
    for current_bag in bag_files:
        print("Processing bag file " + current_bag)
        use_alt = False
        current_bag_info = getBagInfo(current_bag)
        if current_bag_info is None:    
            print("Failed to get bag info from " + current_bag)
            continue
    
        # find the start time of the move
        if not is_start_move:
            current_start_time = getFirstMoveTime(current_bag, ODOMETRY_TOPIC)
            if current_start_time == -2:
                use_alt = True
                current_start_time = getFirstMoveTime(current_bag, ALT_ODOMETRY_TOPIC)
                if current_start_time == -2:
                    print("No odometry topic in " + current_bag)
                    continue
            elif current_start_time == -1:
                print("No movement in " + current_bag)
                continue
            else:
                is_start_move = True
                current_bag_info["start_time"] = current_start_time

        # setup all parameters for the current bag
        current_export_path = os.path.join(run_export_dir, os.path.basename(current_bag)+"_processed")
        current_target_topics = [ODOMETRY_TOPIC, IMU_TOPIC, REGISTERED_POINTS_TOPIC, RAW_POINTS_TOPIC, TF_TOPIC, RGB_IMAGE_TOPIC, THERMAL_IMAGE_TOPIC]
        if use_alt:
            current_target_topics = [ALT_ODOMETRY_TOPIC, IMU_TOPIC, ALT_REGISTERED_POINTS_TOPIC, RAW_POINTS_TOPIC, TF_TOPIC, RGB_IMAGE_TOPIC, THERMAL_IMAGE_TOPIC]
        # export the bag
        last_pos = exportBag(current_bag, current_export_path, current_target_topics, current_bag_info["start_time"], current_bag_info["end_time"])
        print("Finished processing bag file " + current_bag)
    print("Finished processing run " + current_run)
    return last_pos
        
def process_payload(payload_dir):
    all_runs = []
    for root, dirs, files in os.walk(payload_dir):
        for d in dirs:
            all_runs.append(os.path.join(root, d))
    for current_run in all_runs:
        process_a_run(current_run)
    return

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
    for payload_dir in folders:
        print("Processing folder " + payload_dir)
        process_payload(payload_dir)
        print("Finished processing folder " + payload_dir)
    return

if __name__ == "__main__":
    main()


    
