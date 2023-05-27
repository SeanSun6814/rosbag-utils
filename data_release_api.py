import json
import os
import argparse
from rosbagutils import rosbagutils


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--bagpath')
    
    args = parser.parse_args()
    bagpath = str(args.bagpath)
    bagpath = os.path.abspath(bagpath)
    print("Processing bag file at: ",bagpath)
    pathout = os.path.abspath('./datasets/spot_data_B_level-3jun/data') + ('/')
    # print("pathout in main: ",pathout)

    topicMap = {}
    topicinfo = {}
    topicinfo['name'] = 'odom'
    topicinfo['type'] = 'nav_msgs/Odometry'
    topicMap['/cmu_sp1/integrated_to_init'] = topicinfo

    print("\n\n=============================================Starting Odom processing=============================================")
    res = rosbagutils.datasetRelease([bagpath], pathout ,'test', topicMap, "link")    
    print("=============================================Done Odom processing=============================================")
    
    topicMap = {}
    topicinfo = {}
    topicinfo['name'] = 'imu'
    topicinfo['type'] = 'sensor_msgs/Imu'
    topicMap['/cmu_sp1/imu/data'] = topicinfo    
    
    print("\n\n=============================================Starting IMU processing=============================================")
    res = rosbagutils.datasetRelease([bagpath], pathout ,'test', topicMap, "link")    
    print("=============================================Done IMU processing=============================================")
    
    topicMap = {}
    topicinfo = {}
    topicinfo['name'] = 'transforms'
    topicinfo['type'] = 'tf2_msgs/TFMessage'
    topicMap['/tf'] = topicinfo
    
    print("\n\n=============================================Starting TF processing=============================================")
    res = rosbagutils.datasetRelease([bagpath], pathout ,'test', topicMap, "link")    
    print("=============================================Done TF processing=============================================")
    
    topicMap = {}
    topicinfo = {}
    topicinfo['name'] = 'super_odom_stats'
    topicinfo['type'] = 'super_odometry_msgs/OptimizationStats'
    topicMap['/cmu_sp1/super_odometry_stats'] = topicinfo
    
    print("\n\n=============================================Starting SuperOdomStats processing=============================================")
    res = rosbagutils.datasetRelease([bagpath], pathout ,'test', topicMap, "link")    
    print("=============================================Done SuperOdomStats processing=============================================")