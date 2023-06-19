import numpy as np
import os
from tqdm import tqdm
import rosbag
import sensor_msgs.point_cloud2 as pc2
import time
from tqdm import tqdm
import random
import struct

'''
paths: a list of all the paths to bag files 
targetTopics: a list of all the PointCloud topics that needs to transfer (list size = 1)
pathOut: a path to the output
binFolderName: the name of the output folder
'''
def pc2bin(paths, targetTopics, pathOut, binFolderName):
    def writeToFile(arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB):
        nonlocal outFileCount, totalNumPoints
        totalNumPoints += len(arrayX)
        filename = os.path.join(pathOut, str(outFileCount) + ".bin")
        with open(filename, 'wb') as f:
            num_of_clouds = 1
            f.write(num_of_clouds.to_bytes(4, 'little'))
            num_of_points:int = len(arrayX)
            f.write(num_of_points.to_bytes(4, 'little'))
            if(len(arrayR)>0 and len(arrayG)>0 and len(arrayB)>0): 
                f.write(0b11000000.to_bytes(1, 'big'))
            else:
                f.write(0b10000000.to_bytes(1, 'little'))
            for i in range(len(arrayX)):
                f.write(struct.pack('<f', arrayX[i]))
                f.write(struct.pack('<f', arrayY[i]))
                f.write(struct.pack('<f', arrayZ[i]))
                if(len(arrayR)>0 and len(arrayG)>0 and len(arrayB)>0): 
                    f.write(struct.pack('B', arrayR[i]))
                    f.write(struct.pack('B', arrayG[i]))
                    f.write(struct.pack('B', arrayB[i]))
        outFileCount += 1

    pathOut = os.path.join(pathOut, binFolderName)
    if not (os.path.isdir(pathOut)):
        os.makedirs(os.path.join(pathOut))
    outFileCount = 0
    totalNumPoints = 0
    arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB = [], [], [], [], [], [], []
    startTime = time.time_ns()
    totalArrayTime = 0
    count = -1
    with open(pathOut + "/timestamps.txt", "w") as f:
        for path, pathIdx in zip(paths, range(len(paths))):
            if path.strip() == "":
                continue
            
            bagIn = rosbag.Bag(path)
            topicsInfo = bagIn.get_type_and_topic_info().topics
            totalMessages = sum(
                [topicsInfo[topic].message_count if topic in topicsInfo else 0 for topic in targetTopics]
            )
            
            for topic, msg, t in tqdm(bagIn.read_messages(topics=targetTopics) , total=totalMessages):
                count += 1
                arrayTimeStart = time.time_ns()
                for p in pc2.read_points(msg, field_names=("x", "y", "z", "rgba"), skip_nans=True):
                    x, y, z = p[0], p[1], p[2]
                    if len(p) > 3:
                        rgb = p[3]
                        r_value = (rgb & 0x00FF0000) >> 16
                        g_value = (rgb & 0x0000FF00) >> 8
                        b_value = rgb & 0x000000FF
                        arrayR.append(r_value)
                        arrayG.append(g_value)
                        arrayB.append(b_value)

                    arrayT.append(int(str(t)))
                    arrayX.append(x)
                    arrayY.append(y)
                    arrayZ.append(z)

                totalArrayTime += time.time_ns() - arrayTimeStart
                writeToFile(arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB)
                arrayX, arrayY, arrayZ, arrayT, arrayR, arrayG, arrayB = [], [], [], [], [], [], []
                f.write(str(t) + "\n")

    print("Total points: " + str(totalNumPoints))
    endTime = time.time_ns()
    print("Total time used = " + str((endTime - startTime) * 1e-9))
    print("Array time used = " + str(totalArrayTime * 1e-9))
    

# Example 
pc2bin(["/data/home/airlab/run_7/bags/core_2022-10-03-22-32-33_0.bag"], 
        ["/cmu_sp1/velodyne_cloud_registered_imu", "/cmu_sp1/velodyne_cloud_key_pose"],  
       "/data/home/airlab/run_7/bags",
       "new_test_bin"
       )
