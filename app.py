from threading import Thread
from time import sleep
import server
import webbrowser
import argparse
from multiprocessing import Process

parser = argparse.ArgumentParser(description="Rosbag Utils")
parser.add_argument("-n", "--no_browser", action='store_true', help="Don't open browser by default.")
parser.add_argument("-p", "--ports", nargs="*", default=[8000], help="Start multiple servers at different ports.")
args = parser.parse_args()

try:
    processes = []
    for port in args.ports:
        process = Process(target=server.startServer, args=(port,))
        processes.append(process)
        process.start()
        if (not args.no_browser):
            print("Opening app in browser...")
            webbrowser.open('127.0.0.1:' + str(port))

    for process in processes:
        process.join()
    print("All servers shutdown. Exiting...")

except KeyboardInterrupt:
    print('Shutting down servers...')
    for process in processes:
        process.terminate()
    print("All servers shutdown. Exiting...")