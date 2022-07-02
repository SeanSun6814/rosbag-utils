import rosbag
import json

# from sensor_msgs.msg import Image
# bagIn = rosbag.Bag(args.bag_in, "r")
# bagOut = rosbag.Bag(args.bag_out, "w")
# bridge = CvBridge()


def getBagInfoJson(path):
    bagIn = rosbag.Bag(path, "r")
    info = bagIn.get_type_and_topic_info()
    # print(json.dumps(info))
    return json.dumps(info)


# getBagInfo("/home/sean/Downloads/thermal_dataset/2/2022-06-23-17-06-36.bag")
