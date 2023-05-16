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
