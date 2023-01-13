import server.bagfilter
import server.baglas
import server.bagimg
import tkinter as tk
from tkinter import filedialog
import json


def processWebsocketRequest(req, res):
    def sendProgress(percentage, status):
        res({"type": "progress", "id": req["id"], "action": req["action"], "status": status, "percentage": percentage})

    def sendResult(result):
        res({"type": "result", "id": req["id"], "action": req["action"], "result": result})

    def sendError(error):
        res({"type": "error", "id": req["id"], "action": req["action"], "error": error})

    if req["action"] == "OPEN_BAG_TASK":
        print("REQUEST Opening new select file dialog")
        root = tk.Tk()
        root.withdraw()
        msg = tk.filedialog.askopenfiles(filetypes=[("Rosbag", "*.bag")])
        file_names = [file.name for file in msg]
        print(file_names)
        sendResult(json.dumps(file_names))
    elif req["action"] == "BAG_INFO_TASK":
        path = req["path"]
        print("REQUEST BAG_INFO_TASK: " + path)
        try:
            msg = server.bagfilter.getBagInfoJson(path)
            sendResult(msg)
        except Exception as e:
            sendError(str(e))
            print(e)
