import os
import json

cache = None


def readDatasets():
    global cache
    if cache is not None:
        return cache
    datasets = []
    for file in walk_dir("./datasets", ".json"):
        datasetFile = readJson(file)
        for dataset in datasetFile["datasets"]:
            if dataset["name"] in datasets:
                raise Exception("Duplicate dataset name: " + dataset["name"])
            datasets.append(dataset)

    print("Found", len(datasets), "datasets")
    cache = datasets
    return datasets


def walk_dir(root_dir, file_ext):
    result = []
    for item in os.listdir(root_dir):
        path = os.path.join(root_dir, item)
        if os.path.isdir(path):
            result.extend(walk_dir(path, file_ext))
        elif path.endswith(file_ext):
            result.append(path)
    return result


def readJson(path):
    with open(path, "r") as f:
        return json.load(f)


# readDatasets()


# Each dataset JSON file has the following format:
# {
#     "datasets": [
#         {
#             "name": "cave_1",
#             "link": "https://asdf",
#             "isTartanairV2": false,
#             "topics": {
#                 "sup_odometry": {
#                     "type": "nav_msgs/Odometry",
#                     "id": "/aft_mapped_to_init"
#                 },
#                 "aft_mapped_to_init_imu": {
#                     "type": "nav_msgs/Odometry",
#                     "id": "/aft_mapped_to_init_imu"
#                 }
#         }
#     ]
# }
