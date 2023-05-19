; Auto-generated. Do not edit!


(cl:in-package super_odometry_msgs-msg)


;//! \htmlinclude IterationStats.msg.html

(cl:defclass <IterationStats> (roslisp-msg-protocol:ros-message)
  ((translation_norm
    :reader translation_norm
    :initarg :translation_norm
    :type cl:float
    :initform 0.0)
   (rotation_norm
    :reader rotation_norm
    :initarg :rotation_norm
    :type cl:float
    :initform 0.0)
   (num_surf_from_scan
    :reader num_surf_from_scan
    :initarg :num_surf_from_scan
    :type cl:float
    :initform 0.0)
   (num_corner_from_scan
    :reader num_corner_from_scan
    :initarg :num_corner_from_scan
    :type cl:float
    :initform 0.0))
)

(cl:defclass IterationStats (<IterationStats>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <IterationStats>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'IterationStats)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name super_odometry_msgs-msg:<IterationStats> is deprecated: use super_odometry_msgs-msg:IterationStats instead.")))

(cl:ensure-generic-function 'translation_norm-val :lambda-list '(m))
(cl:defmethod translation_norm-val ((m <IterationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:translation_norm-val is deprecated.  Use super_odometry_msgs-msg:translation_norm instead.")
  (translation_norm m))

(cl:ensure-generic-function 'rotation_norm-val :lambda-list '(m))
(cl:defmethod rotation_norm-val ((m <IterationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:rotation_norm-val is deprecated.  Use super_odometry_msgs-msg:rotation_norm instead.")
  (rotation_norm m))

(cl:ensure-generic-function 'num_surf_from_scan-val :lambda-list '(m))
(cl:defmethod num_surf_from_scan-val ((m <IterationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:num_surf_from_scan-val is deprecated.  Use super_odometry_msgs-msg:num_surf_from_scan instead.")
  (num_surf_from_scan m))

(cl:ensure-generic-function 'num_corner_from_scan-val :lambda-list '(m))
(cl:defmethod num_corner_from_scan-val ((m <IterationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:num_corner_from_scan-val is deprecated.  Use super_odometry_msgs-msg:num_corner_from_scan instead.")
  (num_corner_from_scan m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <IterationStats>) ostream)
  "Serializes a message object of type '<IterationStats>"
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'translation_norm))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'rotation_norm))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'num_surf_from_scan))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'num_corner_from_scan))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <IterationStats>) istream)
  "Deserializes a message object of type '<IterationStats>"
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'translation_norm) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'rotation_norm) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'num_surf_from_scan) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'num_corner_from_scan) (roslisp-utils:decode-double-float-bits bits)))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<IterationStats>)))
  "Returns string type for a message object of type '<IterationStats>"
  "super_odometry_msgs/IterationStats")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'IterationStats)))
  "Returns string type for a message object of type 'IterationStats"
  "super_odometry_msgs/IterationStats")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<IterationStats>)))
  "Returns md5sum for a message object of type '<IterationStats>"
  "90f71769f61c5a37fe60b3deb9b24f06")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'IterationStats)))
  "Returns md5sum for a message object of type 'IterationStats"
  "90f71769f61c5a37fe60b3deb9b24f06")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<IterationStats>)))
  "Returns full string definition for message of type '<IterationStats>"
  (cl:format cl:nil "# float64 time_elapsed~%float64 translation_norm~%float64 rotation_norm~%float64 num_surf_from_scan~%float64 num_corner_from_scan~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'IterationStats)))
  "Returns full string definition for message of type 'IterationStats"
  (cl:format cl:nil "# float64 time_elapsed~%float64 translation_norm~%float64 rotation_norm~%float64 num_surf_from_scan~%float64 num_corner_from_scan~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <IterationStats>))
  (cl:+ 0
     8
     8
     8
     8
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <IterationStats>))
  "Converts a ROS message object to a list"
  (cl:list 'IterationStats
    (cl:cons ':translation_norm (translation_norm msg))
    (cl:cons ':rotation_norm (rotation_norm msg))
    (cl:cons ':num_surf_from_scan (num_surf_from_scan msg))
    (cl:cons ':num_corner_from_scan (num_corner_from_scan msg))
))
