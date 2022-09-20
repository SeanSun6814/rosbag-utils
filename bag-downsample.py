import rosbag
from std_msgs.msg import String
from random import randrange


def exportBag(pathIn, pathOut, targetTopics):
    print(
        "Processing bag "
        + pathIn
        + " -> "
        + pathOut
    )
    targetTopics = targetTopics.split(" ")
    print("Including topics: " + str(targetTopics))

    bagIn = rosbag.Bag(pathIn)
    count4 = count5 = 0
    with rosbag.Bag(pathOut, "w") as bagOut:
        for topic, msg, t in bagIn.read_messages():
            if topic in targetTopics:
                bagOut.write(topic, msg, t)

            if topic == "/camera_5/image_raw":
                if count5 % 5 == 0:
                    bagOut.write("/camera_5/image_raw_1000", msg, t)
                if count5 % 10 == 0:
                    bagOut.write("/camera_5/image_raw_500", msg, t)
                count5 += 1

            elif topic == "/camera_4/image_raw":
                if count4 % 5 == 0:
                    bagOut.write("/camera_4/image_raw_1000", msg, t)
                if count4 % 10 == 0:
                    bagOut.write("/camera_4/image_raw_500", msg, t)
                count4 += 1

    print("Finished exporting bag")


exportBag(
    "/mnt/f/360cam/g360_calib/test1.bag",
    "/mnt/f/360cam/g360_calib/test1_downsampled1.bag",
    "/thermal/image /imu/data /camera_4/image_raw /camera_5/image_raw"
)
