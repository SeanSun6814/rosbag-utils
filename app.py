from threading import Thread
from time import sleep
import server
import webbrowser
thread = Thread(target = server.startServer)
thread.start()
print("Opening app in browser...")
webbrowser.open('127.0.0.1:8000')
thread.join()
print("thread finished...exiting")