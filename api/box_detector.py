from PIL import Image
import numpy as np
import cv2 # Based on our 
# import torch

class ObjectDetector:
    def __init__(self, model_name=None):
        # load  model here
        # Select device: GPU if available, else CPU
        # self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        # Load the model from torch.hub and move it to the selected device
        # self.model = torch.hub.load('ultralytics/yolov5', model_name, pretrained=True).to(self.device) # Load our Model
        
        # self.model.eval()  # Set model to evaluation mode
        pass

    def process_image(self, pil_image: Image.Image):
        
        # Waiting for our step
        """
        Convert a PIL image to a normalized NumPy array.
        Resize the image to 640x480.
        """
        image_array = np.array(pil_image)
        resized = cv2.resize(image_array, (640, 480))
        normalized = resized.astype("float32") / 255.0
        return normalized

    def __call__(self, processed_image):
        """
        Run object detection on the processed image.
        Replace the dummy detections below with our actual model inference.
        """
        detections = [
            {"label": "object1", "confidence": 0.9, "box": [50, 50, 150, 150]},
            {"label": "object2", "confidence": 0.8, "box": [200, 100, 300, 300]}
        ]
        return detections
