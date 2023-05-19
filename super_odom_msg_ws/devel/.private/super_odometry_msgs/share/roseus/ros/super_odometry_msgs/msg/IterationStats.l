;; Auto-generated. Do not edit!


(when (boundp 'super_odometry_msgs::IterationStats)
  (if (not (find-package "SUPER_ODOMETRY_MSGS"))
    (make-package "SUPER_ODOMETRY_MSGS"))
  (shadow 'IterationStats (find-package "SUPER_ODOMETRY_MSGS")))
(unless (find-package "SUPER_ODOMETRY_MSGS::ITERATIONSTATS")
  (make-package "SUPER_ODOMETRY_MSGS::ITERATIONSTATS"))

(in-package "ROS")
;;//! \htmlinclude IterationStats.msg.html


(defclass super_odometry_msgs::IterationStats
  :super ros::object
  :slots (_translation_norm _rotation_norm _num_surf_from_scan _num_corner_from_scan ))

(defmethod super_odometry_msgs::IterationStats
  (:init
   (&key
    ((:translation_norm __translation_norm) 0.0)
    ((:rotation_norm __rotation_norm) 0.0)
    ((:num_surf_from_scan __num_surf_from_scan) 0.0)
    ((:num_corner_from_scan __num_corner_from_scan) 0.0)
    )
   (send-super :init)
   (setq _translation_norm (float __translation_norm))
   (setq _rotation_norm (float __rotation_norm))
   (setq _num_surf_from_scan (float __num_surf_from_scan))
   (setq _num_corner_from_scan (float __num_corner_from_scan))
   self)
  (:translation_norm
   (&optional __translation_norm)
   (if __translation_norm (setq _translation_norm __translation_norm)) _translation_norm)
  (:rotation_norm
   (&optional __rotation_norm)
   (if __rotation_norm (setq _rotation_norm __rotation_norm)) _rotation_norm)
  (:num_surf_from_scan
   (&optional __num_surf_from_scan)
   (if __num_surf_from_scan (setq _num_surf_from_scan __num_surf_from_scan)) _num_surf_from_scan)
  (:num_corner_from_scan
   (&optional __num_corner_from_scan)
   (if __num_corner_from_scan (setq _num_corner_from_scan __num_corner_from_scan)) _num_corner_from_scan)
  (:serialization-length
   ()
   (+
    ;; float64 _translation_norm
    8
    ;; float64 _rotation_norm
    8
    ;; float64 _num_surf_from_scan
    8
    ;; float64 _num_corner_from_scan
    8
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; float64 _translation_norm
       (sys::poke _translation_norm (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _rotation_norm
       (sys::poke _rotation_norm (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _num_surf_from_scan
       (sys::poke _num_surf_from_scan (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _num_corner_from_scan
       (sys::poke _num_corner_from_scan (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; float64 _translation_norm
     (setq _translation_norm (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _rotation_norm
     (setq _rotation_norm (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _num_surf_from_scan
     (setq _num_surf_from_scan (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _num_corner_from_scan
     (setq _num_corner_from_scan (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;;
   self)
  )

(setf (get super_odometry_msgs::IterationStats :md5sum-) "90f71769f61c5a37fe60b3deb9b24f06")
(setf (get super_odometry_msgs::IterationStats :datatype-) "super_odometry_msgs/IterationStats")
(setf (get super_odometry_msgs::IterationStats :definition-)
      "# float64 time_elapsed
float64 translation_norm
float64 rotation_norm
float64 num_surf_from_scan
float64 num_corner_from_scan

")



(provide :super_odometry_msgs/IterationStats "90f71769f61c5a37fe60b3deb9b24f06")


