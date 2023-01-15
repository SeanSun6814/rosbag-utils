import server.bagfilter
import server.baglas
import server.bagimg
import tkinter as tk
from tkinter import filedialog
import json
from mttkinter import *
import time


def processWebsocketRequest(req, res):
    def sendProgress(percentage, details="", status="RUNNING"):
        res({"type": "progress", "id": req["id"], "action": req["action"], "status": status, "progressDetails": details, "progress": percentage})

    def sendResult(result):
        sendProgress(1, "COMPLETE")
        res({"type": "result", "id": req["id"], "action": req["action"], "result": result})

    def sendError(error):
        res({"type": "error", "id": req["id"], "action": req["action"], "error": error})

    if req["action"] == "OPEN_BAG_TASK":
        print("REQUEST Opening new select file dialog")
        file_names = []
        try:
            root = tk.Tk()
            root.withdraw()
            msg = tk.filedialog.askopenfiles(filetypes=[("Rosbag", "*.bag")])
            root.destroy()
            file_names = [file.name for file in msg]
            print(file_names)
        except Exception as e:
            print(e)
        sendResult(file_names)
    elif req["action"] == "BAG_INFO_TASK":
        path = req["path"]
        print("REQUEST BAG_INFO_TASK: " + path)
        try:
            msg = server.bagfilter.getBagInfoJson(path)
            sendResult(msg)
        except Exception as e:
            sendError(str(e))
            print(e)
    elif req["action"] == "FILTER_BAG_TASK":
        print("REQUEST BAG_FILTER_TASK", str(req))
        server.bagfilter.exportBag(
            req["pathIn"],
            req["pathOut"],
            req["targetTopics"],
            req["cropType"],
            req["cropData"],
            req["autoCropData"],
            req["mergeBags"],
            req["odometryTopic"],
            sendProgress,
        )
        sendResult({"success": True})
    else:
        sendError("Unknown action: " + req["action"])


# def exportBag(pathIns, pathOuts, targetTopics, cropType, cropTimes, autoCropTimes, mergeBags, trajectoryTopic, sendProgress):
#     pass


# exportBag(
#     [
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/core_2022-12-19-13-28-33_0.bag",
#     ],
#     [
#         "/home/sean/Documents/GitHub/rosbag-utils/testdata/export_2023-01-13_17-56-36/export/core_2022-12-19-13-28-33_0.bag",
#     ],
#     ["/cmu_rc3/aft_mapped_to_init_imu"],
#     "AUTO",
#     [
#         {"cropStart": 0, "cropEnd": 1000000 * 1000},
#     ],
#     {"start": 0, "end": 0},
#     True,
#     "/cmu_rc3/aft_mapped_to_init_imu",
#     None,
# )
