from fastapi import APIRouter, WebSocket, WebSocketDisconnect, logger
from PIL import Image, ImageDraw
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
                image_b64 = data["data"]
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

                detections = self.detector(pil_image)
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

@websocket_router.websocket("/ws/image")
async def image_websocket_endpoint(websocket: WebSocket):
    logger.info("Image WebSocket endpoint called")
    await websocket.accept()
    try:
        while True:
            # Receive any message from frontend to trigger image generation
            await websocket.receive_text()
            logger.info("Received request for test image")
            
            try:
                # Generate a test image
                width, height = 300, 200
                image = Image.new('RGB', (width, height), color='white')
                # Draw something on it to make it unique
                draw = ImageDraw.Draw(image)
                draw.rectangle(
                    [(50, 50), (width-50, height-50)],
                    outline='blue',
                    width=5
                )
                draw.text((100, 80), "Test Image", fill="red")
                logger.info("Created test image")
                
                # Convert image to base64
                buffer = io.BytesIO()
                image.save(buffer, format="JPEG")
                img_str = base64.b64encode(buffer.getvalue()).decode('utf-8')
                
                # Send the image back to frontend
                await websocket.send_json({"image": f"data:image/jpeg;base64,{img_str}"})
            except Exception as e:
                logger.error(f"Error generating test image: {str(e)}")
                await websocket.send_json({"error": str(e)})
    except WebSocketDisconnect:
        logger.info(f"Image WebSocket client {websocket.client} disconnected")
    except Exception as e:
        logger.error(f"Image WebSocket error: {str(e)}")
