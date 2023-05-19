; Auto-generated. Do not edit!


(cl:in-package super_odometry_msgs-msg)


;//! \htmlinclude LaserFeature.msg.html

(cl:defclass <LaserFeature> (roslisp-msg-protocol:ros-message)
  ((header
    :reader header
    :initarg :header
    :type std_msgs-msg:Header
    :initform (cl:make-instance 'std_msgs-msg:Header))
   (sensor
    :reader sensor
    :initarg :sensor
    :type cl:integer
    :initform 0)
   (imuAvailable
    :reader imuAvailable
    :initarg :imuAvailable
    :type cl:integer
    :initform 0)
   (odomAvailable
    :reader odomAvailable
    :initarg :odomAvailable
    :type cl:integer
    :initform 0)
   (imuQuaternionX
    :reader imuQuaternionX
    :initarg :imuQuaternionX
    :type cl:float
    :initform 0.0)
   (imuQuaternionY
    :reader imuQuaternionY
    :initarg :imuQuaternionY
    :type cl:float
    :initform 0.0)
   (imuQuaternionZ
    :reader imuQuaternionZ
    :initarg :imuQuaternionZ
    :type cl:float
    :initform 0.0)
   (imuQuaternionW
    :reader imuQuaternionW
    :initarg :imuQuaternionW
    :type cl:float
    :initform 0.0)
   (initialPoseX
    :reader initialPoseX
    :initarg :initialPoseX
    :type cl:float
    :initform 0.0)
   (initialPoseY
    :reader initialPoseY
    :initarg :initialPoseY
    :type cl:float
    :initform 0.0)
   (initialPoseZ
    :reader initialPoseZ
    :initarg :initialPoseZ
    :type cl:float
    :initform 0.0)
   (initialQuaternionX
    :reader initialQuaternionX
    :initarg :initialQuaternionX
    :type cl:float
    :initform 0.0)
   (initialQuaternionY
    :reader initialQuaternionY
    :initarg :initialQuaternionY
    :type cl:float
    :initform 0.0)
   (initialQuaternionZ
    :reader initialQuaternionZ
    :initarg :initialQuaternionZ
    :type cl:float
    :initform 0.0)
   (initialQuaternionW
    :reader initialQuaternionW
    :initarg :initialQuaternionW
    :type cl:float
    :initform 0.0)
   (imuPreintegrationResetId
    :reader imuPreintegrationResetId
    :initarg :imuPreintegrationResetId
    :type cl:integer
    :initform 0)
   (cloud_nodistortion
    :reader cloud_nodistortion
    :initarg :cloud_nodistortion
    :type sensor_msgs-msg:PointCloud2
    :initform (cl:make-instance 'sensor_msgs-msg:PointCloud2))
   (cloud_corner
    :reader cloud_corner
    :initarg :cloud_corner
    :type sensor_msgs-msg:PointCloud2
    :initform (cl:make-instance 'sensor_msgs-msg:PointCloud2))
   (cloud_surface
    :reader cloud_surface
    :initarg :cloud_surface
    :type sensor_msgs-msg:PointCloud2
    :initform (cl:make-instance 'sensor_msgs-msg:PointCloud2))
   (cloud_realsense
    :reader cloud_realsense
    :initarg :cloud_realsense
    :type sensor_msgs-msg:PointCloud2
    :initform (cl:make-instance 'sensor_msgs-msg:PointCloud2)))
)

(cl:defclass LaserFeature (<LaserFeature>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <LaserFeature>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'LaserFeature)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name super_odometry_msgs-msg:<LaserFeature> is deprecated: use super_odometry_msgs-msg:LaserFeature instead.")))

(cl:ensure-generic-function 'header-val :lambda-list '(m))
(cl:defmethod header-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:header-val is deprecated.  Use super_odometry_msgs-msg:header instead.")
  (header m))

(cl:ensure-generic-function 'sensor-val :lambda-list '(m))
(cl:defmethod sensor-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:sensor-val is deprecated.  Use super_odometry_msgs-msg:sensor instead.")
  (sensor m))

(cl:ensure-generic-function 'imuAvailable-val :lambda-list '(m))
(cl:defmethod imuAvailable-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:imuAvailable-val is deprecated.  Use super_odometry_msgs-msg:imuAvailable instead.")
  (imuAvailable m))

(cl:ensure-generic-function 'odomAvailable-val :lambda-list '(m))
(cl:defmethod odomAvailable-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:odomAvailable-val is deprecated.  Use super_odometry_msgs-msg:odomAvailable instead.")
  (odomAvailable m))

(cl:ensure-generic-function 'imuQuaternionX-val :lambda-list '(m))
(cl:defmethod imuQuaternionX-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:imuQuaternionX-val is deprecated.  Use super_odometry_msgs-msg:imuQuaternionX instead.")
  (imuQuaternionX m))

(cl:ensure-generic-function 'imuQuaternionY-val :lambda-list '(m))
(cl:defmethod imuQuaternionY-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:imuQuaternionY-val is deprecated.  Use super_odometry_msgs-msg:imuQuaternionY instead.")
  (imuQuaternionY m))

(cl:ensure-generic-function 'imuQuaternionZ-val :lambda-list '(m))
(cl:defmethod imuQuaternionZ-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:imuQuaternionZ-val is deprecated.  Use super_odometry_msgs-msg:imuQuaternionZ instead.")
  (imuQuaternionZ m))

(cl:ensure-generic-function 'imuQuaternionW-val :lambda-list '(m))
(cl:defmethod imuQuaternionW-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:imuQuaternionW-val is deprecated.  Use super_odometry_msgs-msg:imuQuaternionW instead.")
  (imuQuaternionW m))

(cl:ensure-generic-function 'initialPoseX-val :lambda-list '(m))
(cl:defmethod initialPoseX-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:initialPoseX-val is deprecated.  Use super_odometry_msgs-msg:initialPoseX instead.")
  (initialPoseX m))

(cl:ensure-generic-function 'initialPoseY-val :lambda-list '(m))
(cl:defmethod initialPoseY-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:initialPoseY-val is deprecated.  Use super_odometry_msgs-msg:initialPoseY instead.")
  (initialPoseY m))

(cl:ensure-generic-function 'initialPoseZ-val :lambda-list '(m))
(cl:defmethod initialPoseZ-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:initialPoseZ-val is deprecated.  Use super_odometry_msgs-msg:initialPoseZ instead.")
  (initialPoseZ m))

(cl:ensure-generic-function 'initialQuaternionX-val :lambda-list '(m))
(cl:defmethod initialQuaternionX-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:initialQuaternionX-val is deprecated.  Use super_odometry_msgs-msg:initialQuaternionX instead.")
  (initialQuaternionX m))

(cl:ensure-generic-function 'initialQuaternionY-val :lambda-list '(m))
(cl:defmethod initialQuaternionY-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:initialQuaternionY-val is deprecated.  Use super_odometry_msgs-msg:initialQuaternionY instead.")
  (initialQuaternionY m))

(cl:ensure-generic-function 'initialQuaternionZ-val :lambda-list '(m))
(cl:defmethod initialQuaternionZ-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:initialQuaternionZ-val is deprecated.  Use super_odometry_msgs-msg:initialQuaternionZ instead.")
  (initialQuaternionZ m))

(cl:ensure-generic-function 'initialQuaternionW-val :lambda-list '(m))
(cl:defmethod initialQuaternionW-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:initialQuaternionW-val is deprecated.  Use super_odometry_msgs-msg:initialQuaternionW instead.")
  (initialQuaternionW m))

(cl:ensure-generic-function 'imuPreintegrationResetId-val :lambda-list '(m))
(cl:defmethod imuPreintegrationResetId-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:imuPreintegrationResetId-val is deprecated.  Use super_odometry_msgs-msg:imuPreintegrationResetId instead.")
  (imuPreintegrationResetId m))

(cl:ensure-generic-function 'cloud_nodistortion-val :lambda-list '(m))
(cl:defmethod cloud_nodistortion-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:cloud_nodistortion-val is deprecated.  Use super_odometry_msgs-msg:cloud_nodistortion instead.")
  (cloud_nodistortion m))

(cl:ensure-generic-function 'cloud_corner-val :lambda-list '(m))
(cl:defmethod cloud_corner-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:cloud_corner-val is deprecated.  Use super_odometry_msgs-msg:cloud_corner instead.")
  (cloud_corner m))

(cl:ensure-generic-function 'cloud_surface-val :lambda-list '(m))
(cl:defmethod cloud_surface-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:cloud_surface-val is deprecated.  Use super_odometry_msgs-msg:cloud_surface instead.")
  (cloud_surface m))

(cl:ensure-generic-function 'cloud_realsense-val :lambda-list '(m))
(cl:defmethod cloud_realsense-val ((m <LaserFeature>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:cloud_realsense-val is deprecated.  Use super_odometry_msgs-msg:cloud_realsense instead.")
  (cloud_realsense m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <LaserFeature>) ostream)
  "Serializes a message object of type '<LaserFeature>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'header) ostream)
  (cl:let* ((signed (cl:slot-value msg 'sensor)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 18446744073709551616) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'imuAvailable)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 18446744073709551616) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'odomAvailable)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 18446744073709551616) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) unsigned) ostream)
    )
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'imuQuaternionX))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'imuQuaternionY))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'imuQuaternionZ))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'imuQuaternionW))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'initialPoseX))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'initialPoseY))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'initialPoseZ))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'initialQuaternionX))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'initialQuaternionY))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'initialQuaternionZ))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'initialQuaternionW))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let* ((signed (cl:slot-value msg 'imuPreintegrationResetId)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 18446744073709551616) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) unsigned) ostream)
    )
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'cloud_nodistortion) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'cloud_corner) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'cloud_surface) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'cloud_realsense) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <LaserFeature>) istream)
  "Deserializes a message object of type '<LaserFeature>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'header) istream)
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'sensor) (cl:if (cl:< unsigned 9223372036854775808) unsigned (cl:- unsigned 18446744073709551616))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'imuAvailable) (cl:if (cl:< unsigned 9223372036854775808) unsigned (cl:- unsigned 18446744073709551616))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'odomAvailable) (cl:if (cl:< unsigned 9223372036854775808) unsigned (cl:- unsigned 18446744073709551616))))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'imuQuaternionX) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'imuQuaternionY) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'imuQuaternionZ) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'imuQuaternionW) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'initialPoseX) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'initialPoseY) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'initialPoseZ) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'initialQuaternionX) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'initialQuaternionY) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'initialQuaternionZ) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'initialQuaternionW) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'imuPreintegrationResetId) (cl:if (cl:< unsigned 9223372036854775808) unsigned (cl:- unsigned 18446744073709551616))))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'cloud_nodistortion) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'cloud_corner) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'cloud_surface) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'cloud_realsense) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<LaserFeature>)))
  "Returns string type for a message object of type '<LaserFeature>"
  "super_odometry_msgs/LaserFeature")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'LaserFeature)))
  "Returns string type for a message object of type 'LaserFeature"
  "super_odometry_msgs/LaserFeature")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<LaserFeature>)))
  "Returns md5sum for a message object of type '<LaserFeature>"
  "4df4873a8473f99d913205e932f77f89")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'LaserFeature)))
  "Returns md5sum for a message object of type 'LaserFeature"
  "4df4873a8473f99d913205e932f77f89")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<LaserFeature>)))
  "Returns full string definition for message of type '<LaserFeature>"
  (cl:format cl:nil "# feature Info~%Header header ~%~%int64 sensor~%~%int64 imuAvailable~%int64 odomAvailable~%~%# IMU initial guess for laser mapping~%float64 imuQuaternionX~%float64 imuQuaternionY~%float64 imuQuaternionZ~%float64 imuQuaternionW~%~%# Odometry initial guess for laser mapping~%float64 initialPoseX~%float64 initialPoseY~%float64 initialPoseZ~%float64 initialQuaternionX~%float64 initialQuaternionY~%float64 initialQuaternionZ~%float64 initialQuaternionW ~%~%# Preintegration reset ID~%int64 imuPreintegrationResetId~%~%# Point cloud messages~%sensor_msgs/PointCloud2 cloud_nodistortion  # original cloud remove distortion~%sensor_msgs/PointCloud2 cloud_corner    # extracted corner feature~%sensor_msgs/PointCloud2 cloud_surface   # extracted surface feature~%sensor_msgs/PointCloud2 cloud_realsense   # extracted surface feature from realsense~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%string frame_id~%~%================================================================================~%MSG: sensor_msgs/PointCloud2~%# This message holds a collection of N-dimensional points, which may~%# contain additional information such as normals, intensity, etc. The~%# point data is stored as a binary blob, its layout described by the~%# contents of the \"fields\" array.~%~%# The point cloud data may be organized 2d (image-like) or 1d~%# (unordered). Point clouds organized as 2d images may be produced by~%# camera depth sensors such as stereo or time-of-flight.~%~%# Time of sensor data acquisition, and the coordinate frame ID (for 3d~%# points).~%Header header~%~%# 2D structure of the point cloud. If the cloud is unordered, height is~%# 1 and width is the length of the point cloud.~%uint32 height~%uint32 width~%~%# Describes the channels and their layout in the binary data blob.~%PointField[] fields~%~%bool    is_bigendian # Is this data bigendian?~%uint32  point_step   # Length of a point in bytes~%uint32  row_step     # Length of a row in bytes~%uint8[] data         # Actual point data, size is (row_step*height)~%~%bool is_dense        # True if there are no invalid points~%~%================================================================================~%MSG: sensor_msgs/PointField~%# This message holds the description of one point entry in the~%# PointCloud2 message format.~%uint8 INT8    = 1~%uint8 UINT8   = 2~%uint8 INT16   = 3~%uint8 UINT16  = 4~%uint8 INT32   = 5~%uint8 UINT32  = 6~%uint8 FLOAT32 = 7~%uint8 FLOAT64 = 8~%~%string name      # Name of field~%uint32 offset    # Offset from start of point struct~%uint8  datatype  # Datatype enumeration, see above~%uint32 count     # How many elements in the field~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'LaserFeature)))
  "Returns full string definition for message of type 'LaserFeature"
  (cl:format cl:nil "# feature Info~%Header header ~%~%int64 sensor~%~%int64 imuAvailable~%int64 odomAvailable~%~%# IMU initial guess for laser mapping~%float64 imuQuaternionX~%float64 imuQuaternionY~%float64 imuQuaternionZ~%float64 imuQuaternionW~%~%# Odometry initial guess for laser mapping~%float64 initialPoseX~%float64 initialPoseY~%float64 initialPoseZ~%float64 initialQuaternionX~%float64 initialQuaternionY~%float64 initialQuaternionZ~%float64 initialQuaternionW ~%~%# Preintegration reset ID~%int64 imuPreintegrationResetId~%~%# Point cloud messages~%sensor_msgs/PointCloud2 cloud_nodistortion  # original cloud remove distortion~%sensor_msgs/PointCloud2 cloud_corner    # extracted corner feature~%sensor_msgs/PointCloud2 cloud_surface   # extracted surface feature~%sensor_msgs/PointCloud2 cloud_realsense   # extracted surface feature from realsense~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%string frame_id~%~%================================================================================~%MSG: sensor_msgs/PointCloud2~%# This message holds a collection of N-dimensional points, which may~%# contain additional information such as normals, intensity, etc. The~%# point data is stored as a binary blob, its layout described by the~%# contents of the \"fields\" array.~%~%# The point cloud data may be organized 2d (image-like) or 1d~%# (unordered). Point clouds organized as 2d images may be produced by~%# camera depth sensors such as stereo or time-of-flight.~%~%# Time of sensor data acquisition, and the coordinate frame ID (for 3d~%# points).~%Header header~%~%# 2D structure of the point cloud. If the cloud is unordered, height is~%# 1 and width is the length of the point cloud.~%uint32 height~%uint32 width~%~%# Describes the channels and their layout in the binary data blob.~%PointField[] fields~%~%bool    is_bigendian # Is this data bigendian?~%uint32  point_step   # Length of a point in bytes~%uint32  row_step     # Length of a row in bytes~%uint8[] data         # Actual point data, size is (row_step*height)~%~%bool is_dense        # True if there are no invalid points~%~%================================================================================~%MSG: sensor_msgs/PointField~%# This message holds the description of one point entry in the~%# PointCloud2 message format.~%uint8 INT8    = 1~%uint8 UINT8   = 2~%uint8 INT16   = 3~%uint8 UINT16  = 4~%uint8 INT32   = 5~%uint8 UINT32  = 6~%uint8 FLOAT32 = 7~%uint8 FLOAT64 = 8~%~%string name      # Name of field~%uint32 offset    # Offset from start of point struct~%uint8  datatype  # Datatype enumeration, see above~%uint32 count     # How many elements in the field~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <LaserFeature>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'header))
     8
     8
     8
     8
     8
     8
     8
     8
     8
     8
     8
     8
     8
     8
     8
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'cloud_nodistortion))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'cloud_corner))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'cloud_surface))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'cloud_realsense))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <LaserFeature>))
  "Converts a ROS message object to a list"
  (cl:list 'LaserFeature
    (cl:cons ':header (header msg))
    (cl:cons ':sensor (sensor msg))
    (cl:cons ':imuAvailable (imuAvailable msg))
    (cl:cons ':odomAvailable (odomAvailable msg))
    (cl:cons ':imuQuaternionX (imuQuaternionX msg))
    (cl:cons ':imuQuaternionY (imuQuaternionY msg))
    (cl:cons ':imuQuaternionZ (imuQuaternionZ msg))
    (cl:cons ':imuQuaternionW (imuQuaternionW msg))
    (cl:cons ':initialPoseX (initialPoseX msg))
    (cl:cons ':initialPoseY (initialPoseY msg))
    (cl:cons ':initialPoseZ (initialPoseZ msg))
    (cl:cons ':initialQuaternionX (initialQuaternionX msg))
    (cl:cons ':initialQuaternionY (initialQuaternionY msg))
    (cl:cons ':initialQuaternionZ (initialQuaternionZ msg))
    (cl:cons ':initialQuaternionW (initialQuaternionW msg))
    (cl:cons ':imuPreintegrationResetId (imuPreintegrationResetId msg))
    (cl:cons ':cloud_nodistortion (cloud_nodistortion msg))
    (cl:cons ':cloud_corner (cloud_corner msg))
    (cl:cons ':cloud_surface (cloud_surface msg))
    (cl:cons ':cloud_realsense (cloud_realsense msg))
))
