import server.bagfilter
import server.baglas
import server.baglas_uncertainty
import server.bagimg
import server.measure_trajectory
import tkinter as tk
from tkinter import filedialog
import json
import time
import server.utils

progressPercentage = 0
progressDetails = ""
prev_dir = "/data"
# prev_dir = "~/Documents/airlab/rosbag-utils/testdata"


def processWebsocketRequest(req, res):
    global prev_dir

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
        # print("PROGRESS", progressPercentage, details)
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
        res(
            {
                "type": "result",
                "id": req["id"],
                "action": req["action"],
                "result": result,
            }
        )

    def sendError(error):
        res({"type": "error", "id": req["id"], "action": req["action"], "error": error})

    print("REQUEST " + req["action"])
    if req["action"] == "OPEN_BAG_TASK":
        file_names = []
        try:
            root = tk.Tk()
            root.withdraw()
            msg = tk.filedialog.askopenfiles(
                filetypes=[("Rosbag", "*.bag")], initialdir=prev_dir
            )
            root.destroy()
            file_names = [file.name for file in msg]
            print("SELECTED:", file_names)
            if len(file_names) > 0:
                prev_dir = server.utils.getFolderFromPath(file_names[0])
        except Exception as e:
            print(e)
        sendResult(file_names)
    elif req["action"] == "BAG_INFO_TASK":
        path = req["path"]
        try:
            msg = server.bagfilter.getBagInfoJson(path)
            sendResult(msg)
        except Exception as e:
            sendError(str(e))
            print(e)
    elif req["action"] == "FILTER_BAG_TASK":
        result = server.bagfilter.exportBag(
            req["pathIn"],
            req["pathOut"],
            req["targetTopics"],
            req["cropType"],
            req["cropData"],
            req["autoCropData"],
            req["mergeBags"],
            req["odometryTopic"],
            req,
            sendProgress,
        )
        sendResult({"finalCropTimes": result})
    elif req["action"] == "POINTCLOUD_EXPORT_TASK":
        result = server.baglas.exportPointCloud(
            req["paths"],
            req["targetTopic"],
            req["outPathNoExt"],
            req["maxPointsPerFile"],
            req["collapseAxis"],
            req["speed"],
            None if req["trimCloud"] == "" else req["trimCloud"],
            req,
            sendProgress,
        )
        sendResult(result)
    elif req["action"] == "POINTCLOUD_COLOR_TASK":
        result = server.baglas_uncertainty.exportPointCloud(
            req["paths"],
            req["targetTopic"],
            req["odomStatsTopic"],
            req["outPathNoExt"],
            req["maxPointsPerFile"],
            req["collapseAxis"],
            req["speed"],
            None if req["trimCloud"] == "" else req["trimCloud"],
            req,
            sendProgress,
        )
        sendResult(result)
    elif req["action"] == "VIDEO_EXPORT_TASK":
        result = server.bagimg.exportVideo(
            req["paths"],
            req["pathOut"],
            req["targetTopic"],
            req["speed"],
            req["fps"],
            req["printTimestamp"],
            req["invertImage"],
            req["rangeFor16Bit"] if req["useManual16BitRange"] else None,
            req["livePreview"],
            req,
            sendProgress,
        )
        sendResult(result)
    elif req["action"] == "MEASURE_TRAJECTORY_TASK":
        result = server.measure_trajectory.measureTrajectory(
            req["pathIns"],
            req["pathOut"],
            req["targetTopic"],
            req["exportPosition"],
            req["exportVelocity"],
            req,
            sendProgress,
        )

        sendResult(result)
    else:
        sendError("Unknown action: " + req["action"])
