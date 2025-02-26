from fastapi import APIRouter, WebSocket, WebSocketDisconnect, logger
from PIL import Image
import io
import base64
from box_detector import ObjectDetector
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

websocket_router = APIRouter()
detector = ObjectDetector()

class WebSocketHandler:
    def __init__(self, detector: ObjectDetector):
        self.detector = detector

    async def __call__(self, websocket: WebSocket):
        logger.info(f"WebSocket connection attempt from {websocket.client}")
        await websocket.accept()
        logger.info(f"WebSocket connection accepted from {websocket.client}")
        try:
            while True:
                data = await websocket.receive_json()
                logger.info(f"Received data: {data.keys()}")
                image_b64 = data.get("image")
                if image_b64.startswith("data:"):
                    image_b64 = image_b64.split(",", 1)[1]
                    
                if not image_b64:
                    logger.warning("No image provided")
                    await websocket.send_json({"error": "No image provided"})
                    continue

                try:
                    image_bytes = base64.b64decode(image_b64)
                    pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
                    logger.info("Image decoded successfully")
                except Exception as e:
                    logger.error(f"Error decoding image: {str(e)}")
                    await websocket.send_json({"error": "Invalid image data"})
                    continue

                processed = self.detector.process_image(pil_image)
                detections = self.detector(processed)
                logger.info(f"Detections: {detections}")
                await websocket.send_json({"detections": detections})
        except WebSocketDisconnect:
            logger.info(f"WebSocket client {websocket.client} disconnected")
        except Exception as e:
            logger.error(f"WebSocket error: {str(e)}")

websocket_handler = WebSocketHandler(detector)

@websocket_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    logger.info("WebSocket endpoint called")
    await websocket_handler(websocket)
