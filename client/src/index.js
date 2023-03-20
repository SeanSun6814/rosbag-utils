import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore;

store.subscribe(() => {
    console.log(store.getState());
});

// store.dispatch(
//     addBag({
//         id: 1,
//         selected: true,
//         path: "/home/sean/Documents/GitHub/rosbag-utils/testdata/core_2022-11-08-23-16-59_3.bag",
//         size: 1198254564,
//         startTime: 1667967419.405089,
//         endTime: 1667967437.64995,
//         duration: 18.244861,
//         messages: 24111,
//         topics: {
//             "/cmu_rc3/aft_mapped_to_init_imu": {
//                 name: "/cmu_rc3/aft_mapped_to_init_imu",
//                 type: "nav_msgs/Odometry",
//                 messages: 91,
//                 frequency: 4.987705853171477,
//             },
//             "/cmu_rc3/camera_1/image_raw": {
//                 name: "/cmu_rc3/camera_1/image_raw",
//                 type: "sensor_msgs/Image",
//                 messages: 437,
//                 frequency: 23.95195008610918,
//             },
//             "/cmu_rc3/controller/path_velocity": {
//                 name: "/cmu_rc3/controller/path_velocity",
//                 type: "mmpug_msgs/PathVelocity",
//                 messages: 91,
//                 frequency: 4.987705853171477,
//             },
//             "/cmu_rc3/debug/imu_error_stamp": {
//                 name: "/cmu_rc3/debug/imu_error_stamp",
//                 type: "std_msgs/Float32",
//                 messages: 51,
//                 frequency: 2.795307675953245,
//             },
//             "/cmu_rc3/debug/imu_rollover_event": {
//                 name: "/cmu_rc3/debug/imu_rollover_event",
//                 type: "std_msgs/Bool",
//                 messages: 20,
//                 frequency: 1.0961990886091157,
//             },
//             "/cmu_rc3/executive/active_waypoints": {
//                 name: "/cmu_rc3/executive/active_waypoints",
//                 type: "geometry_msgs/PoseArray",
//                 messages: 92,
//                 frequency: 5.042515807601933,
//             },
//             "/cmu_rc3/executive/armed": {
//                 name: "/cmu_rc3/executive/armed",
//                 type: "std_msgs/Bool",
//                 messages: 92,
//                 frequency: 5.042515807601933,
//             },
//             "/cmu_rc3/executive/command/lock_status": {
//                 name: "/cmu_rc3/executive/command/lock_status",
//                 type: "std_msgs/String",
//                 messages: 182,
//                 frequency: 9.975411706342953,
//             },
//             "/cmu_rc3/executive/cpu_usage": {
//                 name: "/cmu_rc3/executive/cpu_usage",
//                 type: "std_msgs/Float32",
//                 messages: 45,
//                 frequency: 2.4664479493705103,
//             },
//             "/cmu_rc3/executive/disk_usage": {
//                 name: "/cmu_rc3/executive/disk_usage",
//                 type: "std_msgs/Float32",
//                 messages: 45,
//                 frequency: 2.4664479493705103,
//             },
//             "/cmu_rc3/executive/locked": {
//                 name: "/cmu_rc3/executive/locked",
//                 type: "std_msgs/String",
//                 messages: 182,
//                 frequency: 9.975411706342953,
//             },
//             "/cmu_rc3/executive/messages": {
//                 name: "/cmu_rc3/executive/messages",
//                 type: "std_msgs/String",
//                 messages: 92,
//                 frequency: 5.042515807601933,
//             },
//             "/cmu_rc3/executive/mode/int": {
//                 name: "/cmu_rc3/executive/mode/int",
//                 type: "std_msgs/UInt8",
//                 messages: 92,
//                 frequency: 5.042515807601933,
//             },
//             "/cmu_rc3/executive/mode/string": {
//                 name: "/cmu_rc3/executive/mode/string",
//                 type: "std_msgs/String",
//                 messages: 92,
//                 frequency: 5.042515807601933,
//             },
//             "/cmu_rc3/imu/data": {
//                 name: "/cmu_rc3/imu/data",
//                 type: "sensor_msgs/Imu",
//                 messages: 3648,
//                 frequency: 199.94671376230272,
//             },
//             "/cmu_rc3/integrated_to_global": {
//                 name: "/cmu_rc3/integrated_to_global",
//                 type: "nav_msgs/Odometry",
//                 messages: 3651,
//                 frequency: 200.11114362559408,
//             },
//             "/cmu_rc3/integrated_to_init": {
//                 name: "/cmu_rc3/integrated_to_init",
//                 type: "nav_msgs/Odometry",
//                 messages: 3657,
//                 frequency: 200.4400033521768,
//             },
//             "/cmu_rc3/low_level_control/arm_status": {
//                 name: "/cmu_rc3/low_level_control/arm_status",
//                 type: "std_msgs/Bool",
//                 messages: 1824,
//                 frequency: 99.97335688115136,
//             },
//             "/cmu_rc3/low_level_control/cmd_vel": {
//                 name: "/cmu_rc3/low_level_control/cmd_vel",
//                 type: "geometry_msgs/TwistStamped",
//                 messages: 912,
//                 frequency: 49.98667844057568,
//             },
//             "/cmu_rc3/low_level_control/manual_override": {
//                 name: "/cmu_rc3/low_level_control/manual_override",
//                 type: "geometry_msgs/TwistStamped",
//                 messages: 92,
//                 frequency: 5.042515807601933,
//             },
//             "/cmu_rc3/low_level_control/manual_override_status": {
//                 name: "/cmu_rc3/low_level_control/manual_override_status",
//                 type: "std_msgs/Bool",
//                 messages: 1824,
//                 frequency: 99.97335688115136,
//             },
//             "/cmu_rc3/planner/path": {
//                 name: "/cmu_rc3/planner/path",
//                 type: "nav_msgs/Path",
//                 messages: 91,
//                 frequency: 4.987705853171477,
//             },
//             "/cmu_rc3/prediction_source": {
//                 name: "/cmu_rc3/prediction_source",
//                 type: "std_msgs/String",
//                 messages: 91,
//                 frequency: 4.987705853171477,
//             },
//             "/cmu_rc3/super_odometry_stats": {
//                 name: "/cmu_rc3/super_odometry_stats",
//                 type: "super_odometry_msgs/OptimizationStats",
//                 messages: 91,
//                 frequency: 4.987705853171477,
//             },
//             "/cmu_rc3/system/cpu/temp": {
//                 name: "/cmu_rc3/system/cpu/temp",
//                 type: "system_stats/Float32Stamped",
//                 messages: 45,
//                 frequency: 2.4664479493705103,
//             },
//             "/cmu_rc3/system/cpu/usage": {
//                 name: "/cmu_rc3/system/cpu/usage",
//                 type: "system_stats/Float32Stamped",
//                 messages: 45,
//                 frequency: 2.4664479493705103,
//             },
//             "/cmu_rc3/system/diagnostics": {
//                 name: "/cmu_rc3/system/diagnostics",
//                 type: "diagnostic_msgs/DiagnosticArray",
//                 messages: 45,
//                 frequency: 2.4664479493705103,
//             },
//             "/cmu_rc3/system/disk/usage": {
//                 name: "/cmu_rc3/system/disk/usage",
//                 type: "system_stats/Float32Stamped",
//                 messages: 45,
//                 frequency: 2.4664479493705103,
//             },
//             "/cmu_rc3/system/mem/usage_swap": {
//                 name: "/cmu_rc3/system/mem/usage_swap",
//                 type: "system_stats/Float32Stamped",
//                 messages: 45,
//                 frequency: 2.4664479493705103,
//             },
//             "/cmu_rc3/system/mem/usage_virtual": {
//                 name: "/cmu_rc3/system/mem/usage_virtual",
//                 type: "system_stats/Float32Stamped",
//                 messages: 45,
//                 frequency: 2.4664479493705103,
//             },
//             "/cmu_rc3/velodyne_cloud_registered_imu": {
//                 name: "/cmu_rc3/velodyne_cloud_registered_imu",
//                 type: "sensor_msgs/PointCloud2",
//                 messages: 91,
//                 frequency: 4.987705853171477,
//             },
//             "/cmu_rc3/velodyne_packets": {
//                 name: "/cmu_rc3/velodyne_packets",
//                 type: "velodyne_msgs/VelodyneScan",
//                 messages: 180,
//                 frequency: 9.865791797482041,
//             },
//             "/tf": {
//                 name: "/tf",
//                 type: "tf2_msgs/TFMessage",
//                 messages: 5022,
//                 frequency: 275.25559114974897,
//             },
//             "/thermal/image": {
//                 name: "/thermal/image",
//                 type: "sensor_msgs/Image",
//                 messages: 1063,
//                 frequency: 58.2629815595745,
//             },
//         },
//     })
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
