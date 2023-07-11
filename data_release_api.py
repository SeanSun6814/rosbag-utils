import json
import os
import argparse
import rosbag
import rospy
from rosbagutils import rosbagutils


def check_topic(key, topic, topic_dict):
    topic_dict[key] = topic
    return topic_dict


class velodyne_topics:
    topic_list = ['velodyne_points', 'velodyne_packets']
    topic_num : int = 100

class mapping_topics:
    topic_list = ['velodyne_cloud_registered_imu', 'velodyne_cloud_registered']
    topic_num : int = 100

class aft_odometry_topics:
    topic_list = [
        "aft_mapped_to_init_imu",
        "aft_mapped_to_init",
        "aft_mapped_to_init_incremental"
    ]
    topic_num: int = 100

class integrated_odometry_topics:
    topic_list = [
        "integrated_to_init",
        "integrated_to_init2",
        "integrated_to_init_imu",
        "integrated_to_init_incremental",
        "integrated_to_global",
    ]
    topic_num: int = 100


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        formatter_class=argparse.RawDescriptionHelpFormatter,
        description="Script for processing bag files using rosbagutils API.\
                                                \nOrganize the bag files from one run in a single folder.\
                                                \ne.g. \033[91mdata/file_1.bag file_2.bag ..... file_n.bag\033[0m\
                                                \nGive the path to this folder in the --datapath argument.",
    )
    parser.add_argument("config_file", help="json config file")
    parser.add_argument(
        "--in_docker",
        default=True,
        help="flag to indicate whether you are inside docker, this will add a /data prefix to the your file path",
    )
    args = parser.parse_args()
    f = open(args.config_file)
    configs = json.load(f)
    print(configs)
    n_data = len(configs)
    print(n_data)
    for i in range(n_data):
        if args.in_docker:
            bagpath = "/data/" + configs[i]["datapath"]
        else:
            bagpath = configs[i]["datapath"]
            bagpath = os.path.abspath(bagpath)
        print("Processing bag files at: ", bagpath)

        file_list = sorted(os.listdir(bagpath))
        file_list = [file for file in file_list if file[-4:] == ".bag"]
        file_list = [os.path.join(bagpath, file) for file in file_list]
        assert len(file_list) > 0, "Number of bags in the data folder, \033[91m{}\033[0m should be non-zero".format(
            bagpath
        )

        if len(file_list) > 0:
            pathout = bagpath + ("/results/")
            if not os.path.exists(pathout):
                os.makedirs(pathout)
                print("Creating results folder at: ", pathout)

        test_bag = rosbag.Bag(file_list[0], mode="r")
        topic_dict = test_bag.get_type_and_topic_info()
        topic_info = topic_dict.topics
        # print(topic_dict)
        topic_list = list(topic_dict.topics.keys())
        start_timestamp = rospy.Time(test_bag.get_start_time() + configs[i]["start_time"])
        if configs[i]["end_time"] == -1:
            end_timestamp = None
        else:
            end_timestamp = rospy.Time(test_bag.get_start_time() + configs[i]["end_time"])

        release_topics = {}
        camera_topics = []
        vel_topics = velodyne_topics()
        map_topics = mapping_topics()
        aft_odom_topics = aft_odometry_topics()
        integrated_odom_topics = integrated_odometry_topics()

        for topic in topic_list:
            if "velodyne" in topic:
                for vel_topic in vel_topics.topic_list:
                    if topic == configs[i]["namespace"] + "/" + vel_topic:
                        # checking if there is a topic with higher priority
                        index = vel_topics.topic_list.index(vel_topic)
                        if index <= vel_topics.topic_num:
                            vel_topics.topic_num = index
                            release_topics = check_topic("lidar", topic, release_topics)
                for map_topic in map_topics.topic_list:
                    if topic == configs[i]["namespace"] + "/" + map_topic:
                        index = map_topics.topic_list.index(map_topic)
                        if index <= map_topics.topic_num:
                            map_topics.topic_num = index
                            release_topics = check_topic("mapping", topic, release_topics)
            if "init" in topic:
                for aft_odom_topic in aft_odom_topics.topic_list:
                    if aft_odom_topic in topic:
                        index = aft_odom_topics.topic_list.index(aft_odom_topic)
                        if index <= aft_odom_topics.topic_num:
                            aft_odom_topics.topic_num = index
                            release_topics = check_topic("aft_odom", topic, release_topics)
                for integrated_odom_topic in integrated_odom_topics.topic_list:
                    if integrated_odom_topic in topic:
                        index = integrated_odom_topics.topic_list.index(integrated_odom_topic)
                        if index <= integrated_odom_topics.topic_num:
                            integrated_odom_topics.topic_num = index
                            release_topics = check_topic("integrated_odom", topic, release_topics)
            elif topic == configs[i]["namespace"] + "/imu/data":
                release_topics = check_topic("imu", topic, release_topics)
            elif "/thermal/image" in topic:
                release_topics = check_topic("thermal", topic, release_topics)
            elif topic.endswith("/tf"):
                release_topics = check_topic("tf", topic, release_topics)
            elif "stats" in topic:
                release_topics = check_topic("stats", topic, release_topics)
            elif "prediction_source" in topic:
                release_topics = check_topic("pred_source", topic, release_topics)
            elif topic.endswith("/image_raw"):
                camera_topics.append(topic)
        print(release_topics, camera_topics)

        total_num_topics = len(release_topics) + len(camera_topics)
        assert total_num_topics > 0, "There are no relevant topics available for data release, in the bag files"

        test_bag.close()
        topicMap = {}
        for rel_topic_key, rel_topic_name in release_topics.items():
            topicinfo_dict = {}
            topicinfo_dict["name"] = rel_topic_key
            topicinfo_dict["type"] = topic_info[rel_topic_name].msg_type
            topicMap[rel_topic_name] = topicinfo_dict

        for cam_topic_name, cam_idx in zip(camera_topics, range(len(camera_topics))):
            topicinfo_dict = {}
            topicinfo_dict["name"] = "cam_" + str(cam_idx)
            topicinfo_dict["type"] = "sensor_msgs/Image"
            topicMap[cam_topic_name] = topicinfo_dict

        print(
            "\n\n\033[93m********************************Starting Data Release********************************\033[0m"
        )
        res = rosbagutils.datasetRelease(
            file_list, pathout, "test", topicMap, "link", start_time=start_timestamp, end_time=end_timestamp
        )
        print("\n\n\033[93m********************************Done Data Release********************************\033[0m")
        print("\n\033[92mResults have been stored at: \033[0m", pathout, "\n")