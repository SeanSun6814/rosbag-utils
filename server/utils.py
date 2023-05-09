import os
import time
import json
import numpy as np


class FastArr:
    def __init__(self, shape=(0,), dtype=float):
        """First item of shape is ingnored, the rest defines the shape"""
        self.shape = shape
        self.data = np.zeros((100, *shape[1:]), dtype=dtype)
        self.capacity = 100
        self.size = 0

    def update(self, x):
        if self.size == self.capacity:
            self.capacity *= 4
            newdata = np.zeros((self.capacity, *self.data.shape[1:]))
            newdata[: self.size] = self.data
            self.data = newdata

        self.data[self.size] = x
        self.size += 1

    def finalize(self):
        return self.data[: self.size]


def getFolderFromPath(path):
    return path[: path.rfind("/") + 1]


def getFilenameFromPath(path):
    return path[path.rfind("/") + 1 :]


def mkdir(path):
    if not os.path.exists(path):
        os.makedirs(path, exist_ok=True)


def writeTextFile(path, text):
    with open(path, "w") as f:
        f.write(text)


def writeResultFile(path, envInfo, results):
    envInfo["results"] = results
    envInfo["taskTimestamp"] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(time.time()))
    writeTextFile(path, json.dumps(envInfo, indent=4))


def getFolderSize(start_path):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(start_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            if not os.path.islink(fp):
                total_size += os.path.getsize(fp)

    return total_size  # in bytes

def joinPaths(a, b):
    if a[-1] == "/" and b[0] == "/":
        result = a + b[1:]
    elif a[-1] != "/" and b[0] != "/":
        result = a + "/" + b
    else:
        result = a + b

    if result[-1] == "/":
        result = result[:-1]

    return result