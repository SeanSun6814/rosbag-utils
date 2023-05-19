; Auto-generated. Do not edit!


(cl:in-package super_odometry_msgs-msg)


;//! \htmlinclude OptimizationStats.msg.html

(cl:defclass <OptimizationStats> (roslisp-msg-protocol:ros-message)
  ((header
    :reader header
    :initarg :header
    :type std_msgs-msg:Header
    :initform (cl:make-instance 'std_msgs-msg:Header))
   (laserCloudSurfFromMapNum
    :reader laserCloudSurfFromMapNum
    :initarg :laserCloudSurfFromMapNum
    :type cl:integer
    :initform 0)
   (laserCloudCornerFromMapNum
    :reader laserCloudCornerFromMapNum
    :initarg :laserCloudCornerFromMapNum
    :type cl:integer
    :initform 0)
   (laserCloudSurfStackNum
    :reader laserCloudSurfStackNum
    :initarg :laserCloudSurfStackNum
    :type cl:integer
    :initform 0)
   (laserCloudCornerStackNum
    :reader laserCloudCornerStackNum
    :initarg :laserCloudCornerStackNum
    :type cl:integer
    :initform 0)
   (total_translation
    :reader total_translation
    :initarg :total_translation
    :type cl:float
    :initform 0.0)
   (total_rotation
    :reader total_rotation
    :initarg :total_rotation
    :type cl:float
    :initform 0.0)
   (translation_from_last
    :reader translation_from_last
    :initarg :translation_from_last
    :type cl:float
    :initform 0.0)
   (rotation_from_last
    :reader rotation_from_last
    :initarg :rotation_from_last
    :type cl:float
    :initform 0.0)
   (time_elapsed
    :reader time_elapsed
    :initarg :time_elapsed
    :type cl:float
    :initform 0.0)
   (latency
    :reader latency
    :initarg :latency
    :type cl:float
    :initform 0.0)
   (n_iterations
    :reader n_iterations
    :initarg :n_iterations
    :type cl:integer
    :initform 0)
   (average_distance
    :reader average_distance
    :initarg :average_distance
    :type cl:float
    :initform 0.0)
   (uncertainty_x
    :reader uncertainty_x
    :initarg :uncertainty_x
    :type cl:float
    :initform 0.0)
   (uncertainty_y
    :reader uncertainty_y
    :initarg :uncertainty_y
    :type cl:float
    :initform 0.0)
   (uncertainty_z
    :reader uncertainty_z
    :initarg :uncertainty_z
    :type cl:float
    :initform 0.0)
   (uncertainty_roll
    :reader uncertainty_roll
    :initarg :uncertainty_roll
    :type cl:float
    :initform 0.0)
   (uncertainty_pitch
    :reader uncertainty_pitch
    :initarg :uncertainty_pitch
    :type cl:float
    :initform 0.0)
   (uncertainty_yaw
    :reader uncertainty_yaw
    :initarg :uncertainty_yaw
    :type cl:float
    :initform 0.0)
   (meanSquareDistEdgeInlierNum
    :reader meanSquareDistEdgeInlierNum
    :initarg :meanSquareDistEdgeInlierNum
    :type cl:integer
    :initform 0)
   (meanSquareDistEdgeOutlierNum
    :reader meanSquareDistEdgeOutlierNum
    :initarg :meanSquareDistEdgeOutlierNum
    :type cl:integer
    :initform 0)
   (fitQualityCoeffEdgeInlierNum
    :reader fitQualityCoeffEdgeInlierNum
    :initarg :fitQualityCoeffEdgeInlierNum
    :type cl:integer
    :initform 0)
   (fitQualityCoeffEdgeOutlierNum
    :reader fitQualityCoeffEdgeOutlierNum
    :initarg :fitQualityCoeffEdgeOutlierNum
    :type cl:integer
    :initform 0)
   (meanSquareDistPlaneInlierNum
    :reader meanSquareDistPlaneInlierNum
    :initarg :meanSquareDistPlaneInlierNum
    :type cl:integer
    :initform 0)
   (meanSquareDistPlaneOutlierNum
    :reader meanSquareDistPlaneOutlierNum
    :initarg :meanSquareDistPlaneOutlierNum
    :type cl:integer
    :initform 0)
   (fitQualityCoeffPlaneInlierNum
    :reader fitQualityCoeffPlaneInlierNum
    :initarg :fitQualityCoeffPlaneInlierNum
    :type cl:integer
    :initform 0)
   (fitQualityCoeffPlaneOutlierNum
    :reader fitQualityCoeffPlaneOutlierNum
    :initarg :fitQualityCoeffPlaneOutlierNum
    :type cl:integer
    :initform 0)
   (PlaneMatchSuccess
    :reader PlaneMatchSuccess
    :initarg :PlaneMatchSuccess
    :type cl:integer
    :initform 0)
   (PlaneNoEnoughNeighbor
    :reader PlaneNoEnoughNeighbor
    :initarg :PlaneNoEnoughNeighbor
    :type cl:integer
    :initform 0)
   (PlaneNeighborTooFar
    :reader PlaneNeighborTooFar
    :initarg :PlaneNeighborTooFar
    :type cl:integer
    :initform 0)
   (PlaneBADPCAStructure
    :reader PlaneBADPCAStructure
    :initarg :PlaneBADPCAStructure
    :type cl:integer
    :initform 0)
   (PlaneInvalidNumerical
    :reader PlaneInvalidNumerical
    :initarg :PlaneInvalidNumerical
    :type cl:integer
    :initform 0)
   (PlaneMSETOOLARGE
    :reader PlaneMSETOOLARGE
    :initarg :PlaneMSETOOLARGE
    :type cl:integer
    :initform 0)
   (PlaneUnknown
    :reader PlaneUnknown
    :initarg :PlaneUnknown
    :type cl:integer
    :initform 0)
   (PredictionSource
    :reader PredictionSource
    :initarg :PredictionSource
    :type cl:integer
    :initform 0)
   (iterations
    :reader iterations
    :initarg :iterations
    :type (cl:vector super_odometry_msgs-msg:IterationStats)
   :initform (cl:make-array 0 :element-type 'super_odometry_msgs-msg:IterationStats :initial-element (cl:make-instance 'super_odometry_msgs-msg:IterationStats))))
)

(cl:defclass OptimizationStats (<OptimizationStats>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <OptimizationStats>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'OptimizationStats)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name super_odometry_msgs-msg:<OptimizationStats> is deprecated: use super_odometry_msgs-msg:OptimizationStats instead.")))

(cl:ensure-generic-function 'header-val :lambda-list '(m))
(cl:defmethod header-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:header-val is deprecated.  Use super_odometry_msgs-msg:header instead.")
  (header m))

(cl:ensure-generic-function 'laserCloudSurfFromMapNum-val :lambda-list '(m))
(cl:defmethod laserCloudSurfFromMapNum-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:laserCloudSurfFromMapNum-val is deprecated.  Use super_odometry_msgs-msg:laserCloudSurfFromMapNum instead.")
  (laserCloudSurfFromMapNum m))

(cl:ensure-generic-function 'laserCloudCornerFromMapNum-val :lambda-list '(m))
(cl:defmethod laserCloudCornerFromMapNum-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:laserCloudCornerFromMapNum-val is deprecated.  Use super_odometry_msgs-msg:laserCloudCornerFromMapNum instead.")
  (laserCloudCornerFromMapNum m))

(cl:ensure-generic-function 'laserCloudSurfStackNum-val :lambda-list '(m))
(cl:defmethod laserCloudSurfStackNum-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:laserCloudSurfStackNum-val is deprecated.  Use super_odometry_msgs-msg:laserCloudSurfStackNum instead.")
  (laserCloudSurfStackNum m))

(cl:ensure-generic-function 'laserCloudCornerStackNum-val :lambda-list '(m))
(cl:defmethod laserCloudCornerStackNum-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:laserCloudCornerStackNum-val is deprecated.  Use super_odometry_msgs-msg:laserCloudCornerStackNum instead.")
  (laserCloudCornerStackNum m))

(cl:ensure-generic-function 'total_translation-val :lambda-list '(m))
(cl:defmethod total_translation-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:total_translation-val is deprecated.  Use super_odometry_msgs-msg:total_translation instead.")
  (total_translation m))

(cl:ensure-generic-function 'total_rotation-val :lambda-list '(m))
(cl:defmethod total_rotation-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:total_rotation-val is deprecated.  Use super_odometry_msgs-msg:total_rotation instead.")
  (total_rotation m))

(cl:ensure-generic-function 'translation_from_last-val :lambda-list '(m))
(cl:defmethod translation_from_last-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:translation_from_last-val is deprecated.  Use super_odometry_msgs-msg:translation_from_last instead.")
  (translation_from_last m))

(cl:ensure-generic-function 'rotation_from_last-val :lambda-list '(m))
(cl:defmethod rotation_from_last-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:rotation_from_last-val is deprecated.  Use super_odometry_msgs-msg:rotation_from_last instead.")
  (rotation_from_last m))

(cl:ensure-generic-function 'time_elapsed-val :lambda-list '(m))
(cl:defmethod time_elapsed-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:time_elapsed-val is deprecated.  Use super_odometry_msgs-msg:time_elapsed instead.")
  (time_elapsed m))

(cl:ensure-generic-function 'latency-val :lambda-list '(m))
(cl:defmethod latency-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:latency-val is deprecated.  Use super_odometry_msgs-msg:latency instead.")
  (latency m))

(cl:ensure-generic-function 'n_iterations-val :lambda-list '(m))
(cl:defmethod n_iterations-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:n_iterations-val is deprecated.  Use super_odometry_msgs-msg:n_iterations instead.")
  (n_iterations m))

(cl:ensure-generic-function 'average_distance-val :lambda-list '(m))
(cl:defmethod average_distance-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:average_distance-val is deprecated.  Use super_odometry_msgs-msg:average_distance instead.")
  (average_distance m))

(cl:ensure-generic-function 'uncertainty_x-val :lambda-list '(m))
(cl:defmethod uncertainty_x-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:uncertainty_x-val is deprecated.  Use super_odometry_msgs-msg:uncertainty_x instead.")
  (uncertainty_x m))

(cl:ensure-generic-function 'uncertainty_y-val :lambda-list '(m))
(cl:defmethod uncertainty_y-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:uncertainty_y-val is deprecated.  Use super_odometry_msgs-msg:uncertainty_y instead.")
  (uncertainty_y m))

(cl:ensure-generic-function 'uncertainty_z-val :lambda-list '(m))
(cl:defmethod uncertainty_z-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:uncertainty_z-val is deprecated.  Use super_odometry_msgs-msg:uncertainty_z instead.")
  (uncertainty_z m))

(cl:ensure-generic-function 'uncertainty_roll-val :lambda-list '(m))
(cl:defmethod uncertainty_roll-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:uncertainty_roll-val is deprecated.  Use super_odometry_msgs-msg:uncertainty_roll instead.")
  (uncertainty_roll m))

(cl:ensure-generic-function 'uncertainty_pitch-val :lambda-list '(m))
(cl:defmethod uncertainty_pitch-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:uncertainty_pitch-val is deprecated.  Use super_odometry_msgs-msg:uncertainty_pitch instead.")
  (uncertainty_pitch m))

(cl:ensure-generic-function 'uncertainty_yaw-val :lambda-list '(m))
(cl:defmethod uncertainty_yaw-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:uncertainty_yaw-val is deprecated.  Use super_odometry_msgs-msg:uncertainty_yaw instead.")
  (uncertainty_yaw m))

(cl:ensure-generic-function 'meanSquareDistEdgeInlierNum-val :lambda-list '(m))
(cl:defmethod meanSquareDistEdgeInlierNum-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:meanSquareDistEdgeInlierNum-val is deprecated.  Use super_odometry_msgs-msg:meanSquareDistEdgeInlierNum instead.")
  (meanSquareDistEdgeInlierNum m))

(cl:ensure-generic-function 'meanSquareDistEdgeOutlierNum-val :lambda-list '(m))
(cl:defmethod meanSquareDistEdgeOutlierNum-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:meanSquareDistEdgeOutlierNum-val is deprecated.  Use super_odometry_msgs-msg:meanSquareDistEdgeOutlierNum instead.")
  (meanSquareDistEdgeOutlierNum m))

(cl:ensure-generic-function 'fitQualityCoeffEdgeInlierNum-val :lambda-list '(m))
(cl:defmethod fitQualityCoeffEdgeInlierNum-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:fitQualityCoeffEdgeInlierNum-val is deprecated.  Use super_odometry_msgs-msg:fitQualityCoeffEdgeInlierNum instead.")
  (fitQualityCoeffEdgeInlierNum m))

(cl:ensure-generic-function 'fitQualityCoeffEdgeOutlierNum-val :lambda-list '(m))
(cl:defmethod fitQualityCoeffEdgeOutlierNum-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:fitQualityCoeffEdgeOutlierNum-val is deprecated.  Use super_odometry_msgs-msg:fitQualityCoeffEdgeOutlierNum instead.")
  (fitQualityCoeffEdgeOutlierNum m))

(cl:ensure-generic-function 'meanSquareDistPlaneInlierNum-val :lambda-list '(m))
(cl:defmethod meanSquareDistPlaneInlierNum-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:meanSquareDistPlaneInlierNum-val is deprecated.  Use super_odometry_msgs-msg:meanSquareDistPlaneInlierNum instead.")
  (meanSquareDistPlaneInlierNum m))

(cl:ensure-generic-function 'meanSquareDistPlaneOutlierNum-val :lambda-list '(m))
(cl:defmethod meanSquareDistPlaneOutlierNum-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:meanSquareDistPlaneOutlierNum-val is deprecated.  Use super_odometry_msgs-msg:meanSquareDistPlaneOutlierNum instead.")
  (meanSquareDistPlaneOutlierNum m))

(cl:ensure-generic-function 'fitQualityCoeffPlaneInlierNum-val :lambda-list '(m))
(cl:defmethod fitQualityCoeffPlaneInlierNum-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:fitQualityCoeffPlaneInlierNum-val is deprecated.  Use super_odometry_msgs-msg:fitQualityCoeffPlaneInlierNum instead.")
  (fitQualityCoeffPlaneInlierNum m))

(cl:ensure-generic-function 'fitQualityCoeffPlaneOutlierNum-val :lambda-list '(m))
(cl:defmethod fitQualityCoeffPlaneOutlierNum-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:fitQualityCoeffPlaneOutlierNum-val is deprecated.  Use super_odometry_msgs-msg:fitQualityCoeffPlaneOutlierNum instead.")
  (fitQualityCoeffPlaneOutlierNum m))

(cl:ensure-generic-function 'PlaneMatchSuccess-val :lambda-list '(m))
(cl:defmethod PlaneMatchSuccess-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:PlaneMatchSuccess-val is deprecated.  Use super_odometry_msgs-msg:PlaneMatchSuccess instead.")
  (PlaneMatchSuccess m))

(cl:ensure-generic-function 'PlaneNoEnoughNeighbor-val :lambda-list '(m))
(cl:defmethod PlaneNoEnoughNeighbor-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:PlaneNoEnoughNeighbor-val is deprecated.  Use super_odometry_msgs-msg:PlaneNoEnoughNeighbor instead.")
  (PlaneNoEnoughNeighbor m))

(cl:ensure-generic-function 'PlaneNeighborTooFar-val :lambda-list '(m))
(cl:defmethod PlaneNeighborTooFar-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:PlaneNeighborTooFar-val is deprecated.  Use super_odometry_msgs-msg:PlaneNeighborTooFar instead.")
  (PlaneNeighborTooFar m))

(cl:ensure-generic-function 'PlaneBADPCAStructure-val :lambda-list '(m))
(cl:defmethod PlaneBADPCAStructure-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:PlaneBADPCAStructure-val is deprecated.  Use super_odometry_msgs-msg:PlaneBADPCAStructure instead.")
  (PlaneBADPCAStructure m))

(cl:ensure-generic-function 'PlaneInvalidNumerical-val :lambda-list '(m))
(cl:defmethod PlaneInvalidNumerical-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:PlaneInvalidNumerical-val is deprecated.  Use super_odometry_msgs-msg:PlaneInvalidNumerical instead.")
  (PlaneInvalidNumerical m))

(cl:ensure-generic-function 'PlaneMSETOOLARGE-val :lambda-list '(m))
(cl:defmethod PlaneMSETOOLARGE-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:PlaneMSETOOLARGE-val is deprecated.  Use super_odometry_msgs-msg:PlaneMSETOOLARGE instead.")
  (PlaneMSETOOLARGE m))

(cl:ensure-generic-function 'PlaneUnknown-val :lambda-list '(m))
(cl:defmethod PlaneUnknown-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:PlaneUnknown-val is deprecated.  Use super_odometry_msgs-msg:PlaneUnknown instead.")
  (PlaneUnknown m))

(cl:ensure-generic-function 'PredictionSource-val :lambda-list '(m))
(cl:defmethod PredictionSource-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:PredictionSource-val is deprecated.  Use super_odometry_msgs-msg:PredictionSource instead.")
  (PredictionSource m))

(cl:ensure-generic-function 'iterations-val :lambda-list '(m))
(cl:defmethod iterations-val ((m <OptimizationStats>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader super_odometry_msgs-msg:iterations-val is deprecated.  Use super_odometry_msgs-msg:iterations instead.")
  (iterations m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <OptimizationStats>) ostream)
  "Serializes a message object of type '<OptimizationStats>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'header) ostream)
  (cl:let* ((signed (cl:slot-value msg 'laserCloudSurfFromMapNum)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'laserCloudCornerFromMapNum)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'laserCloudSurfStackNum)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'laserCloudCornerStackNum)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'total_translation))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'total_rotation))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'translation_from_last))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'rotation_from_last))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'time_elapsed))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'latency))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let* ((signed (cl:slot-value msg 'n_iterations)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'average_distance))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'uncertainty_x))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'uncertainty_y))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'uncertainty_z))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'uncertainty_roll))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'uncertainty_pitch))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'uncertainty_yaw))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (cl:let* ((signed (cl:slot-value msg 'meanSquareDistEdgeInlierNum)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'meanSquareDistEdgeOutlierNum)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'fitQualityCoeffEdgeInlierNum)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'fitQualityCoeffEdgeOutlierNum)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'meanSquareDistPlaneInlierNum)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'meanSquareDistPlaneOutlierNum)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'fitQualityCoeffPlaneInlierNum)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'fitQualityCoeffPlaneOutlierNum)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'PlaneMatchSuccess)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'PlaneNoEnoughNeighbor)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'PlaneNeighborTooFar)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'PlaneBADPCAStructure)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'PlaneInvalidNumerical)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'PlaneMSETOOLARGE)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'PlaneUnknown)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'PredictionSource)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'iterations))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'iterations))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <OptimizationStats>) istream)
  "Deserializes a message object of type '<OptimizationStats>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'header) istream)
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'laserCloudSurfFromMapNum) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'laserCloudCornerFromMapNum) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'laserCloudSurfStackNum) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'laserCloudCornerStackNum) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'total_translation) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'total_rotation) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'translation_from_last) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'rotation_from_last) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'time_elapsed) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'latency) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'n_iterations) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'average_distance) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'uncertainty_x) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'uncertainty_y) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'uncertainty_z) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'uncertainty_roll) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'uncertainty_pitch) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'uncertainty_yaw) (roslisp-utils:decode-double-float-bits bits)))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'meanSquareDistEdgeInlierNum) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'meanSquareDistEdgeOutlierNum) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'fitQualityCoeffEdgeInlierNum) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'fitQualityCoeffEdgeOutlierNum) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'meanSquareDistPlaneInlierNum) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'meanSquareDistPlaneOutlierNum) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'fitQualityCoeffPlaneInlierNum) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'fitQualityCoeffPlaneOutlierNum) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'PlaneMatchSuccess) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'PlaneNoEnoughNeighbor) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'PlaneNeighborTooFar) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'PlaneBADPCAStructure) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'PlaneInvalidNumerical) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'PlaneMSETOOLARGE) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'PlaneUnknown) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'PredictionSource) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'iterations) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'iterations)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'super_odometry_msgs-msg:IterationStats))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<OptimizationStats>)))
  "Returns string type for a message object of type '<OptimizationStats>"
  "super_odometry_msgs/OptimizationStats")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'OptimizationStats)))
  "Returns string type for a message object of type 'OptimizationStats"
  "super_odometry_msgs/OptimizationStats")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<OptimizationStats>)))
  "Returns md5sum for a message object of type '<OptimizationStats>"
  "db5910f4dcadf7d411c357fed874db59")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'OptimizationStats)))
  "Returns md5sum for a message object of type 'OptimizationStats"
  "db5910f4dcadf7d411c357fed874db59")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<OptimizationStats>)))
  "Returns full string definition for message of type '<OptimizationStats>"
  (cl:format cl:nil "Header header~%int32 laserCloudSurfFromMapNum~%int32 laserCloudCornerFromMapNum~%int32 laserCloudSurfStackNum~%int32 laserCloudCornerStackNum~%float64 total_translation~%float64 total_rotation~%float64 translation_from_last~%float64 rotation_from_last~%float64 time_elapsed~%float64 latency~%int32 n_iterations ~%float64 average_distance ~%float64 uncertainty_x~%float64 uncertainty_y~%float64 uncertainty_z~%float64 uncertainty_roll~%float64 uncertainty_pitch~%float64 uncertainty_yaw~%int32 meanSquareDistEdgeInlierNum~%int32 meanSquareDistEdgeOutlierNum~%int32 fitQualityCoeffEdgeInlierNum~%int32 fitQualityCoeffEdgeOutlierNum~%int32 meanSquareDistPlaneInlierNum~%int32 meanSquareDistPlaneOutlierNum~%int32 fitQualityCoeffPlaneInlierNum~%int32 fitQualityCoeffPlaneOutlierNum~%int32  PlaneMatchSuccess~%int32  PlaneNoEnoughNeighbor~%int32  PlaneNeighborTooFar ~%int32  PlaneBADPCAStructure~%int32  PlaneInvalidNumerical~%int32  PlaneMSETOOLARGE~%int32  PlaneUnknown~%int32  PredictionSource ~%super_odometry_msgs/IterationStats[] iterations~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%string frame_id~%~%================================================================================~%MSG: super_odometry_msgs/IterationStats~%# float64 time_elapsed~%float64 translation_norm~%float64 rotation_norm~%float64 num_surf_from_scan~%float64 num_corner_from_scan~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'OptimizationStats)))
  "Returns full string definition for message of type 'OptimizationStats"
  (cl:format cl:nil "Header header~%int32 laserCloudSurfFromMapNum~%int32 laserCloudCornerFromMapNum~%int32 laserCloudSurfStackNum~%int32 laserCloudCornerStackNum~%float64 total_translation~%float64 total_rotation~%float64 translation_from_last~%float64 rotation_from_last~%float64 time_elapsed~%float64 latency~%int32 n_iterations ~%float64 average_distance ~%float64 uncertainty_x~%float64 uncertainty_y~%float64 uncertainty_z~%float64 uncertainty_roll~%float64 uncertainty_pitch~%float64 uncertainty_yaw~%int32 meanSquareDistEdgeInlierNum~%int32 meanSquareDistEdgeOutlierNum~%int32 fitQualityCoeffEdgeInlierNum~%int32 fitQualityCoeffEdgeOutlierNum~%int32 meanSquareDistPlaneInlierNum~%int32 meanSquareDistPlaneOutlierNum~%int32 fitQualityCoeffPlaneInlierNum~%int32 fitQualityCoeffPlaneOutlierNum~%int32  PlaneMatchSuccess~%int32  PlaneNoEnoughNeighbor~%int32  PlaneNeighborTooFar ~%int32  PlaneBADPCAStructure~%int32  PlaneInvalidNumerical~%int32  PlaneMSETOOLARGE~%int32  PlaneUnknown~%int32  PredictionSource ~%super_odometry_msgs/IterationStats[] iterations~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%string frame_id~%~%================================================================================~%MSG: super_odometry_msgs/IterationStats~%# float64 time_elapsed~%float64 translation_norm~%float64 rotation_norm~%float64 num_surf_from_scan~%float64 num_corner_from_scan~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <OptimizationStats>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'header))
     4
     4
     4
     4
     8
     8
     8
     8
     8
     8
     4
     8
     8
     8
     8
     8
     8
     8
     4
     4
     4
     4
     4
     4
     4
     4
     4
     4
     4
     4
     4
     4
     4
     4
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'iterations) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <OptimizationStats>))
  "Converts a ROS message object to a list"
  (cl:list 'OptimizationStats
    (cl:cons ':header (header msg))
    (cl:cons ':laserCloudSurfFromMapNum (laserCloudSurfFromMapNum msg))
    (cl:cons ':laserCloudCornerFromMapNum (laserCloudCornerFromMapNum msg))
    (cl:cons ':laserCloudSurfStackNum (laserCloudSurfStackNum msg))
    (cl:cons ':laserCloudCornerStackNum (laserCloudCornerStackNum msg))
    (cl:cons ':total_translation (total_translation msg))
    (cl:cons ':total_rotation (total_rotation msg))
    (cl:cons ':translation_from_last (translation_from_last msg))
    (cl:cons ':rotation_from_last (rotation_from_last msg))
    (cl:cons ':time_elapsed (time_elapsed msg))
    (cl:cons ':latency (latency msg))
    (cl:cons ':n_iterations (n_iterations msg))
    (cl:cons ':average_distance (average_distance msg))
    (cl:cons ':uncertainty_x (uncertainty_x msg))
    (cl:cons ':uncertainty_y (uncertainty_y msg))
    (cl:cons ':uncertainty_z (uncertainty_z msg))
    (cl:cons ':uncertainty_roll (uncertainty_roll msg))
    (cl:cons ':uncertainty_pitch (uncertainty_pitch msg))
    (cl:cons ':uncertainty_yaw (uncertainty_yaw msg))
    (cl:cons ':meanSquareDistEdgeInlierNum (meanSquareDistEdgeInlierNum msg))
    (cl:cons ':meanSquareDistEdgeOutlierNum (meanSquareDistEdgeOutlierNum msg))
    (cl:cons ':fitQualityCoeffEdgeInlierNum (fitQualityCoeffEdgeInlierNum msg))
    (cl:cons ':fitQualityCoeffEdgeOutlierNum (fitQualityCoeffEdgeOutlierNum msg))
    (cl:cons ':meanSquareDistPlaneInlierNum (meanSquareDistPlaneInlierNum msg))
    (cl:cons ':meanSquareDistPlaneOutlierNum (meanSquareDistPlaneOutlierNum msg))
    (cl:cons ':fitQualityCoeffPlaneInlierNum (fitQualityCoeffPlaneInlierNum msg))
    (cl:cons ':fitQualityCoeffPlaneOutlierNum (fitQualityCoeffPlaneOutlierNum msg))
    (cl:cons ':PlaneMatchSuccess (PlaneMatchSuccess msg))
    (cl:cons ':PlaneNoEnoughNeighbor (PlaneNoEnoughNeighbor msg))
    (cl:cons ':PlaneNeighborTooFar (PlaneNeighborTooFar msg))
    (cl:cons ':PlaneBADPCAStructure (PlaneBADPCAStructure msg))
    (cl:cons ':PlaneInvalidNumerical (PlaneInvalidNumerical msg))
    (cl:cons ':PlaneMSETOOLARGE (PlaneMSETOOLARGE msg))
    (cl:cons ':PlaneUnknown (PlaneUnknown msg))
    (cl:cons ':PredictionSource (PredictionSource msg))
    (cl:cons ':iterations (iterations msg))
))
