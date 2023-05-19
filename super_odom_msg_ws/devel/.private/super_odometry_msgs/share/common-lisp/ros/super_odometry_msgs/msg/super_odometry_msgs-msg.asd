
(cl:in-package :asdf)

(defsystem "super_odometry_msgs-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :sensor_msgs-msg
               :std_msgs-msg
)
  :components ((:file "_package")
    (:file "IterationStats" :depends-on ("_package_IterationStats"))
    (:file "_package_IterationStats" :depends-on ("_package"))
    (:file "LaserFeature" :depends-on ("_package_LaserFeature"))
    (:file "_package_LaserFeature" :depends-on ("_package"))
    (:file "OptimizationStats" :depends-on ("_package_OptimizationStats"))
    (:file "_package_OptimizationStats" :depends-on ("_package"))
  ))