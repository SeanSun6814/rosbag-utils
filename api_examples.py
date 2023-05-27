import sys
import json

sys.path.append(".")  # Add rosbag utils library to path


from rosbagutils import rosbagutils

# Example 1: Get bag info

bagPath = "./testdata/core_2022-11-08-23-16-59_3.bag"
print(json.dumps(rosbagutils.getBagInfo(bagPath), indent=4))


# Example 2: Filter bag topics

rosbagutils.filterBag(
    [bagPath],
    ["./testdata/filtered.bag"],
    ["/cmu_rc3/controller/path_velocity", "/cmu_rc3/aft_mapped_to_init_imu"],
)


# Example 3: Dataset Release

bagPath = "/data/home/airlab/run_3/bags/core_2022-10-03-21-29-29_0.bag"

topicMap = {}
topicMapMap = {}
topicMapMap["name"] = "robot_prediction_source"
topicMapMap["type"] = "std_msgs/String"

topicMap["/cmu_sp1/prediction_source"] = topicMapMap

# (pathsIn, pathOut, datasetName, topics, link, onProgress=doNothing)
rosbagutils.datasetRelease(
    [bagPath], "/data/home/airlab/run_3/release_test.csv", ["run_3_dataset"], topicMap, "Link_lmao"
)
