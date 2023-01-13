from websocket_server import WebsocketServer
from threading import Thread
from server.apis import processWebsocketRequest
import json
import time

websockets_server = None


def sendMessage(jsonObj):
    if not websockets_server:
        return
    websockets_server.send_message_to_all(json.dumps(jsonObj))


def newClient(client, obj2):
    print("WS_CONNECTED")
    websockets_server.deny_new_connections()


def clientLeft(obj1, obj2):
    print("WS_DISCONNECTED")
    websockets_server.allow_new_connections()


def messageReceived(client, server, message):
    print("RECEIVED:", message)
    processWebsocketRequest(json.loads(message), sendMessage)


def startServer(port):
    def createServer():
        global websockets_server
        print("Starting websockets server on 127.0.0.1:" + str(port))
        websockets_server = WebsocketServer(host="127.0.0.1", port=port)
        websockets_server.set_fn_new_client(newClient)
        websockets_server.set_fn_client_left(clientLeft)
        websockets_server.set_fn_message_received(messageReceived)
        websockets_server.allow_new_connections()
        websockets_server.run_forever()

    # def sendMsg():
    #     while True:
    #         time.sleep(1)
    #         sendMessage({"test": "test"})

    createServer()
    # Thread(target=createServer).start()
    # Thread(target=sendMsg).start()
