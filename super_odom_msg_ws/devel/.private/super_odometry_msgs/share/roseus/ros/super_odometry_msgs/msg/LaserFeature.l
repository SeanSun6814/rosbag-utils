;; Auto-generated. Do not edit!


(when (boundp 'super_odometry_msgs::LaserFeature)
  (if (not (find-package "SUPER_ODOMETRY_MSGS"))
    (make-package "SUPER_ODOMETRY_MSGS"))
  (shadow 'LaserFeature (find-package "SUPER_ODOMETRY_MSGS")))
(unless (find-package "SUPER_ODOMETRY_MSGS::LASERFEATURE")
  (make-package "SUPER_ODOMETRY_MSGS::LASERFEATURE"))

(in-package "ROS")
;;//! \htmlinclude LaserFeature.msg.html
(if (not (find-package "SENSOR_MSGS"))
  (ros::roseus-add-msgs "sensor_msgs"))
(if (not (find-package "STD_MSGS"))
  (ros::roseus-add-msgs "std_msgs"))


(defclass super_odometry_msgs::LaserFeature
  :super ros::object
  :slots (_header _sensor _imuAvailable _odomAvailable _imuQuaternionX _imuQuaternionY _imuQuaternionZ _imuQuaternionW _initialPoseX _initialPoseY _initialPoseZ _initialQuaternionX _initialQuaternionY _initialQuaternionZ _initialQuaternionW _imuPreintegrationResetId _cloud_nodistortion _cloud_corner _cloud_surface _cloud_realsense ))

(defmethod super_odometry_msgs::LaserFeature
  (:init
   (&key
    ((:header __header) (instance std_msgs::Header :init))
    ((:sensor __sensor) 0)
    ((:imuAvailable __imuAvailable) 0)
    ((:odomAvailable __odomAvailable) 0)
    ((:imuQuaternionX __imuQuaternionX) 0.0)
    ((:imuQuaternionY __imuQuaternionY) 0.0)
    ((:imuQuaternionZ __imuQuaternionZ) 0.0)
    ((:imuQuaternionW __imuQuaternionW) 0.0)
    ((:initialPoseX __initialPoseX) 0.0)
    ((:initialPoseY __initialPoseY) 0.0)
    ((:initialPoseZ __initialPoseZ) 0.0)
    ((:initialQuaternionX __initialQuaternionX) 0.0)
    ((:initialQuaternionY __initialQuaternionY) 0.0)
    ((:initialQuaternionZ __initialQuaternionZ) 0.0)
    ((:initialQuaternionW __initialQuaternionW) 0.0)
    ((:imuPreintegrationResetId __imuPreintegrationResetId) 0)
    ((:cloud_nodistortion __cloud_nodistortion) (instance sensor_msgs::PointCloud2 :init))
    ((:cloud_corner __cloud_corner) (instance sensor_msgs::PointCloud2 :init))
    ((:cloud_surface __cloud_surface) (instance sensor_msgs::PointCloud2 :init))
    ((:cloud_realsense __cloud_realsense) (instance sensor_msgs::PointCloud2 :init))
    )
   (send-super :init)
   (setq _header __header)
   (setq _sensor (round __sensor))
   (setq _imuAvailable (round __imuAvailable))
   (setq _odomAvailable (round __odomAvailable))
   (setq _imuQuaternionX (float __imuQuaternionX))
   (setq _imuQuaternionY (float __imuQuaternionY))
   (setq _imuQuaternionZ (float __imuQuaternionZ))
   (setq _imuQuaternionW (float __imuQuaternionW))
   (setq _initialPoseX (float __initialPoseX))
   (setq _initialPoseY (float __initialPoseY))
   (setq _initialPoseZ (float __initialPoseZ))
   (setq _initialQuaternionX (float __initialQuaternionX))
   (setq _initialQuaternionY (float __initialQuaternionY))
   (setq _initialQuaternionZ (float __initialQuaternionZ))
   (setq _initialQuaternionW (float __initialQuaternionW))
   (setq _imuPreintegrationResetId (round __imuPreintegrationResetId))
   (setq _cloud_nodistortion __cloud_nodistortion)
   (setq _cloud_corner __cloud_corner)
   (setq _cloud_surface __cloud_surface)
   (setq _cloud_realsense __cloud_realsense)
   self)
  (:header
   (&rest __header)
   (if (keywordp (car __header))
       (send* _header __header)
     (progn
       (if __header (setq _header (car __header)))
       _header)))
  (:sensor
   (&optional __sensor)
   (if __sensor (setq _sensor __sensor)) _sensor)
  (:imuAvailable
   (&optional __imuAvailable)
   (if __imuAvailable (setq _imuAvailable __imuAvailable)) _imuAvailable)
  (:odomAvailable
   (&optional __odomAvailable)
   (if __odomAvailable (setq _odomAvailable __odomAvailable)) _odomAvailable)
  (:imuQuaternionX
   (&optional __imuQuaternionX)
   (if __imuQuaternionX (setq _imuQuaternionX __imuQuaternionX)) _imuQuaternionX)
  (:imuQuaternionY
   (&optional __imuQuaternionY)
   (if __imuQuaternionY (setq _imuQuaternionY __imuQuaternionY)) _imuQuaternionY)
  (:imuQuaternionZ
   (&optional __imuQuaternionZ)
   (if __imuQuaternionZ (setq _imuQuaternionZ __imuQuaternionZ)) _imuQuaternionZ)
  (:imuQuaternionW
   (&optional __imuQuaternionW)
   (if __imuQuaternionW (setq _imuQuaternionW __imuQuaternionW)) _imuQuaternionW)
  (:initialPoseX
   (&optional __initialPoseX)
   (if __initialPoseX (setq _initialPoseX __initialPoseX)) _initialPoseX)
  (:initialPoseY
   (&optional __initialPoseY)
   (if __initialPoseY (setq _initialPoseY __initialPoseY)) _initialPoseY)
  (:initialPoseZ
   (&optional __initialPoseZ)
   (if __initialPoseZ (setq _initialPoseZ __initialPoseZ)) _initialPoseZ)
  (:initialQuaternionX
   (&optional __initialQuaternionX)
   (if __initialQuaternionX (setq _initialQuaternionX __initialQuaternionX)) _initialQuaternionX)
  (:initialQuaternionY
   (&optional __initialQuaternionY)
   (if __initialQuaternionY (setq _initialQuaternionY __initialQuaternionY)) _initialQuaternionY)
  (:initialQuaternionZ
   (&optional __initialQuaternionZ)
   (if __initialQuaternionZ (setq _initialQuaternionZ __initialQuaternionZ)) _initialQuaternionZ)
  (:initialQuaternionW
   (&optional __initialQuaternionW)
   (if __initialQuaternionW (setq _initialQuaternionW __initialQuaternionW)) _initialQuaternionW)
  (:imuPreintegrationResetId
   (&optional __imuPreintegrationResetId)
   (if __imuPreintegrationResetId (setq _imuPreintegrationResetId __imuPreintegrationResetId)) _imuPreintegrationResetId)
  (:cloud_nodistortion
   (&rest __cloud_nodistortion)
   (if (keywordp (car __cloud_nodistortion))
       (send* _cloud_nodistortion __cloud_nodistortion)
     (progn
       (if __cloud_nodistortion (setq _cloud_nodistortion (car __cloud_nodistortion)))
       _cloud_nodistortion)))
  (:cloud_corner
   (&rest __cloud_corner)
   (if (keywordp (car __cloud_corner))
       (send* _cloud_corner __cloud_corner)
     (progn
       (if __cloud_corner (setq _cloud_corner (car __cloud_corner)))
       _cloud_corner)))
  (:cloud_surface
   (&rest __cloud_surface)
   (if (keywordp (car __cloud_surface))
       (send* _cloud_surface __cloud_surface)
     (progn
       (if __cloud_surface (setq _cloud_surface (car __cloud_surface)))
       _cloud_surface)))
  (:cloud_realsense
   (&rest __cloud_realsense)
   (if (keywordp (car __cloud_realsense))
       (send* _cloud_realsense __cloud_realsense)
     (progn
       (if __cloud_realsense (setq _cloud_realsense (car __cloud_realsense)))
       _cloud_realsense)))
  (:serialization-length
   ()
   (+
    ;; std_msgs/Header _header
    (send _header :serialization-length)
    ;; int64 _sensor
    8
    ;; int64 _imuAvailable
    8
    ;; int64 _odomAvailable
    8
    ;; float64 _imuQuaternionX
    8
    ;; float64 _imuQuaternionY
    8
    ;; float64 _imuQuaternionZ
    8
    ;; float64 _imuQuaternionW
    8
    ;; float64 _initialPoseX
    8
    ;; float64 _initialPoseY
    8
    ;; float64 _initialPoseZ
    8
    ;; float64 _initialQuaternionX
    8
    ;; float64 _initialQuaternionY
    8
    ;; float64 _initialQuaternionZ
    8
    ;; float64 _initialQuaternionW
    8
    ;; int64 _imuPreintegrationResetId
    8
    ;; sensor_msgs/PointCloud2 _cloud_nodistortion
    (send _cloud_nodistortion :serialization-length)
    ;; sensor_msgs/PointCloud2 _cloud_corner
    (send _cloud_corner :serialization-length)
    ;; sensor_msgs/PointCloud2 _cloud_surface
    (send _cloud_surface :serialization-length)
    ;; sensor_msgs/PointCloud2 _cloud_realsense
    (send _cloud_realsense :serialization-length)
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; std_msgs/Header _header
       (send _header :serialize s)
     ;; int64 _sensor
#+(or :alpha :irix6 :x86_64)
       (progn (sys::poke _sensor (send s :buffer) (send s :count) :long) (incf (stream-count s) 8))
#-(or :alpha :irix6 :x86_64)
       (cond ((and (class _sensor) (= (length (_sensor . bv)) 2)) ;; bignum
              (write-long (ash (elt (_sensor . bv) 0) 0) s)
              (write-long (ash (elt (_sensor . bv) 1) -1) s))
             ((and (class _sensor) (= (length (_sensor . bv)) 1)) ;; big1
              (write-long (elt (_sensor . bv) 0) s)
              (write-long (if (>= _sensor 0) 0 #xffffffff) s))
             (t                                         ;; integer
              (write-long _sensor s)(write-long (if (>= _sensor 0) 0 #xffffffff) s)))
     ;; int64 _imuAvailable
#+(or :alpha :irix6 :x86_64)
       (progn (sys::poke _imuAvailable (send s :buffer) (send s :count) :long) (incf (stream-count s) 8))
#-(or :alpha :irix6 :x86_64)
       (cond ((and (class _imuAvailable) (= (length (_imuAvailable . bv)) 2)) ;; bignum
              (write-long (ash (elt (_imuAvailable . bv) 0) 0) s)
              (write-long (ash (elt (_imuAvailable . bv) 1) -1) s))
             ((and (class _imuAvailable) (= (length (_imuAvailable . bv)) 1)) ;; big1
              (write-long (elt (_imuAvailable . bv) 0) s)
              (write-long (if (>= _imuAvailable 0) 0 #xffffffff) s))
             (t                                         ;; integer
              (write-long _imuAvailable s)(write-long (if (>= _imuAvailable 0) 0 #xffffffff) s)))
     ;; int64 _odomAvailable
#+(or :alpha :irix6 :x86_64)
       (progn (sys::poke _odomAvailable (send s :buffer) (send s :count) :long) (incf (stream-count s) 8))
#-(or :alpha :irix6 :x86_64)
       (cond ((and (class _odomAvailable) (= (length (_odomAvailable . bv)) 2)) ;; bignum
              (write-long (ash (elt (_odomAvailable . bv) 0) 0) s)
              (write-long (ash (elt (_odomAvailable . bv) 1) -1) s))
             ((and (class _odomAvailable) (= (length (_odomAvailable . bv)) 1)) ;; big1
              (write-long (elt (_odomAvailable . bv) 0) s)
              (write-long (if (>= _odomAvailable 0) 0 #xffffffff) s))
             (t                                         ;; integer
              (write-long _odomAvailable s)(write-long (if (>= _odomAvailable 0) 0 #xffffffff) s)))
     ;; float64 _imuQuaternionX
       (sys::poke _imuQuaternionX (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _imuQuaternionY
       (sys::poke _imuQuaternionY (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _imuQuaternionZ
       (sys::poke _imuQuaternionZ (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _imuQuaternionW
       (sys::poke _imuQuaternionW (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _initialPoseX
       (sys::poke _initialPoseX (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _initialPoseY
       (sys::poke _initialPoseY (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _initialPoseZ
       (sys::poke _initialPoseZ (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _initialQuaternionX
       (sys::poke _initialQuaternionX (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _initialQuaternionY
       (sys::poke _initialQuaternionY (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _initialQuaternionZ
       (sys::poke _initialQuaternionZ (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _initialQuaternionW
       (sys::poke _initialQuaternionW (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; int64 _imuPreintegrationResetId
#+(or :alpha :irix6 :x86_64)
       (progn (sys::poke _imuPreintegrationResetId (send s :buffer) (send s :count) :long) (incf (stream-count s) 8))
#-(or :alpha :irix6 :x86_64)
       (cond ((and (class _imuPreintegrationResetId) (= (length (_imuPreintegrationResetId . bv)) 2)) ;; bignum
              (write-long (ash (elt (_imuPreintegrationResetId . bv) 0) 0) s)
              (write-long (ash (elt (_imuPreintegrationResetId . bv) 1) -1) s))
             ((and (class _imuPreintegrationResetId) (= (length (_imuPreintegrationResetId . bv)) 1)) ;; big1
              (write-long (elt (_imuPreintegrationResetId . bv) 0) s)
              (write-long (if (>= _imuPreintegrationResetId 0) 0 #xffffffff) s))
             (t                                         ;; integer
              (write-long _imuPreintegrationResetId s)(write-long (if (>= _imuPreintegrationResetId 0) 0 #xffffffff) s)))
     ;; sensor_msgs/PointCloud2 _cloud_nodistortion
       (send _cloud_nodistortion :serialize s)
     ;; sensor_msgs/PointCloud2 _cloud_corner
       (send _cloud_corner :serialize s)
     ;; sensor_msgs/PointCloud2 _cloud_surface
       (send _cloud_surface :serialize s)
     ;; sensor_msgs/PointCloud2 _cloud_realsense
       (send _cloud_realsense :serialize s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; std_msgs/Header _header
     (send _header :deserialize buf ptr-) (incf ptr- (send _header :serialization-length))
   ;; int64 _sensor
#+(or :alpha :irix6 :x86_64)
      (setf _sensor (prog1 (sys::peek buf ptr- :long) (incf ptr- 8)))
#-(or :alpha :irix6 :x86_64)
      (setf _sensor (let ((b0 (prog1 (sys::peek buf ptr- :integer) (incf ptr- 4)))
                  (b1 (prog1 (sys::peek buf ptr- :integer) (incf ptr- 4))))
              (cond ((= b1 -1) b0)
                     ((and (= b1  0)
                           (<= lisp::most-negative-fixnum b0 lisp::most-positive-fixnum))
                      b0)
                    ((= b1  0) (make-instance bignum :size 1 :bv (integer-vector b0)))
                    (t (make-instance bignum :size 2 :bv (integer-vector b0 (ash b1 1)))))))
   ;; int64 _imuAvailable
#+(or :alpha :irix6 :x86_64)
      (setf _imuAvailable (prog1 (sys::peek buf ptr- :long) (incf ptr- 8)))
#-(or :alpha :irix6 :x86_64)
      (setf _imuAvailable (let ((b0 (prog1 (sys::peek buf ptr- :integer) (incf ptr- 4)))
                  (b1 (prog1 (sys::peek buf ptr- :integer) (incf ptr- 4))))
              (cond ((= b1 -1) b0)
                     ((and (= b1  0)
                           (<= lisp::most-negative-fixnum b0 lisp::most-positive-fixnum))
                      b0)
                    ((= b1  0) (make-instance bignum :size 1 :bv (integer-vector b0)))
                    (t (make-instance bignum :size 2 :bv (integer-vector b0 (ash b1 1)))))))
   ;; int64 _odomAvailable
#+(or :alpha :irix6 :x86_64)
      (setf _odomAvailable (prog1 (sys::peek buf ptr- :long) (incf ptr- 8)))
#-(or :alpha :irix6 :x86_64)
      (setf _odomAvailable (let ((b0 (prog1 (sys::peek buf ptr- :integer) (incf ptr- 4)))
                  (b1 (prog1 (sys::peek buf ptr- :integer) (incf ptr- 4))))
              (cond ((= b1 -1) b0)
                     ((and (= b1  0)
                           (<= lisp::most-negative-fixnum b0 lisp::most-positive-fixnum))
                      b0)
                    ((= b1  0) (make-instance bignum :size 1 :bv (integer-vector b0)))
                    (t (make-instance bignum :size 2 :bv (integer-vector b0 (ash b1 1)))))))
   ;; float64 _imuQuaternionX
     (setq _imuQuaternionX (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _imuQuaternionY
     (setq _imuQuaternionY (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _imuQuaternionZ
     (setq _imuQuaternionZ (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _imuQuaternionW
     (setq _imuQuaternionW (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _initialPoseX
     (setq _initialPoseX (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _initialPoseY
     (setq _initialPoseY (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _initialPoseZ
     (setq _initialPoseZ (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _initialQuaternionX
     (setq _initialQuaternionX (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _initialQuaternionY
     (setq _initialQuaternionY (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _initialQuaternionZ
     (setq _initialQuaternionZ (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _initialQuaternionW
     (setq _initialQuaternionW (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; int64 _imuPreintegrationResetId
#+(or :alpha :irix6 :x86_64)
      (setf _imuPreintegrationResetId (prog1 (sys::peek buf ptr- :long) (incf ptr- 8)))
#-(or :alpha :irix6 :x86_64)
      (setf _imuPreintegrationResetId (let ((b0 (prog1 (sys::peek buf ptr- :integer) (incf ptr- 4)))
                  (b1 (prog1 (sys::peek buf ptr- :integer) (incf ptr- 4))))
              (cond ((= b1 -1) b0)
                     ((and (= b1  0)
                           (<= lisp::most-negative-fixnum b0 lisp::most-positive-fixnum))
                      b0)
                    ((= b1  0) (make-instance bignum :size 1 :bv (integer-vector b0)))
                    (t (make-instance bignum :size 2 :bv (integer-vector b0 (ash b1 1)))))))
   ;; sensor_msgs/PointCloud2 _cloud_nodistortion
     (send _cloud_nodistortion :deserialize buf ptr-) (incf ptr- (send _cloud_nodistortion :serialization-length))
   ;; sensor_msgs/PointCloud2 _cloud_corner
     (send _cloud_corner :deserialize buf ptr-) (incf ptr- (send _cloud_corner :serialization-length))
   ;; sensor_msgs/PointCloud2 _cloud_surface
     (send _cloud_surface :deserialize buf ptr-) (incf ptr- (send _cloud_surface :serialization-length))
   ;; sensor_msgs/PointCloud2 _cloud_realsense
     (send _cloud_realsense :deserialize buf ptr-) (incf ptr- (send _cloud_realsense :serialization-length))
   ;;
   self)
  )

(setf (get super_odometry_msgs::LaserFeature :md5sum-) "4df4873a8473f99d913205e932f77f89")
(setf (get super_odometry_msgs::LaserFeature :datatype-) "super_odometry_msgs/LaserFeature")
(setf (get super_odometry_msgs::LaserFeature :definition-)
      "# feature Info
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
================================================================================
MSG: std_msgs/Header
# Standard metadata for higher-level stamped data types.
# This is generally used to communicate timestamped data 
# in a particular coordinate frame.
# 
# sequence ID: consecutively increasing ID 
uint32 seq
#Two-integer timestamp that is expressed as:
# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')
# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')
# time-handling sugar is provided by the client library
time stamp
#Frame this data is associated with
string frame_id

================================================================================
MSG: sensor_msgs/PointCloud2
# This message holds a collection of N-dimensional points, which may
# contain additional information such as normals, intensity, etc. The
# point data is stored as a binary blob, its layout described by the
# contents of the \"fields\" array.

# The point cloud data may be organized 2d (image-like) or 1d
# (unordered). Point clouds organized as 2d images may be produced by
# camera depth sensors such as stereo or time-of-flight.

# Time of sensor data acquisition, and the coordinate frame ID (for 3d
# points).
Header header

# 2D structure of the point cloud. If the cloud is unordered, height is
# 1 and width is the length of the point cloud.
uint32 height
uint32 width

# Describes the channels and their layout in the binary data blob.
PointField[] fields

bool    is_bigendian # Is this data bigendian?
uint32  point_step   # Length of a point in bytes
uint32  row_step     # Length of a row in bytes
uint8[] data         # Actual point data, size is (row_step*height)

bool is_dense        # True if there are no invalid points

================================================================================
MSG: sensor_msgs/PointField
# This message holds the description of one point entry in the
# PointCloud2 message format.
uint8 INT8    = 1
uint8 UINT8   = 2
uint8 INT16   = 3
uint8 UINT16  = 4
uint8 INT32   = 5
uint8 UINT32  = 6
uint8 FLOAT32 = 7
uint8 FLOAT64 = 8

string name      # Name of field
uint32 offset    # Offset from start of point struct
uint8  datatype  # Datatype enumeration, see above
uint32 count     # How many elements in the field

")



(provide :super_odometry_msgs/LaserFeature "4df4873a8473f99d913205e932f77f89")


