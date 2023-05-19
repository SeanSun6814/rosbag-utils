import sys
import json

sys.path.append(".")  # Add rosbag utils library to path


from rosbagutils import rosbagutils

# Example 3: Dataset Release

bagPath = "/data/home/airlab/run_3/bags/core_2022-10-03-21-29-29_0.bag"

topicMap = {}
topicMapMap = {}
topicMapMap["name"] = "robot_prediction_source"
topicMapMap["type"] = "std_msgs/String"

topicMap["/cmu_sp1/prediction_source"]=topicMapMap

# (pathsIn, pathOut, datasetName, topics, link, onProgress=doNothing)
rosbagutils.datasetRelease(
    [bagPath],
    "/data/home/airlab/run_3/release_test.csv",
    ["run_3_dataset"],
    topicMap,
    "Link_lmao"
)
