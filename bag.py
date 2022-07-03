import rosbag
import json
import subprocess
import yaml


def getBagInfoJson(path):
    bagIn = rosbag.Bag(path, "r")
    info_raw = bagIn.get_type_and_topic_info()
    # print(json.dumps(info))
    info_dict = yaml.load(subprocess.Popen(['rosbag', 'info', '--yaml', path], stdout=subprocess.PIPE).communicate()[0])
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

# def getFirst

# getBagInfo("/home/sean/Downloads/thermal_dataset/2/2022-06-23-17-06-36.bag")