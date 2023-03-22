from websocket_server import WebsocketServer
from threading import Thread
from server.apis import processWebsocketRequest
import json
import time
import uuid

websocketServer = None
seenIds = set()


def sendTooManyConnectionsMessage(num_clients):
    if num_clients > 1:
        print("Too many clients. Suspending app...")
        sendMessage(
            {
                "type": "ws_info",
                "message": "TOO_MANY_CONNECTIONS",
                "num_clients": num_clients,
            }
        )
    elif num_clients == 1:
        print("Resuming app...")
        sendMessage({"type": "ws_info", "message": "TOO_MANY_CONNECTIONS_RESOLVED"})


def sendMessage(jsonObj):
    try:
        jsonObj["response_id"] = str(uuid.uuid4())
        if not websocketServer:
            return
        websocketServer.send_message_to_all(json.dumps(jsonObj))
    except Exception as e:
        print("Error sending message: ", e)


def newClient(client, obj2):
    print("WS_CONNECTED, num_clients: ", len(websocketServer.clients))
    sendTooManyConnectionsMessage(len(websocketServer.clients))


def clientLeft(obj1, obj2):
    print("WS_DISCONNECTED, num_clients: ", len(websocketServer.clients) - 1)
    sendTooManyConnectionsMessage(len(websocketServer.clients) - 1)


def messageReceived(client, server, message):
    data = json.loads(message)
    uuid = data["id"]
    print(uuid)
    if uuid in seenIds:
        return print("Duplicate request: ", uuid, ", ignoring...")
    seenIds.add(uuid)
    processWebsocketRequest(data, sendMessage)


def startServer(port):
    global websocketServer
    print("Starting websockets server on 127.0.0.1:" + str(port))
    websocketServer = WebsocketServer(host="127.0.0.1", port=port)
    websocketServer.set_fn_new_client(newClient)
    websocketServer.set_fn_client_left(clientLeft)
    websocketServer.set_fn_message_received(messageReceived)
    websocketServer.allow_new_connections()
    websocketServer.run_forever()
