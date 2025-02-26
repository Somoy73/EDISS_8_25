import base64
import json
import websocket

def on_message(ws, message):
    print("Received:", message)

def on_error(ws, error):
    print("Error:", error)

def on_close(ws, close_status_code, close_msg):
    print("Connection closed.")

def on_open(ws):
    # Read and encode your image file (change the filename as needed)
    with open("./test_img1.jpeg", "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode("utf-8")
    
    # Prepare the JSON payload with the base64-encoded image
    payload = json.dumps({"image": encoded_image})
    ws.send(payload)
    print("Sent image for inference.")

if __name__ == "__main__":
    websocket.enableTrace(True)
    # Correct WebSocket endpoint URL:
    ws_url = "ws://127.0.0.1:8000/ws/inference"
    ws = websocket.WebSocketApp(ws_url,
                                on_open=on_open,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    ws.run_forever()
