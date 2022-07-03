from http.server import BaseHTTPRequestHandler, HTTPServer
import bag
import urllib
from urllib.parse import urlparse, parse_qs
import json
import os
from socketserver import ThreadingMixIn
import threading


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        def res(this, code, type, msg):
            this.send_response(code)
            this.send_header(
                "Content-Type", "application/json" if type == "json" else "text/html"
            )
            this.end_headers()
            this.wfile.write(bytes(msg, "utf8"))

        print("Request processed on thread: " + threading.currentThread().getName())

        if self.path == "/":
            with open("./index.html", "r") as html_file:
                msg = html_file.read()
                res(self, 200, "html", msg)

        elif self.path.startswith("/bagInfo"):
            path = parse_qs(urlparse(self.path).query)["path"][0]
            print("path is: " + path)
            try:
                msg = bag.getBagInfoJson(path)
                res(self, 200, "json", msg)
            except Exception as e:
                res(self, 500, "html", str(e))
                print(e)

        elif self.path.startswith("/selectBag"):
            print(
                "req = "
                + str(bag.selectBagDialogRequest.isSet())
                + "   finish = "
                + str(bag.selectBagDialogFinish.isSet())
            )
            if bag.selectBagDialogRequest.isSet():
                res(
                    self,
                    200,
                    "json",
                    json.dumps("Another file select window already opened."),
                )
            else:
                bag.selectBagDialogFinish.clear()
                bag.selectBagDialogRequest.set()
                bag.selectBagDialogFinish.wait()
                file_names = bag.selectBagMsg
                res(self, 200, "json", json.dumps(file_names))

        elif self.path.startswith("/findMoveStart"):
            path = parse_qs(urlparse(self.path).query)["path"][0]
            topic = parse_qs(urlparse(self.path).query)["topic"][0]
            result = bag.getFirstMoveTime(path, topic)
            res(self, 200, "json", json.dumps(result))

        else:
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
                # html = bytes(html, 'utf8')
                self.wfile.write(html)


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Handle requests in a separate thread."""


def startServer():
    print("Starting server on 127.0.0.1:8080")
    with ThreadedHTTPServer(("127.0.0.1", 8000), handler) as server:
        server.serve_forever()
