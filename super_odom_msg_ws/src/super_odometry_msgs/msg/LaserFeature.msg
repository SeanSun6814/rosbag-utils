# feature Info
Header header 

int64 sensor

int64 imuAvailable
int64 odomAvailable

# IMU initial guess for laser mapping
float64 imuQuaternionX
float64 imuQuaternionY
float64 imuQuaternionZ
float64 imuQuaternionW

# Odometry initial guess for laser mapping
float64 initialPoseX
float64 initialPoseY
float64 initialPoseZ
float64 initialQuaternionX
float64 initialQuaternionY
float64 initialQuaternionZ
float64 initialQuaternionW 

# Preintegration reset ID
int64 imuPreintegrationResetId

# Point cloud messages
sensor_msgs/PointCloud2 cloud_nodistortion  # original cloud remove distortion
sensor_msgs/PointCloud2 cloud_corner    # extracted corner feature
sensor_msgs/PointCloud2 cloud_surface   # extracted surface feature
sensor_msgs/PointCloud2 cloud_realsense   # extracted surface feature from realsense