from http.server import BaseHTTPRequestHandler, HTTPServer
from cgi import parse_header, parse_multipart
import bag
import urllib
from urllib.parse import urlparse, parse_qs
import json
import os
import tkinter as tk
from tkinter import filedialog


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
            this.send_header(
                "Content-Type", "application/json" if type == "json" else "text/html"
            )
            this.end_headers()
            this.wfile.write(bytes(msg, "utf8"))

        data = self.parse_POST()
        # print("Received data: " + str(data))

        if self.path.startswith("/bagInfo"):
            path = data[b"path"][0].decode("utf-8")
            print("REQUEST bagInfo info for path: " + path)
            try:
                msg = bag.getBagInfoJson(path)
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
            result = bag.getFirstMoveTime(path, topic)
            res(self, 200, "json", json.dumps(result))

        elif self.path.startswith("/exportBag"):
            print("REQUEST exportBag")
            pathIn = data[b"pathIn"][0].decode("utf-8")
            pathOut = data[b"pathOut"][0].decode("utf-8")
            topics = data[b"topics"][0].decode("utf-8")
            startTime = data[b"startTime"][0].decode("utf-8")
            trajectoryTopic = data[b"trajectoryTopic"][0].decode("utf-8")
            result = bag.exportBag(pathIn, pathOut, topics, startTime, trajectoryTopic)
            res(self, 200, "json", json.dumps(result))

        elif self.path.startswith("/saveFile"):
            print("REQUEST saveFile")
            path = data[b"path"][0].decode("utf-8")
            text = data[b"text"][0].decode("utf-8")
            f = open(path, "w")
            f.write(text)
            f.close()
            res(self, 200, "json", json.dumps("Done!"))

    def do_GET(self):
        root = os.getcwd()
        # print(self.path)
        if self.path == "/":
            filename = root + "/index.html"
        else:
            filename = root + self.path

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


def startServer():
    print("Starting server on 127.0.0.1:8080")
    with HTTPServer(("127.0.0.1", 8000), handler) as server:
        server.serve_forever()
