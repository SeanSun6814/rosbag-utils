from multiprocessing import active_children
import server
import argparse
import time

parser = argparse.ArgumentParser(description="Rosbag Utils")
parser.add_argument(
    "-n", "--no_browser", action="store_true", help="Don't open browser by default."
)
parser.add_argument(
    "-p",
    "--ports",
    nargs="*",
    default=[8000],
    help="Start multiple servers at different ports.",
)
args = parser.parse_args()

if args.ports == []:
    args.ports = [8000]

for port in args.ports:
    server.createServer(not args.no_browser, int(port))
