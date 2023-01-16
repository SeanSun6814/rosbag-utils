import server.bagfilter
import server.baglas
import server.bagimg
import tkinter as tk
from tkinter import filedialog
import json
from mttkinter import *
import time

progressPercentage = 0
progressDetails = ""


def processWebsocketRequest(req, res):
    def sendProgress(percentage=-1, details="", status="RUNNING"):
        global progressPercentage, progressDetails
        if percentage == progressPercentage and details == progressDetails:
            return
        if percentage == -1:
            percentage = progressPercentage
        else:
            if status == "RUNNING":
                percentage *= 0.99
            progressPercentage = max(min(percentage, 1), 0)
        if details == "":
            details = progressDetails
        else:
            progressDetails = details
        print("PROGRESS", progressPercentage, details)
        res(
            {
                "type": "progress",
                "id": req["id"],
                "action": req["action"],
                "status": status,
                "progressDetails": progressDetails,
                "progress": progressPercentage,
            }
        )

    def sendResult(result):
        sendProgress(percentage=1, details="Finished", status="COMPLETE")
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
        print("REQUEST BAG_FILTER_TASK")
        result = server.bagfilter.exportBag(
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
        sendResult({"finalCropTimes": result})
    elif req["action"] == "POINTCLOUD_EXPORT_TASK":
        print("REQUEST POINTCLOUD_EXPORT_TASK")
        result = server.baglas.exportPointCloud(
            req["paths"],
            req["targetTopic"],
            req["outPathNoExt"],
            req["maxPointsPerFile"],
            req["collapseAxis"],
            req["speed"],
            None if req["trimCloud"] == "" else req["trimCloud"],
            sendProgress,
        )
        sendResult(result)
    else:
        sendError("Unknown action: " + req["action"])


# def exportPointCloud(paths, targetTopic, outPathNoExt, maxPointsPerFile, collapseAxis, speed, trimCloud, sendProgress):
