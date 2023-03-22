import os
import time
import json


def getFolderFromPath(path):
    return path[: path.rfind("/") + 1]


def getFilenameFromPath(path):
    return path[path.rfind("/") + 1 :]


def mkdir(path):
    if not os.path.exists(path):
        os.makedirs(path)


def writeTextFile(path, text):
    with open(path, "w") as f:
        f.write(text)


def writeResultFile(path, envInfo, results):
    envInfo["results"] = results
    envInfo["taskTimestamp"] = time.strftime(
        "%Y-%m-%d %H:%M:%S", time.localtime(time.time())
    )
    writeTextFile(path, json.dumps(envInfo, indent=4))
