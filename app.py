from multiprocessing import active_children
from server import server
from server import ws_server
import argparse
import time

parser = argparse.ArgumentParser(description="Rosbag Utils")
parser.add_argument("-n", "--no_browser", action="store_true", help="Don't open browser by default.")
args = parser.parse_args()
server.startServer(not args.no_browser, 8000)
ws_server.startServer(8001)
