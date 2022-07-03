import rosbag
import json
import yaml


def getBagInfoJson(path):
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
    bagIn = rosbag.Bag(path)
    count = 0
    resultTime = -2
    for topic, msg, t in bagIn.read_messages():
        if topic == targetTopic:
            resultTime = -1
            pose = msg.pose.pose.position
            if abs(pose.x) > 0.5 or abs(pose.y) > 0.5 or abs(pose.z) > 0.5:
                if count == 0:
                    resultTime = t
                elif count > 5:
                    return resultTime
                count += 1
            else:
                count = 0

    # >=0: result, -1: no movement, -2: topic not found
    return resultTime


# print(getBagInfoJson("/home/sean/Downloads/thermal_dataset/2/2022-06-23-17-06-36.bag"))
# print(getFirstMoveTime("/home/sean/Downloads/subt_datasets/nuc_2021-09-05-14-51-43_0.bag", "/aft_mapped_to_init"))
