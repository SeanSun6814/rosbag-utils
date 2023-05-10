import server.bagfilter
import server.baglas
import server.baglas_uncertainty
import server.bagimg
import server.measure_trajectory
import server.dataset_release.index
import server.dataset_download.read_datasets
import server.dataset_download.azure_download
import server.rate_limiter
import wx
import json
import time
import server.utils as utils
import traceback

progressPercentage = 0
progressDetails = ""
prev_dir = "/data"
# prev_dir = "~/Documents/airlab/rosbag-utils/testdata"

rate_limiter = server.rate_limiter.RateLimiter(1 / 4, lambda: True, lambda: False)


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
        if rate_limiter.run()():
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

    try:
        print("REQUEST " + req["action"])
        if req["action"] == "CHOOSE_FOLDER_TASK":
            app = wx.App()
            frame = wx.Frame(None, -1, "win.py")
            frame.SetSize(0, 0, 200, 50)
            openFileDialog = wx.DirDialog(frame, "Choose folder", prev_dir, wx.DD_DEFAULT_STYLE | wx.DD_DIR_MUST_EXIST)
            folder_name = ""
            userResponse = openFileDialog.ShowModal()
            if userResponse == wx.ID_OK:
                folder_name = openFileDialog.GetPath()
                prev_dir = folder_name
            print("SELECTED:", folder_name)
            openFileDialog.Destroy()
            sendResult(folder_name)
        elif req["action"] == "OPEN_BAG_TASK":
            app = wx.App()
            frame = wx.Frame(None, -1, "win.py")
            frame.SetSize(0, 0, 200, 50)
            openFileDialog = wx.FileDialog(
                frame,
                "Open Bag Files",
                prev_dir,
                "",
                "Rosbag files (*.bag)|*.bag",
                wx.FD_OPEN | wx.FD_FILE_MUST_EXIST | wx.FD_MULTIPLE,
            )
            file_names = []
            userResponse = openFileDialog.ShowModal()
            if userResponse == wx.ID_OK:
                file_names = openFileDialog.GetPaths()
            print("SELECTED:", file_names)
            openFileDialog.Destroy()

            if len(file_names) > 0:
                prev_dir = utils.getFolderFromPath(file_names[0])
            sendResult(file_names)
        elif req["action"] == "BAG_INFO_TASK":
            path = req["path"]
            msg = server.bagfilter.getBagInfoJson(path)
            sendResult(msg)
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
        elif req["action"] == "DATASET_RELEASE_TASK":
            result = server.dataset_release.index.convertBags(
                req["datasetName"],
                req["pathIn"],
                req["topics"],
                req["pathOut"],
                req["link"],
                req,
                sendProgress,
            )
            sendResult(result)
        elif req["action"] == "LOAD_DATASETS_TASK":
            result = server.dataset_download.read_datasets.readDatasets()
            sendResult(result)

        elif req["action"] == "DOWNLOAD_DATASET_TASK":
            print(json.dumps(req, indent=4))
            for i in range(100):
                time.sleep(0.01)
                sendProgress(percentage=i / 100, details="Downloading", status="RUNNING")
            sendResult("Done!")
        else:
            sendError("Unknown action: " + req["action"])
    except Exception as e:
        print(str(e) + ": " + str(traceback.format_exc()))
        sendError(str(e) + ": " + str(traceback.format_exc()))
