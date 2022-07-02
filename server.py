from http.server import BaseHTTPRequestHandler, HTTPServer
import bag
import urllib
from urllib.parse import urlparse, parse_qs
import tkinter as tk
from tkinter import filedialog
import json


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        def res(this, code, type, msg):
            this.send_response(code)
            this.send_header(
                "Content-Type", "application/json" if type == "json" else "text/html"
            )
            this.end_headers()
            this.wfile.write(bytes(msg, "utf8"))

        if self.path == "/":
            with open("./index.html", "r") as html_file:
                msg = html_file.read()
                res(self, 200, "html", msg)
        elif self.path == "/lib/swal/sweetalert2.all.min.js":
            with open("./lib/swal/sweetalert2.all.min.js", "r") as html_file:
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
            root = tk.Tk()
            root.withdraw()
            msg = tk.filedialog.askopenfiles()
            file_names = [file.name for file in msg]
            print(file_names)
            res(self, 200, "json", json.dumps(file_names))
        else:
            res(self, 404, "html", "<h1>404 Not found</h1>")


def startServer():
    print("Starting server on 127.0.0.1:8080")
    with HTTPServer(("127.0.0.1", 8000), handler) as server:
        server.serve_forever()
