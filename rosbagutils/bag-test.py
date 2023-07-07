import rosbag
import rospy
import json
import yaml
import subprocess
import traceback
import numpy as np
from std_msgs.msg import String
from random import randrange


def writeIMUAngles(topic, msg, t, bagOut):
    def quaternion_to_euler_angle_vectorized1(w, x, y, z):
        ysqr = y * y
        t0 = +2.0 * (w * x + y * z)
        t1 = +1.0 - 2.0 * (x * x + ysqr)
        X = np.degrees(np.arctan2(t0, t1))
        t2 = +2.0 * (w * y - z * x)
        t2 = np.where(t2 > +1.0, +1.0, t2)
        t2 = np.where(t2 < -1.0, -1.0, t2)
        Y = np.degrees(np.arcsin(t2))
        t3 = +2.0 * (w * z + x * y)
        t4 = +1.0 - 2.0 * (ysqr + z * z)
        Z = np.degrees(np.arctan2(t3, t4))
        return X, Y, Z

    x, y, z = quaternion_to_euler_angle_vectorized1(
        msg.orientation.w, msg.orientation.x, msg.orientation.y, msg.orientation.z
    )
    xStr = String()
    xStr.data = str(x)
    yStr = String()
    yStr.data = str(y)
    zStr = String()
    zStr.data = str(z)
    bagOut.write(topic + "angles/x", xStr, t)
    bagOut.write(topic + "angles/y", yStr, t)
    bagOut.write(topic + "angles/z", zStr, t)


def exportBag(pathIn, pathOut, targetTopics, startTime, endTime):
    print("Processing bag " + pathIn + " -> " + pathOut + " for time range " + startTime + "-" + endTime)
    targetTopics = targetTopics.split(" ")
    print("Including topics: " + str(targetTopics))

    startTime = float(startTime) * 1e9
    endTime = float(endTime) * 1e9

    bagIn = rosbag.Bag(pathIn)
    dt = rospy.Duration(0, 45 * 1e6)
    with rosbag.Bag(pathOut, "w") as bagOut:
        for topic, msg, t in bagIn.read_messages():
            timestamp = float(str(msg.header.stamp))
            if timestamp >= startTime and timestamp <= endTime:
                if topic in targetTopics:
                    bagOut.write(topic, msg, t)

                elif topic == "/cmu_sp1/imu/data":
                    bagOut.write("/imu/data", msg, t)
                    bagOut.write("/imu_delayed/data", msg, t + dt)
                    writeIMUAngles("/imu/", msg, t, bagOut)
                    writeIMUAngles("/imu_delayed/", msg, t + dt, bagOut)

                elif topic == "/cmu_rc3/imu/data":
                    bagOut.write("/imu/data", msg, t)
                    bagOut.write("/imu_delayed/data", msg, t + dt)
                    writeIMUAngles("/imu/", msg, t, bagOut)
                    writeIMUAngles("/imu_delayed/", msg, t + dt, bagOut)

            elif timestamp > endTime:
                break

    print("Finished export bag")


exportBag(
    "/mnt/e/multi_sensor_2022-07-29/run_0/big/2022-08-03-13-28-22.bag",
    "/mnt/e/multi_sensor_2022-07-29/run_0/big/delayed45ms.bag",
    "/thermal/image",
    "0",
    "26000000000000",
)
