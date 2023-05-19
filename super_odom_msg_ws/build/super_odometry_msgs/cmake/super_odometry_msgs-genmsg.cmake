# generated from genmsg/cmake/pkg-genmsg.cmake.em

message(STATUS "super_odometry_msgs: 3 messages, 0 services")

set(MSG_I_FLAGS "-Isuper_odometry_msgs:/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg;-Inav_msgs:/opt/ros/noetic/share/nav_msgs/cmake/../msg;-Istd_msgs:/opt/ros/noetic/share/std_msgs/cmake/../msg;-Igeometry_msgs:/opt/ros/noetic/share/geometry_msgs/cmake/../msg;-Isensor_msgs:/opt/ros/noetic/share/sensor_msgs/cmake/../msg;-Iactionlib_msgs:/opt/ros/noetic/share/actionlib_msgs/cmake/../msg")

# Find all generators
find_package(gencpp REQUIRED)
find_package(geneus REQUIRED)
find_package(genlisp REQUIRED)
find_package(gennodejs REQUIRED)
find_package(genpy REQUIRED)

add_custom_target(super_odometry_msgs_generate_messages ALL)

# verify that message/service dependencies have not changed since configure



get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg" NAME_WE)
add_custom_target(_super_odometry_msgs_generate_messages_check_deps_${_filename}
  COMMAND ${CATKIN_ENV} ${PYTHON_EXECUTABLE} ${GENMSG_CHECK_DEPS_SCRIPT} "super_odometry_msgs" "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg" ""
)

get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/OptimizationStats.msg" NAME_WE)
add_custom_target(_super_odometry_msgs_generate_messages_check_deps_${_filename}
  COMMAND ${CATKIN_ENV} ${PYTHON_EXECUTABLE} ${GENMSG_CHECK_DEPS_SCRIPT} "super_odometry_msgs" "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/OptimizationStats.msg" "super_odometry_msgs/IterationStats:std_msgs/Header"
)

get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/LaserFeature.msg" NAME_WE)
add_custom_target(_super_odometry_msgs_generate_messages_check_deps_${_filename}
  COMMAND ${CATKIN_ENV} ${PYTHON_EXECUTABLE} ${GENMSG_CHECK_DEPS_SCRIPT} "super_odometry_msgs" "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/LaserFeature.msg" "sensor_msgs/PointCloud2:std_msgs/Header:sensor_msgs/PointField"
)

#
#  langs = gencpp;geneus;genlisp;gennodejs;genpy
#

### Section generating for lang: gencpp
### Generating Messages
_generate_msg_cpp(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/super_odometry_msgs
)
_generate_msg_cpp(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/OptimizationStats.msg"
  "${MSG_I_FLAGS}"
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg;/opt/ros/noetic/share/std_msgs/cmake/../msg/Header.msg"
  ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/super_odometry_msgs
)
_generate_msg_cpp(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/LaserFeature.msg"
  "${MSG_I_FLAGS}"
  "/opt/ros/noetic/share/sensor_msgs/cmake/../msg/PointCloud2.msg;/opt/ros/noetic/share/std_msgs/cmake/../msg/Header.msg;/opt/ros/noetic/share/sensor_msgs/cmake/../msg/PointField.msg"
  ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/super_odometry_msgs
)

### Generating Services

### Generating Module File
_generate_module_cpp(super_odometry_msgs
  ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/super_odometry_msgs
  "${ALL_GEN_OUTPUT_FILES_cpp}"
)

add_custom_target(super_odometry_msgs_generate_messages_cpp
  DEPENDS ${ALL_GEN_OUTPUT_FILES_cpp}
)
add_dependencies(super_odometry_msgs_generate_messages super_odometry_msgs_generate_messages_cpp)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_cpp _super_odometry_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/OptimizationStats.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_cpp _super_odometry_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/LaserFeature.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_cpp _super_odometry_msgs_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(super_odometry_msgs_gencpp)
add_dependencies(super_odometry_msgs_gencpp super_odometry_msgs_generate_messages_cpp)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS super_odometry_msgs_generate_messages_cpp)

### Section generating for lang: geneus
### Generating Messages
_generate_msg_eus(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/super_odometry_msgs
)
_generate_msg_eus(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/OptimizationStats.msg"
  "${MSG_I_FLAGS}"
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg;/opt/ros/noetic/share/std_msgs/cmake/../msg/Header.msg"
  ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/super_odometry_msgs
)
_generate_msg_eus(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/LaserFeature.msg"
  "${MSG_I_FLAGS}"
  "/opt/ros/noetic/share/sensor_msgs/cmake/../msg/PointCloud2.msg;/opt/ros/noetic/share/std_msgs/cmake/../msg/Header.msg;/opt/ros/noetic/share/sensor_msgs/cmake/../msg/PointField.msg"
  ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/super_odometry_msgs
)

### Generating Services

### Generating Module File
_generate_module_eus(super_odometry_msgs
  ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/super_odometry_msgs
  "${ALL_GEN_OUTPUT_FILES_eus}"
)

add_custom_target(super_odometry_msgs_generate_messages_eus
  DEPENDS ${ALL_GEN_OUTPUT_FILES_eus}
)
add_dependencies(super_odometry_msgs_generate_messages super_odometry_msgs_generate_messages_eus)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_eus _super_odometry_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/OptimizationStats.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_eus _super_odometry_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/LaserFeature.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_eus _super_odometry_msgs_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(super_odometry_msgs_geneus)
add_dependencies(super_odometry_msgs_geneus super_odometry_msgs_generate_messages_eus)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS super_odometry_msgs_generate_messages_eus)

### Section generating for lang: genlisp
### Generating Messages
_generate_msg_lisp(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/super_odometry_msgs
)
_generate_msg_lisp(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/OptimizationStats.msg"
  "${MSG_I_FLAGS}"
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg;/opt/ros/noetic/share/std_msgs/cmake/../msg/Header.msg"
  ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/super_odometry_msgs
)
_generate_msg_lisp(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/LaserFeature.msg"
  "${MSG_I_FLAGS}"
  "/opt/ros/noetic/share/sensor_msgs/cmake/../msg/PointCloud2.msg;/opt/ros/noetic/share/std_msgs/cmake/../msg/Header.msg;/opt/ros/noetic/share/sensor_msgs/cmake/../msg/PointField.msg"
  ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/super_odometry_msgs
)

### Generating Services

### Generating Module File
_generate_module_lisp(super_odometry_msgs
  ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/super_odometry_msgs
  "${ALL_GEN_OUTPUT_FILES_lisp}"
)

add_custom_target(super_odometry_msgs_generate_messages_lisp
  DEPENDS ${ALL_GEN_OUTPUT_FILES_lisp}
)
add_dependencies(super_odometry_msgs_generate_messages super_odometry_msgs_generate_messages_lisp)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_lisp _super_odometry_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/OptimizationStats.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_lisp _super_odometry_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/LaserFeature.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_lisp _super_odometry_msgs_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(super_odometry_msgs_genlisp)
add_dependencies(super_odometry_msgs_genlisp super_odometry_msgs_generate_messages_lisp)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS super_odometry_msgs_generate_messages_lisp)

### Section generating for lang: gennodejs
### Generating Messages
_generate_msg_nodejs(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/super_odometry_msgs
)
_generate_msg_nodejs(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/OptimizationStats.msg"
  "${MSG_I_FLAGS}"
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg;/opt/ros/noetic/share/std_msgs/cmake/../msg/Header.msg"
  ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/super_odometry_msgs
)
_generate_msg_nodejs(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/LaserFeature.msg"
  "${MSG_I_FLAGS}"
  "/opt/ros/noetic/share/sensor_msgs/cmake/../msg/PointCloud2.msg;/opt/ros/noetic/share/std_msgs/cmake/../msg/Header.msg;/opt/ros/noetic/share/sensor_msgs/cmake/../msg/PointField.msg"
  ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/super_odometry_msgs
)

### Generating Services

### Generating Module File
_generate_module_nodejs(super_odometry_msgs
  ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/super_odometry_msgs
  "${ALL_GEN_OUTPUT_FILES_nodejs}"
)

add_custom_target(super_odometry_msgs_generate_messages_nodejs
  DEPENDS ${ALL_GEN_OUTPUT_FILES_nodejs}
)
add_dependencies(super_odometry_msgs_generate_messages super_odometry_msgs_generate_messages_nodejs)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_nodejs _super_odometry_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/OptimizationStats.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_nodejs _super_odometry_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/LaserFeature.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_nodejs _super_odometry_msgs_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(super_odometry_msgs_gennodejs)
add_dependencies(super_odometry_msgs_gennodejs super_odometry_msgs_generate_messages_nodejs)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS super_odometry_msgs_generate_messages_nodejs)

### Section generating for lang: genpy
### Generating Messages
_generate_msg_py(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg"
  "${MSG_I_FLAGS}"
  ""
  ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/super_odometry_msgs
)
_generate_msg_py(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/OptimizationStats.msg"
  "${MSG_I_FLAGS}"
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg;/opt/ros/noetic/share/std_msgs/cmake/../msg/Header.msg"
  ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/super_odometry_msgs
)
_generate_msg_py(super_odometry_msgs
  "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/LaserFeature.msg"
  "${MSG_I_FLAGS}"
  "/opt/ros/noetic/share/sensor_msgs/cmake/../msg/PointCloud2.msg;/opt/ros/noetic/share/std_msgs/cmake/../msg/Header.msg;/opt/ros/noetic/share/sensor_msgs/cmake/../msg/PointField.msg"
  ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/super_odometry_msgs
)

### Generating Services

### Generating Module File
_generate_module_py(super_odometry_msgs
  ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/super_odometry_msgs
  "${ALL_GEN_OUTPUT_FILES_py}"
)

add_custom_target(super_odometry_msgs_generate_messages_py
  DEPENDS ${ALL_GEN_OUTPUT_FILES_py}
)
add_dependencies(super_odometry_msgs_generate_messages super_odometry_msgs_generate_messages_py)

# add dependencies to all check dependencies targets
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/IterationStats.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_py _super_odometry_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/OptimizationStats.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_py _super_odometry_msgs_generate_messages_check_deps_${_filename})
get_filename_component(_filename "/root/rosbag-utils/super_odom_msg_ws/src/super_odometry_msgs/msg/LaserFeature.msg" NAME_WE)
add_dependencies(super_odometry_msgs_generate_messages_py _super_odometry_msgs_generate_messages_check_deps_${_filename})

# target for backward compatibility
add_custom_target(super_odometry_msgs_genpy)
add_dependencies(super_odometry_msgs_genpy super_odometry_msgs_generate_messages_py)

# register target for catkin_package(EXPORTED_TARGETS)
list(APPEND ${PROJECT_NAME}_EXPORTED_TARGETS super_odometry_msgs_generate_messages_py)



if(gencpp_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/super_odometry_msgs)
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${gencpp_INSTALL_DIR}/super_odometry_msgs
    DESTINATION ${gencpp_INSTALL_DIR}
  )
endif()
if(TARGET nav_msgs_generate_messages_cpp)
  add_dependencies(super_odometry_msgs_generate_messages_cpp nav_msgs_generate_messages_cpp)
endif()
if(TARGET std_msgs_generate_messages_cpp)
  add_dependencies(super_odometry_msgs_generate_messages_cpp std_msgs_generate_messages_cpp)
endif()
if(TARGET geometry_msgs_generate_messages_cpp)
  add_dependencies(super_odometry_msgs_generate_messages_cpp geometry_msgs_generate_messages_cpp)
endif()
if(TARGET sensor_msgs_generate_messages_cpp)
  add_dependencies(super_odometry_msgs_generate_messages_cpp sensor_msgs_generate_messages_cpp)
endif()

if(geneus_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/super_odometry_msgs)
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${geneus_INSTALL_DIR}/super_odometry_msgs
    DESTINATION ${geneus_INSTALL_DIR}
  )
endif()
if(TARGET nav_msgs_generate_messages_eus)
  add_dependencies(super_odometry_msgs_generate_messages_eus nav_msgs_generate_messages_eus)
endif()
if(TARGET std_msgs_generate_messages_eus)
  add_dependencies(super_odometry_msgs_generate_messages_eus std_msgs_generate_messages_eus)
endif()
if(TARGET geometry_msgs_generate_messages_eus)
  add_dependencies(super_odometry_msgs_generate_messages_eus geometry_msgs_generate_messages_eus)
endif()
if(TARGET sensor_msgs_generate_messages_eus)
  add_dependencies(super_odometry_msgs_generate_messages_eus sensor_msgs_generate_messages_eus)
endif()

if(genlisp_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/super_odometry_msgs)
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${genlisp_INSTALL_DIR}/super_odometry_msgs
    DESTINATION ${genlisp_INSTALL_DIR}
  )
endif()
if(TARGET nav_msgs_generate_messages_lisp)
  add_dependencies(super_odometry_msgs_generate_messages_lisp nav_msgs_generate_messages_lisp)
endif()
if(TARGET std_msgs_generate_messages_lisp)
  add_dependencies(super_odometry_msgs_generate_messages_lisp std_msgs_generate_messages_lisp)
endif()
if(TARGET geometry_msgs_generate_messages_lisp)
  add_dependencies(super_odometry_msgs_generate_messages_lisp geometry_msgs_generate_messages_lisp)
endif()
if(TARGET sensor_msgs_generate_messages_lisp)
  add_dependencies(super_odometry_msgs_generate_messages_lisp sensor_msgs_generate_messages_lisp)
endif()

if(gennodejs_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/super_odometry_msgs)
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${gennodejs_INSTALL_DIR}/super_odometry_msgs
    DESTINATION ${gennodejs_INSTALL_DIR}
  )
endif()
if(TARGET nav_msgs_generate_messages_nodejs)
  add_dependencies(super_odometry_msgs_generate_messages_nodejs nav_msgs_generate_messages_nodejs)
endif()
if(TARGET std_msgs_generate_messages_nodejs)
  add_dependencies(super_odometry_msgs_generate_messages_nodejs std_msgs_generate_messages_nodejs)
endif()
if(TARGET geometry_msgs_generate_messages_nodejs)
  add_dependencies(super_odometry_msgs_generate_messages_nodejs geometry_msgs_generate_messages_nodejs)
endif()
if(TARGET sensor_msgs_generate_messages_nodejs)
  add_dependencies(super_odometry_msgs_generate_messages_nodejs sensor_msgs_generate_messages_nodejs)
endif()

if(genpy_INSTALL_DIR AND EXISTS ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/super_odometry_msgs)
  install(CODE "execute_process(COMMAND \"/usr/bin/python3\" -m compileall \"${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/super_odometry_msgs\")")
  # install generated code
  install(
    DIRECTORY ${CATKIN_DEVEL_PREFIX}/${genpy_INSTALL_DIR}/super_odometry_msgs
    DESTINATION ${genpy_INSTALL_DIR}
  )
endif()
if(TARGET nav_msgs_generate_messages_py)
  add_dependencies(super_odometry_msgs_generate_messages_py nav_msgs_generate_messages_py)
endif()
if(TARGET std_msgs_generate_messages_py)
  add_dependencies(super_odometry_msgs_generate_messages_py std_msgs_generate_messages_py)
endif()
if(TARGET geometry_msgs_generate_messages_py)
  add_dependencies(super_odometry_msgs_generate_messages_py geometry_msgs_generate_messages_py)
endif()
if(TARGET sensor_msgs_generate_messages_py)
  add_dependencies(super_odometry_msgs_generate_messages_py sensor_msgs_generate_messages_py)
endif()
