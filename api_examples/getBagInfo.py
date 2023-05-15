import sys
# Add rosbag utils library to path
sys.path.append(".")


from rosbagutils import rosbagutils

bagPath = "./testdata/core_2022-11-08-23-16-59_3.bag"
print(rosbagutils.getBagInfo(bagPath))

# print(rosbagutils.getEnvInfo([bagPath], ["/velodyne_cloud_registered_imu_confidence", "/velodyne_cloud_registered_imu_rgb"]))



# bagPath = "./testdata/2023-01-11-12-44-56.bag"