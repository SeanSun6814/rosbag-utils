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
        print("REQUEST BAG_FILTER_TASK: ")
        for i in range(5):
            sendProgress(i / 5, details="Doing something " + str(i))
            time.sleep(1)
        sendResult({"hello": "world"})
    else:
        sendError("Unknown action: " + req["action"])
