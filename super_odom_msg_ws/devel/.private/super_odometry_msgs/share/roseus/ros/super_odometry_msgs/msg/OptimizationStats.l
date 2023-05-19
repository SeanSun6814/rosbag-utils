;; Auto-generated. Do not edit!


(when (boundp 'super_odometry_msgs::OptimizationStats)
  (if (not (find-package "SUPER_ODOMETRY_MSGS"))
    (make-package "SUPER_ODOMETRY_MSGS"))
  (shadow 'OptimizationStats (find-package "SUPER_ODOMETRY_MSGS")))
(unless (find-package "SUPER_ODOMETRY_MSGS::OPTIMIZATIONSTATS")
  (make-package "SUPER_ODOMETRY_MSGS::OPTIMIZATIONSTATS"))

(in-package "ROS")
;;//! \htmlinclude OptimizationStats.msg.html
(if (not (find-package "STD_MSGS"))
  (ros::roseus-add-msgs "std_msgs"))


(defclass super_odometry_msgs::OptimizationStats
  :super ros::object
  :slots (_header _laserCloudSurfFromMapNum _laserCloudCornerFromMapNum _laserCloudSurfStackNum _laserCloudCornerStackNum _total_translation _total_rotation _translation_from_last _rotation_from_last _time_elapsed _latency _n_iterations _average_distance _uncertainty_x _uncertainty_y _uncertainty_z _uncertainty_roll _uncertainty_pitch _uncertainty_yaw _meanSquareDistEdgeInlierNum _meanSquareDistEdgeOutlierNum _fitQualityCoeffEdgeInlierNum _fitQualityCoeffEdgeOutlierNum _meanSquareDistPlaneInlierNum _meanSquareDistPlaneOutlierNum _fitQualityCoeffPlaneInlierNum _fitQualityCoeffPlaneOutlierNum _PlaneMatchSuccess _PlaneNoEnoughNeighbor _PlaneNeighborTooFar _PlaneBADPCAStructure _PlaneInvalidNumerical _PlaneMSETOOLARGE _PlaneUnknown _PredictionSource _iterations ))

(defmethod super_odometry_msgs::OptimizationStats
  (:init
   (&key
    ((:header __header) (instance std_msgs::Header :init))
    ((:laserCloudSurfFromMapNum __laserCloudSurfFromMapNum) 0)
    ((:laserCloudCornerFromMapNum __laserCloudCornerFromMapNum) 0)
    ((:laserCloudSurfStackNum __laserCloudSurfStackNum) 0)
    ((:laserCloudCornerStackNum __laserCloudCornerStackNum) 0)
    ((:total_translation __total_translation) 0.0)
    ((:total_rotation __total_rotation) 0.0)
    ((:translation_from_last __translation_from_last) 0.0)
    ((:rotation_from_last __rotation_from_last) 0.0)
    ((:time_elapsed __time_elapsed) 0.0)
    ((:latency __latency) 0.0)
    ((:n_iterations __n_iterations) 0)
    ((:average_distance __average_distance) 0.0)
    ((:uncertainty_x __uncertainty_x) 0.0)
    ((:uncertainty_y __uncertainty_y) 0.0)
    ((:uncertainty_z __uncertainty_z) 0.0)
    ((:uncertainty_roll __uncertainty_roll) 0.0)
    ((:uncertainty_pitch __uncertainty_pitch) 0.0)
    ((:uncertainty_yaw __uncertainty_yaw) 0.0)
    ((:meanSquareDistEdgeInlierNum __meanSquareDistEdgeInlierNum) 0)
    ((:meanSquareDistEdgeOutlierNum __meanSquareDistEdgeOutlierNum) 0)
    ((:fitQualityCoeffEdgeInlierNum __fitQualityCoeffEdgeInlierNum) 0)
    ((:fitQualityCoeffEdgeOutlierNum __fitQualityCoeffEdgeOutlierNum) 0)
    ((:meanSquareDistPlaneInlierNum __meanSquareDistPlaneInlierNum) 0)
    ((:meanSquareDistPlaneOutlierNum __meanSquareDistPlaneOutlierNum) 0)
    ((:fitQualityCoeffPlaneInlierNum __fitQualityCoeffPlaneInlierNum) 0)
    ((:fitQualityCoeffPlaneOutlierNum __fitQualityCoeffPlaneOutlierNum) 0)
    ((:PlaneMatchSuccess __PlaneMatchSuccess) 0)
    ((:PlaneNoEnoughNeighbor __PlaneNoEnoughNeighbor) 0)
    ((:PlaneNeighborTooFar __PlaneNeighborTooFar) 0)
    ((:PlaneBADPCAStructure __PlaneBADPCAStructure) 0)
    ((:PlaneInvalidNumerical __PlaneInvalidNumerical) 0)
    ((:PlaneMSETOOLARGE __PlaneMSETOOLARGE) 0)
    ((:PlaneUnknown __PlaneUnknown) 0)
    ((:PredictionSource __PredictionSource) 0)
    ((:iterations __iterations) ())
    )
   (send-super :init)
   (setq _header __header)
   (setq _laserCloudSurfFromMapNum (round __laserCloudSurfFromMapNum))
   (setq _laserCloudCornerFromMapNum (round __laserCloudCornerFromMapNum))
   (setq _laserCloudSurfStackNum (round __laserCloudSurfStackNum))
   (setq _laserCloudCornerStackNum (round __laserCloudCornerStackNum))
   (setq _total_translation (float __total_translation))
   (setq _total_rotation (float __total_rotation))
   (setq _translation_from_last (float __translation_from_last))
   (setq _rotation_from_last (float __rotation_from_last))
   (setq _time_elapsed (float __time_elapsed))
   (setq _latency (float __latency))
   (setq _n_iterations (round __n_iterations))
   (setq _average_distance (float __average_distance))
   (setq _uncertainty_x (float __uncertainty_x))
   (setq _uncertainty_y (float __uncertainty_y))
   (setq _uncertainty_z (float __uncertainty_z))
   (setq _uncertainty_roll (float __uncertainty_roll))
   (setq _uncertainty_pitch (float __uncertainty_pitch))
   (setq _uncertainty_yaw (float __uncertainty_yaw))
   (setq _meanSquareDistEdgeInlierNum (round __meanSquareDistEdgeInlierNum))
   (setq _meanSquareDistEdgeOutlierNum (round __meanSquareDistEdgeOutlierNum))
   (setq _fitQualityCoeffEdgeInlierNum (round __fitQualityCoeffEdgeInlierNum))
   (setq _fitQualityCoeffEdgeOutlierNum (round __fitQualityCoeffEdgeOutlierNum))
   (setq _meanSquareDistPlaneInlierNum (round __meanSquareDistPlaneInlierNum))
   (setq _meanSquareDistPlaneOutlierNum (round __meanSquareDistPlaneOutlierNum))
   (setq _fitQualityCoeffPlaneInlierNum (round __fitQualityCoeffPlaneInlierNum))
   (setq _fitQualityCoeffPlaneOutlierNum (round __fitQualityCoeffPlaneOutlierNum))
   (setq _PlaneMatchSuccess (round __PlaneMatchSuccess))
   (setq _PlaneNoEnoughNeighbor (round __PlaneNoEnoughNeighbor))
   (setq _PlaneNeighborTooFar (round __PlaneNeighborTooFar))
   (setq _PlaneBADPCAStructure (round __PlaneBADPCAStructure))
   (setq _PlaneInvalidNumerical (round __PlaneInvalidNumerical))
   (setq _PlaneMSETOOLARGE (round __PlaneMSETOOLARGE))
   (setq _PlaneUnknown (round __PlaneUnknown))
   (setq _PredictionSource (round __PredictionSource))
   (setq _iterations __iterations)
   self)
  (:header
   (&rest __header)
   (if (keywordp (car __header))
       (send* _header __header)
     (progn
       (if __header (setq _header (car __header)))
       _header)))
  (:laserCloudSurfFromMapNum
   (&optional __laserCloudSurfFromMapNum)
   (if __laserCloudSurfFromMapNum (setq _laserCloudSurfFromMapNum __laserCloudSurfFromMapNum)) _laserCloudSurfFromMapNum)
  (:laserCloudCornerFromMapNum
   (&optional __laserCloudCornerFromMapNum)
   (if __laserCloudCornerFromMapNum (setq _laserCloudCornerFromMapNum __laserCloudCornerFromMapNum)) _laserCloudCornerFromMapNum)
  (:laserCloudSurfStackNum
   (&optional __laserCloudSurfStackNum)
   (if __laserCloudSurfStackNum (setq _laserCloudSurfStackNum __laserCloudSurfStackNum)) _laserCloudSurfStackNum)
  (:laserCloudCornerStackNum
   (&optional __laserCloudCornerStackNum)
   (if __laserCloudCornerStackNum (setq _laserCloudCornerStackNum __laserCloudCornerStackNum)) _laserCloudCornerStackNum)
  (:total_translation
   (&optional __total_translation)
   (if __total_translation (setq _total_translation __total_translation)) _total_translation)
  (:total_rotation
   (&optional __total_rotation)
   (if __total_rotation (setq _total_rotation __total_rotation)) _total_rotation)
  (:translation_from_last
   (&optional __translation_from_last)
   (if __translation_from_last (setq _translation_from_last __translation_from_last)) _translation_from_last)
  (:rotation_from_last
   (&optional __rotation_from_last)
   (if __rotation_from_last (setq _rotation_from_last __rotation_from_last)) _rotation_from_last)
  (:time_elapsed
   (&optional __time_elapsed)
   (if __time_elapsed (setq _time_elapsed __time_elapsed)) _time_elapsed)
  (:latency
   (&optional __latency)
   (if __latency (setq _latency __latency)) _latency)
  (:n_iterations
   (&optional __n_iterations)
   (if __n_iterations (setq _n_iterations __n_iterations)) _n_iterations)
  (:average_distance
   (&optional __average_distance)
   (if __average_distance (setq _average_distance __average_distance)) _average_distance)
  (:uncertainty_x
   (&optional __uncertainty_x)
   (if __uncertainty_x (setq _uncertainty_x __uncertainty_x)) _uncertainty_x)
  (:uncertainty_y
   (&optional __uncertainty_y)
   (if __uncertainty_y (setq _uncertainty_y __uncertainty_y)) _uncertainty_y)
  (:uncertainty_z
   (&optional __uncertainty_z)
   (if __uncertainty_z (setq _uncertainty_z __uncertainty_z)) _uncertainty_z)
  (:uncertainty_roll
   (&optional __uncertainty_roll)
   (if __uncertainty_roll (setq _uncertainty_roll __uncertainty_roll)) _uncertainty_roll)
  (:uncertainty_pitch
   (&optional __uncertainty_pitch)
   (if __uncertainty_pitch (setq _uncertainty_pitch __uncertainty_pitch)) _uncertainty_pitch)
  (:uncertainty_yaw
   (&optional __uncertainty_yaw)
   (if __uncertainty_yaw (setq _uncertainty_yaw __uncertainty_yaw)) _uncertainty_yaw)
  (:meanSquareDistEdgeInlierNum
   (&optional __meanSquareDistEdgeInlierNum)
   (if __meanSquareDistEdgeInlierNum (setq _meanSquareDistEdgeInlierNum __meanSquareDistEdgeInlierNum)) _meanSquareDistEdgeInlierNum)
  (:meanSquareDistEdgeOutlierNum
   (&optional __meanSquareDistEdgeOutlierNum)
   (if __meanSquareDistEdgeOutlierNum (setq _meanSquareDistEdgeOutlierNum __meanSquareDistEdgeOutlierNum)) _meanSquareDistEdgeOutlierNum)
  (:fitQualityCoeffEdgeInlierNum
   (&optional __fitQualityCoeffEdgeInlierNum)
   (if __fitQualityCoeffEdgeInlierNum (setq _fitQualityCoeffEdgeInlierNum __fitQualityCoeffEdgeInlierNum)) _fitQualityCoeffEdgeInlierNum)
  (:fitQualityCoeffEdgeOutlierNum
   (&optional __fitQualityCoeffEdgeOutlierNum)
   (if __fitQualityCoeffEdgeOutlierNum (setq _fitQualityCoeffEdgeOutlierNum __fitQualityCoeffEdgeOutlierNum)) _fitQualityCoeffEdgeOutlierNum)
  (:meanSquareDistPlaneInlierNum
   (&optional __meanSquareDistPlaneInlierNum)
   (if __meanSquareDistPlaneInlierNum (setq _meanSquareDistPlaneInlierNum __meanSquareDistPlaneInlierNum)) _meanSquareDistPlaneInlierNum)
  (:meanSquareDistPlaneOutlierNum
   (&optional __meanSquareDistPlaneOutlierNum)
   (if __meanSquareDistPlaneOutlierNum (setq _meanSquareDistPlaneOutlierNum __meanSquareDistPlaneOutlierNum)) _meanSquareDistPlaneOutlierNum)
  (:fitQualityCoeffPlaneInlierNum
   (&optional __fitQualityCoeffPlaneInlierNum)
   (if __fitQualityCoeffPlaneInlierNum (setq _fitQualityCoeffPlaneInlierNum __fitQualityCoeffPlaneInlierNum)) _fitQualityCoeffPlaneInlierNum)
  (:fitQualityCoeffPlaneOutlierNum
   (&optional __fitQualityCoeffPlaneOutlierNum)
   (if __fitQualityCoeffPlaneOutlierNum (setq _fitQualityCoeffPlaneOutlierNum __fitQualityCoeffPlaneOutlierNum)) _fitQualityCoeffPlaneOutlierNum)
  (:PlaneMatchSuccess
   (&optional __PlaneMatchSuccess)
   (if __PlaneMatchSuccess (setq _PlaneMatchSuccess __PlaneMatchSuccess)) _PlaneMatchSuccess)
  (:PlaneNoEnoughNeighbor
   (&optional __PlaneNoEnoughNeighbor)
   (if __PlaneNoEnoughNeighbor (setq _PlaneNoEnoughNeighbor __PlaneNoEnoughNeighbor)) _PlaneNoEnoughNeighbor)
  (:PlaneNeighborTooFar
   (&optional __PlaneNeighborTooFar)
   (if __PlaneNeighborTooFar (setq _PlaneNeighborTooFar __PlaneNeighborTooFar)) _PlaneNeighborTooFar)
  (:PlaneBADPCAStructure
   (&optional __PlaneBADPCAStructure)
   (if __PlaneBADPCAStructure (setq _PlaneBADPCAStructure __PlaneBADPCAStructure)) _PlaneBADPCAStructure)
  (:PlaneInvalidNumerical
   (&optional __PlaneInvalidNumerical)
   (if __PlaneInvalidNumerical (setq _PlaneInvalidNumerical __PlaneInvalidNumerical)) _PlaneInvalidNumerical)
  (:PlaneMSETOOLARGE
   (&optional __PlaneMSETOOLARGE)
   (if __PlaneMSETOOLARGE (setq _PlaneMSETOOLARGE __PlaneMSETOOLARGE)) _PlaneMSETOOLARGE)
  (:PlaneUnknown
   (&optional __PlaneUnknown)
   (if __PlaneUnknown (setq _PlaneUnknown __PlaneUnknown)) _PlaneUnknown)
  (:PredictionSource
   (&optional __PredictionSource)
   (if __PredictionSource (setq _PredictionSource __PredictionSource)) _PredictionSource)
  (:iterations
   (&rest __iterations)
   (if (keywordp (car __iterations))
       (send* _iterations __iterations)
     (progn
       (if __iterations (setq _iterations (car __iterations)))
       _iterations)))
  (:serialization-length
   ()
   (+
    ;; std_msgs/Header _header
    (send _header :serialization-length)
    ;; int32 _laserCloudSurfFromMapNum
    4
    ;; int32 _laserCloudCornerFromMapNum
    4
    ;; int32 _laserCloudSurfStackNum
    4
    ;; int32 _laserCloudCornerStackNum
    4
    ;; float64 _total_translation
    8
    ;; float64 _total_rotation
    8
    ;; float64 _translation_from_last
    8
    ;; float64 _rotation_from_last
    8
    ;; float64 _time_elapsed
    8
    ;; float64 _latency
    8
    ;; int32 _n_iterations
    4
    ;; float64 _average_distance
    8
    ;; float64 _uncertainty_x
    8
    ;; float64 _uncertainty_y
    8
    ;; float64 _uncertainty_z
    8
    ;; float64 _uncertainty_roll
    8
    ;; float64 _uncertainty_pitch
    8
    ;; float64 _uncertainty_yaw
    8
    ;; int32 _meanSquareDistEdgeInlierNum
    4
    ;; int32 _meanSquareDistEdgeOutlierNum
    4
    ;; int32 _fitQualityCoeffEdgeInlierNum
    4
    ;; int32 _fitQualityCoeffEdgeOutlierNum
    4
    ;; int32 _meanSquareDistPlaneInlierNum
    4
    ;; int32 _meanSquareDistPlaneOutlierNum
    4
    ;; int32 _fitQualityCoeffPlaneInlierNum
    4
    ;; int32 _fitQualityCoeffPlaneOutlierNum
    4
    ;; int32 _PlaneMatchSuccess
    4
    ;; int32 _PlaneNoEnoughNeighbor
    4
    ;; int32 _PlaneNeighborTooFar
    4
    ;; int32 _PlaneBADPCAStructure
    4
    ;; int32 _PlaneInvalidNumerical
    4
    ;; int32 _PlaneMSETOOLARGE
    4
    ;; int32 _PlaneUnknown
    4
    ;; int32 _PredictionSource
    4
    ;; super_odometry_msgs/IterationStats[] _iterations
    (apply #'+ (send-all _iterations :serialization-length)) 4
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; std_msgs/Header _header
       (send _header :serialize s)
     ;; int32 _laserCloudSurfFromMapNum
       (write-long _laserCloudSurfFromMapNum s)
     ;; int32 _laserCloudCornerFromMapNum
       (write-long _laserCloudCornerFromMapNum s)
     ;; int32 _laserCloudSurfStackNum
       (write-long _laserCloudSurfStackNum s)
     ;; int32 _laserCloudCornerStackNum
       (write-long _laserCloudCornerStackNum s)
     ;; float64 _total_translation
       (sys::poke _total_translation (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _total_rotation
       (sys::poke _total_rotation (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _translation_from_last
       (sys::poke _translation_from_last (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _rotation_from_last
       (sys::poke _rotation_from_last (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _time_elapsed
       (sys::poke _time_elapsed (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _latency
       (sys::poke _latency (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; int32 _n_iterations
       (write-long _n_iterations s)
     ;; float64 _average_distance
       (sys::poke _average_distance (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _uncertainty_x
       (sys::poke _uncertainty_x (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _uncertainty_y
       (sys::poke _uncertainty_y (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _uncertainty_z
       (sys::poke _uncertainty_z (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _uncertainty_roll
       (sys::poke _uncertainty_roll (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _uncertainty_pitch
       (sys::poke _uncertainty_pitch (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _uncertainty_yaw
       (sys::poke _uncertainty_yaw (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; int32 _meanSquareDistEdgeInlierNum
       (write-long _meanSquareDistEdgeInlierNum s)
     ;; int32 _meanSquareDistEdgeOutlierNum
       (write-long _meanSquareDistEdgeOutlierNum s)
     ;; int32 _fitQualityCoeffEdgeInlierNum
       (write-long _fitQualityCoeffEdgeInlierNum s)
     ;; int32 _fitQualityCoeffEdgeOutlierNum
       (write-long _fitQualityCoeffEdgeOutlierNum s)
     ;; int32 _meanSquareDistPlaneInlierNum
       (write-long _meanSquareDistPlaneInlierNum s)
     ;; int32 _meanSquareDistPlaneOutlierNum
       (write-long _meanSquareDistPlaneOutlierNum s)
     ;; int32 _fitQualityCoeffPlaneInlierNum
       (write-long _fitQualityCoeffPlaneInlierNum s)
     ;; int32 _fitQualityCoeffPlaneOutlierNum
       (write-long _fitQualityCoeffPlaneOutlierNum s)
     ;; int32 _PlaneMatchSuccess
       (write-long _PlaneMatchSuccess s)
     ;; int32 _PlaneNoEnoughNeighbor
       (write-long _PlaneNoEnoughNeighbor s)
     ;; int32 _PlaneNeighborTooFar
       (write-long _PlaneNeighborTooFar s)
     ;; int32 _PlaneBADPCAStructure
       (write-long _PlaneBADPCAStructure s)
     ;; int32 _PlaneInvalidNumerical
       (write-long _PlaneInvalidNumerical s)
     ;; int32 _PlaneMSETOOLARGE
       (write-long _PlaneMSETOOLARGE s)
     ;; int32 _PlaneUnknown
       (write-long _PlaneUnknown s)
     ;; int32 _PredictionSource
       (write-long _PredictionSource s)
     ;; super_odometry_msgs/IterationStats[] _iterations
     (write-long (length _iterations) s)
     (dolist (elem _iterations)
       (send elem :serialize s)
       )
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; std_msgs/Header _header
     (send _header :deserialize buf ptr-) (incf ptr- (send _header :serialization-length))
   ;; int32 _laserCloudSurfFromMapNum
     (setq _laserCloudSurfFromMapNum (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _laserCloudCornerFromMapNum
     (setq _laserCloudCornerFromMapNum (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _laserCloudSurfStackNum
     (setq _laserCloudSurfStackNum (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _laserCloudCornerStackNum
     (setq _laserCloudCornerStackNum (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; float64 _total_translation
     (setq _total_translation (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _total_rotation
     (setq _total_rotation (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _translation_from_last
     (setq _translation_from_last (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _rotation_from_last
     (setq _rotation_from_last (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _time_elapsed
     (setq _time_elapsed (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _latency
     (setq _latency (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; int32 _n_iterations
     (setq _n_iterations (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; float64 _average_distance
     (setq _average_distance (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _uncertainty_x
     (setq _uncertainty_x (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _uncertainty_y
     (setq _uncertainty_y (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _uncertainty_z
     (setq _uncertainty_z (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _uncertainty_roll
     (setq _uncertainty_roll (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _uncertainty_pitch
     (setq _uncertainty_pitch (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _uncertainty_yaw
     (setq _uncertainty_yaw (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; int32 _meanSquareDistEdgeInlierNum
     (setq _meanSquareDistEdgeInlierNum (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _meanSquareDistEdgeOutlierNum
     (setq _meanSquareDistEdgeOutlierNum (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _fitQualityCoeffEdgeInlierNum
     (setq _fitQualityCoeffEdgeInlierNum (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _fitQualityCoeffEdgeOutlierNum
     (setq _fitQualityCoeffEdgeOutlierNum (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _meanSquareDistPlaneInlierNum
     (setq _meanSquareDistPlaneInlierNum (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _meanSquareDistPlaneOutlierNum
     (setq _meanSquareDistPlaneOutlierNum (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _fitQualityCoeffPlaneInlierNum
     (setq _fitQualityCoeffPlaneInlierNum (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _fitQualityCoeffPlaneOutlierNum
     (setq _fitQualityCoeffPlaneOutlierNum (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _PlaneMatchSuccess
     (setq _PlaneMatchSuccess (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _PlaneNoEnoughNeighbor
     (setq _PlaneNoEnoughNeighbor (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _PlaneNeighborTooFar
     (setq _PlaneNeighborTooFar (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _PlaneBADPCAStructure
     (setq _PlaneBADPCAStructure (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _PlaneInvalidNumerical
     (setq _PlaneInvalidNumerical (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _PlaneMSETOOLARGE
     (setq _PlaneMSETOOLARGE (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _PlaneUnknown
     (setq _PlaneUnknown (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _PredictionSource
     (setq _PredictionSource (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; super_odometry_msgs/IterationStats[] _iterations
   (let (n)
     (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4)
     (setq _iterations (let (r) (dotimes (i n) (push (instance super_odometry_msgs::IterationStats :init) r)) r))
     (dolist (elem- _iterations)
     (send elem- :deserialize buf ptr-) (incf ptr- (send elem- :serialization-length))
     ))
   ;;
   self)
  )

(setf (get super_odometry_msgs::OptimizationStats :md5sum-) "db5910f4dcadf7d411c357fed874db59")
(setf (get super_odometry_msgs::OptimizationStats :datatype-) "super_odometry_msgs/OptimizationStats")
(setf (get super_odometry_msgs::OptimizationStats :definition-)
      "Header header
int32 laserCloudSurfFromMapNum
int32 laserCloudCornerFromMapNum
int32 laserCloudSurfStackNum
int32 laserCloudCornerStackNum
float64 total_translation
float64 total_rotation
float64 translation_from_last
float64 rotation_from_last
float64 time_elapsed
float64 latency
int32 n_iterations 
float64 average_distance 
float64 uncertainty_x
float64 uncertainty_y
float64 uncertainty_z
float64 uncertainty_roll
float64 uncertainty_pitch
float64 uncertainty_yaw
int32 meanSquareDistEdgeInlierNum
int32 meanSquareDistEdgeOutlierNum
int32 fitQualityCoeffEdgeInlierNum
int32 fitQualityCoeffEdgeOutlierNum
int32 meanSquareDistPlaneInlierNum
int32 meanSquareDistPlaneOutlierNum
int32 fitQualityCoeffPlaneInlierNum
int32 fitQualityCoeffPlaneOutlierNum
int32  PlaneMatchSuccess
int32  PlaneNoEnoughNeighbor
int32  PlaneNeighborTooFar 
int32  PlaneBADPCAStructure
int32  PlaneInvalidNumerical
int32  PlaneMSETOOLARGE
int32  PlaneUnknown
int32  PredictionSource 
super_odometry_msgs/IterationStats[] iterations
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
MSG: super_odometry_msgs/IterationStats
# float64 time_elapsed
float64 translation_norm
float64 rotation_norm
float64 num_surf_from_scan
float64 num_corner_from_scan

")



(provide :super_odometry_msgs/OptimizationStats "db5910f4dcadf7d411c357fed874db59")


