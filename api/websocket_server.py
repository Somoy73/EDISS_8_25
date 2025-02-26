from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from PIL import Image
import io
import base64
from box_detector import ObjectDetector

websocket_router = APIRouter()
detector = ObjectDetector()

class WebSocketHandler:
    def __init__(self, detector: ObjectDetector):
        self.detector = detector

    async def __call__(self, websocket: WebSocket):
        await websocket.accept()
        try:
            while True:
                data = await websocket.receive_json()
                image_b64 = data.get("image")
                if image_b64.startswith("data:"):
                    image_b64 = image_b64.split(",", 1)[1]
                    
                if not image_b64:
                    await websocket.send_json({"error": "No image provided"})
                    continue

                try:
                    image_bytes = base64.b64decode(image_b64)
                    pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
                except Exception:
                    await websocket.send_json({"error": "Invalid image data"})
                    continue

                processed = self.detector.process_image(pil_image)
                detections = self.detector(processed)
                await websocket.send_json({"detections": detections})
        except WebSocketDisconnect:
            print("WebSocket client disconnected")

websocket_handler = WebSocketHandler(detector)

@websocket_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket_handler(websocket)
