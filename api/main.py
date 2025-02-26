# from fastapi import FastAPI, WebSocket, WebSocketDisconnect
# import base64
# from PIL import Image
# from pydantic import BaseModel
# import io

# app = FastAPI()

# # ROOT ROUTE
# @app.get("/")
# def read_root():
#     return {"EDISS": "Hackathon 2025"}

# # Base64 encoded image string
# class ImageRequest(BaseModel):
#     image: str  

# """"
# Load the model here:
# try:
#     model = torch.hub.load('repo', 'name', pretrained=True)
#     # OR LOCAL MODEL
#     model.eval()
# except Exception as e:
#     raise RuntimeError("Failed to load object detection model") from e

# """

# # INFERENCE
# @app.websocket("/ws/inference")
# async def websocket_inference(websocket: WebSocket):
#     await websocket.accept()
#     try:
#         while True:
#             # Expect a JSON message with the base64 encoded image
#             data = await websocket.receive_json()
#             image_base64 = data.get("image")
#             if not image_base64:
#                 await websocket.send_json({"error": "No image provided"})
#                 continue

#             # Decode the image
#             try:
#                 image_data = base64.b64decode(image_base64)
#                 pil_image = Image.open(io.BytesIO(image_data)).convert("RGB")
#             except Exception as e:
#                 await websocket.send_json({"error": "Invalid image data"})
#                 continue

#             # Run inference 
#             try:
#                 # results = model(pil_image) # PASS IMAGE TO MODEL
#                 detections = "WAITING FOR MODEL"
#             except Exception as e:
#                 await websocket.send_json({"error": "Error during model inference"})
#                 continue

#             # Send back the detections as JSON
#             await websocket.send_json({"detections": detections})
#     except WebSocketDisconnect:
#         print("Client disconnected")


from fastapi import FastAPI
from routes import router as http_router
from websocket_server import websocket_router

app = FastAPI()
app.include_router(http_router)
app.include_router(websocket_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
