from http.server import BaseHTTPRequestHandler, HTTPServer
from cgi import parse_header, parse_multipart
import multiprocessing
import bagfilter
import baglas
import bagimg
import urllib
from urllib.parse import urlparse, parse_qs
import json
import os
import tkinter as tk
from tkinter import filedialog
import time
import webbrowser

maxPortNum = multiprocessing.Value("i", -1)
portNum = -1


class handler(BaseHTTPRequestHandler):
    def parse_POST(self):
        ctype, pdict = parse_header(self.headers["content-type"])
        if ctype == "multipart/form-data":
            postVars = parse_multipart(self.rfile, pdict)
        elif ctype == "application/x-www-form-urlencoded":
            length = int(self.headers["content-length"])
            postVars = parse_qs(self.rfile.read(length), keep_blank_values=1)
        else:
            postVars = {}
        return postVars

    def do_POST(self):
        def res(this, code, type, msg):
            this.send_response(code)
            this.send_header("Content-Type", "application/json" if type == "json" else "text/html")
            this.send_header("Access-Control-Allow-Origin", "*")
            this.end_headers()
            this.wfile.write(bytes(msg, "utf8"))

        data = self.parse_POST()
        # print("Received data: " + str(data))
        print(f"Server on port {portNum}: POST ", self.path)

        if self.path.startswith("/bagInfo"):
            path = data[b"path"][0].decode("utf-8")
            print("REQUEST bagInfo info for path: " + path)
            try:
                msg = bagfilter.getBagInfoJson(path)
                res(self, 200, "json", msg)
            except Exception as e:
                res(self, 500, "html", str(e))
                print(e)

        elif self.path.startswith("/selectBag"):
            print("REQUEST Opening new select file dialog")
            root = tk.Tk()
            root.withdraw()
            msg = tk.filedialog.askopenfiles(filetypes=[("Rosbag", "*.bag")])
            file_names = [file.name for file in msg]
            print(file_names)
            res(self, 200, "json", json.dumps(file_names))

        elif self.path.startswith("/findMoveStart"):
            print("REQUEST findMoveStart")
            path = data[b"path"][0].decode("utf-8")
            topic = data[b"topic"][0].decode("utf-8")
            result = bagfilter.getFirstMoveTime(path, topic)
            res(self, 200, "json", json.dumps(result))

        elif self.path.startswith("/exportBag"):
            print("REQUEST exportBag")
            pathIn = data[b"pathIn"][0].decode("utf-8")
            pathOut = data[b"pathOut"][0].decode("utf-8")
            topics = data[b"topics"][0].decode("utf-8")
            startTime = data[b"startTime"][0].decode("utf-8")
            endTime = data[b"endTime"][0].decode("utf-8")
            trajectoryTopic = data[b"trajectoryTopic"][0].decode("utf-8")
            result = bagfilter.exportBag(pathIn, pathOut, topics, startTime, endTime, trajectoryTopic)
            res(self, 200, "json", json.dumps(result))

        elif self.path.startswith("/exportPointCloud"):
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

        elif self.path.startswith("/exportVideo"):
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

        elif self.path.startswith("/saveFile"):
            print("REQUEST saveFile")
            path = data[b"path"][0].decode("utf-8")
            text = data[b"text"][0].decode("utf-8")
            f = open(path, "w")
            f.write(text)
            f.close()
            res(self, 200, "json", json.dumps("File saved!"))

        elif self.path.startswith("/mkdir"):
            print("REQUEST mkdir")
            path = data[b"path"][0].decode("utf-8")
            if not os.path.exists(path):
                os.makedirs(path)
            res(self, 200, "json", json.dumps("Folder created!"))

        elif self.path.startswith("/newWindow"):
            print("REQUEST newWindow")
            port = createServer(False)
            time.sleep(1)
            res(self, 200, "json", json.dumps({"port": port}))
        else:
            res(self, 200, "json", json.dumps({"Info": "Nothing here to see"}))

    def do_GET(self):
        root = os.getcwd()
        print(f"Server on port {portNum}: GET ", self.path)
        filename = root + self.path
        if self.path.endswith("/"):
            filename += "/index.html"

        self.send_response(200)
        if filename[-4:] == ".css":
            self.send_header("Content-type", "text/css")
        elif filename[-5:] == ".json":
            self.send_header("Content-type", "application/javascript")
        elif filename[-3:] == ".js":
            self.send_header("Content-type", "application/javascript")
        elif filename[-4:] == ".ico":
            self.send_header("Content-type", "image/x-icon")
        else:
            self.send_header("Content-type", "text/html")
        self.end_headers()
        with open(filename, "rb") as fh:
            html = fh.read()
            self.wfile.write(html)


def startServer(port, maxCountValue):
    global maxPortNum, portNum
    maxPortNum = maxCountValue
    portNum = port
    print("Starting server on 0.0.0.0:" + str(port))
    with HTTPServer(("0.0.0.0", port), handler) as server:
        server.serve_forever()


def createServer(openBrowser, port=-1):
    if port < 0:
        if maxPortNum.value > 0:
            port = maxPortNum.value + 1
        else:
            port = 8000

    maxPortNum.value = max(maxPortNum.value, port)
    multiprocessing.Process(
        target=startServer,
        args=(
            port,
            maxPortNum,
        ),
    ).start()
    if openBrowser:
        print("Opening app in browser...")
        webbrowser.open("127.0.0.1:" + str(port))
    return port
