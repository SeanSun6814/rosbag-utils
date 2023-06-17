import json
import os
import argparse
import rosbag
import rospy
from rosbagutils import rosbagutils


def check_topic(key, topic, topic_dict):
    if key not in topic_dict:
        topic_dict[key] = topic

    return topic_dict


class velodyne_topics:
    topic_list = ['velodyne_cloud_registered_imu', 'velodyne_cloud_registered',
                              'velodyne_points', 'velodyne_packets']
    topic_num : int = 100

class odometry_topics:
    topic_list = [
        "integrated_to_init_imu",
        "aft_mapped_to_init_imu",
        "integrated_to_global",
        "integrated_to_init",
        "integrated_to_init_incremental",
        "integrated_to_init2",
        "aft_mapped_to_init",
        "aft_mapped_to_init_incremental",
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
    # parser.add_argument('--datapath' , help='destination of data folder')
    # parser.add_argument('--start_time', default=0, help='start_time of a bag, in seconds')
    # parser.add_argument('--stop_time', help='stop_time of a bag, in seconds')
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
        topic_list = list(topic_dict.topics.keys())
        start_timestamp = rospy.Time(test_bag.get_start_time() + configs[i]["start_time"])
        if configs[i]["end_time"] == -1:
            end_timestamp = None
        else:
            end_timestamp = rospy.Time(test_bag.get_start_time() + configs[i]["end_time"])

        release_topics = {}
        camera_topics = []
        vel_topics = velodyne_topics()
        odom_topics = odometry_topics()

        for topic in topic_list:
            if "velodyne" in topic:
                for vel_topic in vel_topics.topic_list:
                    if vel_topic in topic:
                        # checking if there is a topic with higher priority
                        if vel_topics.topic_list.index(vel_topic) <= vel_topics.topic_num:
                            release_topics = check_topic("lidar", topic, release_topics)
            if "init" in topic:
                for odom_topic in odom_topics.topic_list:
                    if odom_topic in topic:
                        if odom_topics.topic_list.index(odom_topic) <= odom_topics.topic_num:
                            release_topics = check_topic("odom", topic, release_topics)
            elif "imu/data" in topic:
                release_topics = check_topic("imu", topic, release_topics)
            elif "thermal/image" in topic:
                release_topics = check_topic("thermal", topic, release_topics)
            elif "/tf" in topic:
                release_topics = check_topic("tf", topic, release_topics)
            elif "stats" in topic:
                release_topics = check_topic("stats", topic, release_topics)
            elif "prediction_source" in topic:
                release_topics = check_topic("pred_source", topic, release_topics)
            elif "image_raw" in topic:
                camera_topics.append(topic)

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
