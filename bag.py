import rosbag
import json
import yaml
import tkinter as tk
from tkinter import filedialog
from threading import Event

selectBagDialogFinish = Event()
selectBagDialogRequest = Event()
selectBagMsg = None


def selectBagDialog():
    global selectBagMsg

    selectBagDialogRequest.clear()
    while True:
        selectBagDialogRequest.wait()
        print("Opening new select file dialog")
        root = tk.Tk()
        root.withdraw()
        msg = tk.filedialog.askopenfiles(filetypes=[("Rosbag", "*.bag")])
        selectBagMsg = [file.name for file in msg]
        print(selectBagMsg)
        selectBagDialogRequest.clear()
        selectBagDialogFinish.set()


def getBagInfoJson(path):
    print("Getting rosbag info for " + path)
    bagIn = rosbag.Bag(path, "r")
    info_raw = bagIn.get_type_and_topic_info()
    # info_dict = yaml.load(subprocess.Popen(['rosbag', 'info', '--yaml', path], stdout=subprocess.PIPE).communicate()[0])
    info_dict = yaml.load(rosbag.Bag(path, "r")._get_yaml_info())
    info = {}
    info["topics"] = info_raw[1]
    info["path"] = info_dict["path"]
    info["start"] = info_dict["start"]
    info["end"] = info_dict["end"]
    info["size"] = info_dict["size"]
    info["duration"] = info_dict["duration"]
    info["messages"] = info_dict["messages"]
    info = json.dumps(info)
    return info


def getFirstMoveTime(path, targetTopic):
    print("Getting first move time on " + targetTopic + " for " + path)
    bagIn = rosbag.Bag(path)
    print("getFirstMoveTime for bag " + path)
    count = 0
    resultTime = -2
    for topic, msg, t in bagIn.read_messages():
        if topic == targetTopic:
            if resultTime == -2:
                resultTime = -1
            pose = msg.pose.pose.position
            if abs(pose.x) > 0.5 or abs(pose.y) > 0.5 or abs(pose.z) > 0.5:
                if count == 0:
                    resultTime = str(t)
                elif count > 5:
                    return resultTime
                count += 1
            else:
                count = 0

    # >=0: result, -1: no movement, -2: topic not found
    return resultTime


# print(getBagInfoJson("/home/sean/Downloads/thermal_dataset/2/2022-06-23-17-06-36.bag"))
# print(getFirstMoveTime("/home/sean/Downloads/subt_datasets/nuc_2021-09-05-14-52-55_1.bag", "/aft_mapped_to_init"))
