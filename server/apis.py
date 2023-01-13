from ws_server import sendMessage


def sendProgress(actionId, status, percentage):
    sendMessage({"type": "progress", "actionId": actionId, "status": status, "percentage": percentage})


def processWebsocketRequest(req):
    if req.type == "action":
        if req.action == "bagInfo":
            path = data[b"path"][0].decode("utf-8")
            print("REQUEST bagInfo info for path: " + path)
            try:
                msg = bagfilter.getBagInfoJson(path)
                res(self, 200, "json", msg)
            except Exception as e:
                res(self, 500, "html", str(e))
                print(e)

        elif req.action == "selectBag":
            print("REQUEST Opening new select file dialog")
            root = tk.Tk()
            root.withdraw()
            msg = tk.filedialog.askopenfiles(filetypes=[("Rosbag", "*.bag")])
            file_names = [file.name for file in msg]
            print(file_names)
            res(self, 200, "json", json.dumps(file_names))

        elif req.action == "findMoveStart":
            print("REQUEST findMoveStart")
            path = data[b"path"][0].decode("utf-8")
            topic = data[b"topic"][0].decode("utf-8")
            result = bagfilter.getFirstMoveTime(path, topic)
            res(self, 200, "json", json.dumps(result))

        elif req.action == "exportBag":
            print("REQUEST exportBag")
            pathIn = data[b"pathIn"][0].decode("utf-8")
            pathOut = data[b"pathOut"][0].decode("utf-8")
            topics = data[b"topics"][0].decode("utf-8")
            startTime = data[b"startTime"][0].decode("utf-8")
            endTime = data[b"endTime"][0].decode("utf-8")
            trajectoryTopic = data[b"trajectoryTopic"][0].decode("utf-8")
            result = bagfilter.exportBag(pathIn, pathOut, topics, startTime, endTime, trajectoryTopic)
            res(self, 200, "json", json.dumps(result))

        elif req.action == "exportPointCloud":
            print("REQUEST exportPointCloud")
            pathIn = data[b"pathIn"][0].decode("utf-8")
            pathOut = data[b"pathOut"][0].decode("utf-8")
            topic = data[b"topic"][0].decode("utf-8")
            maxPoints = data[b"maxPoints"][0].decode("utf-8")
            collapseAxis = data[b"collapseAxis"][0].decode("utf-8")
            speed = data[b"speed"][0].decode("utf-8")
            xMax = data[b"xMax"][0].decode("utf-8")
            xMin = data[b"xMin"][0].decode("utf-8")
            yMax = data[b"yMax"][0].decode("utf-8")
            yMin = data[b"yMin"][0].decode("utf-8")
            zMax = data[b"zMax"][0].decode("utf-8")
            zMin = data[b"zMin"][0].decode("utf-8")

            xMinMax, yMinMax, zMinMax = None, None, None
            if xMax != "none" and xMin != "none":
                xMinMax = (float(xMin), float(xMax))
            if yMax != "none" and yMin != "none":
                yMinMax = (float(yMin), float(yMax))
            if zMax != "none" and zMin != "none":
                zMinMax = (float(zMin), float(zMax))
            result = baglas.exportPointCloud(
                pathIn,
                topic,
                pathOut,
                maxPoints,
                collapseAxis,
                speed,
                xMinMax,
                yMinMax,
                zMinMax,
            )
            res(self, 200, "json", json.dumps(result))

        elif req.action == "exportVideo":
            print("REQUEST exportVideo")
            pathIn = data[b"pathIn"][0].decode("utf-8")
            pathOut = data[b"pathOut"][0].decode("utf-8")
            topic = data[b"topic"][0].decode("utf-8")
            speed = data[b"speed"][0].decode("utf-8")
            fps = data[b"fps"][0].decode("utf-8")
            printTimestamp = data[b"printTimestamp"][0].decode("utf-8")
            invertImage = data[b"invertImage"][0].decode("utf-8") == "true"
            minFor16Bit = data[b"minBrightness"][0].decode("utf-8")
            maxFor16Bit = data[b"maxBrightness"][0].decode("utf-8")
            rangeFor16Bit = None
            if minFor16Bit.strip() != "" and maxFor16Bit.strip() != "":
                rangeFor16Bit = (int(minFor16Bit), int(maxFor16Bit))
            result = bagimg.exportVideo(pathIn, pathOut, topic, speed, fps, printTimestamp, invertImage, rangeFor16Bit)
            res(self, 200, "json", json.dumps(result))

        elif req.action == "saveFile":
            print("REQUEST saveFile")
            path = data[b"path"][0].decode("utf-8")
            text = data[b"text"][0].decode("utf-8")
            f = open(path, "w")
            f.write(text)
            f.close()
            res(self, 200, "json", json.dumps("File saved!"))

        elif req.action == "mkdir":
            print("REQUEST mkdir")
            path = data[b"path"][0].decode("utf-8")
            if not os.path.exists(path):
                os.makedirs(path)
            res(self, 200, "json", json.dumps("Folder created!"))
