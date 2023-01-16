import os


def getFolderFromPath(path):
    return path[: path.rfind("/") + 1]


def getFilenameFromPath(path):
    return path[path.rfind("/") + 1 :]


def mkdir(path):
    if not os.path.exists(path):
        os.makedirs(path)
