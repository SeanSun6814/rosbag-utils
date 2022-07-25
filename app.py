from threading import Thread
from time import sleep
import server
import webbrowser
thread = Thread(target = server.startServer)
thread.start()
print("Opening app in browser...")
thread.join()
print("thread finished...exiting")