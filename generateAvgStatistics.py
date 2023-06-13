import os
import rosbag
import rospy
import numpy as np
import math
import argparse
from tqdm import tqdm
from tf.transformations import *


def processOdometry(paths, targetTopic):
    sum_a = 0
    sum_angular_rate = 0
    prev_p = [0.0, 0.0, 0.0]
    prev_v = [0.0, 0.0, 0.0]
    prev_orientation_inv = [0.0, 0.0, 0.0, 0.0]
    prev_timestamp = rospy.Duration(0.0)
    first_frame = True
    count = 0

    for path, pathIdx in zip(paths, range(len(paths))):
        if path.strip() == "":
            continue
        print("Processing   " + path)
        bagIn = rosbag.Bag(path)
        topicsInfo = bagIn.get_type_and_topic_info().topics
        totalMessages = sum(
            [topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in [
                targetTopic]]
        )

        print("total messages:", totalMessages)
        for topic, msg, t in tqdm(bagIn.read_messages(topics=[targetTopic]), total=totalMessages):

            x, y, z = (
                msg.pose.pose.position.x,
                msg.pose.pose.position.y,
                msg.pose.pose.position.z,
            )

            q_x, q_y, q_z, q_w = (
                msg.pose.pose.orientation.x,
                msg.pose.pose.orientation.y,
                msg.pose.pose.orientation.z,
                msg.pose.pose.orientation.w,
            )

            if first_frame:
                prev_p = np.array([x, y, z])
                prev_orientation_inv = np.array([-q_x, -q_y, -q_z, q_w])
                prev_p = np.array([0.0, 0.0, 0.0], np.float64)
                prev_timestamp = t
                first_frame = False
            else:
                cur_p = np.array([x, y, z])
                cur_orientation = np.array([q_x, q_y, q_z, q_w])
                delta_t = (t-prev_timestamp).to_sec()

                # if delta_t < 0.05:
                # print(t)
                # print(prev_timestamp)
                # delta_t = 0.2

                cur_v = (cur_p - prev_p)/delta_t
                cur_acc = (cur_v-prev_v)/delta_t
                sum_a += np.linalg.norm(cur_acc)

                delta_q = quaternion_multiply(
                    prev_orientation_inv, cur_orientation)
                if delta_q[3]-1 > 0:
                    delta_q = np.array([0, 0, 0, 1])
                delta_ang = np.arccos(delta_q[3])*2

                if np.isnan(delta_ang):
                    print("delta_q:{},{},{},{}".format(
                        delta_q[0], delta_q[1], delta_q[2], delta_q[3]))
                    print("delta_ang", delta_ang)
                    exit(-1)
                sum_angular_rate += delta_ang/delta_t

                prev_p = cur_p
                prev_v = cur_v
                prev_orientation_inv = [-q_x, -q_y, -q_z, q_w]
                prev_timestamp = t

            count += 1

    print("count:", count)
    avg_accelaration = sum_a/count
    avg_angular_rate = sum_angular_rate/count
    print("sum_a:{}, sum_angular_rate:{}".format(
        sum_a, sum_angular_rate))
    print("avg_accelaration:{}, avg_angular_rate:{}".format(
        avg_accelaration, avg_angular_rate))


if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="This script will generate average accelaration and average angular rate for a bag. \
                                                \nNotice the input should be the ground truth bag, \
                                                \nor else, the result of SuperOdometry might have drift,\
                                                \ncausing unrealistic result")
    parser.add_argument('datapath', help='destination of data folder')
    parser.add_argument('--topic_name', default='/aft_mapped_to_init_imu',
                        help="topic name that contains the ground truth odomtry")

    args = parser.parse_args()

    bags = os.listdir(args.datapath)

    full_path_list = [os.path.join(args.datapath, x)
                      for x in bags if x.split(".")[-1] == 'bag']
    processOdometry(sorted(full_path_list), args.topic_name)
