from ultralytics import YOLO
import numpy as np
from PIL import Image

class ObjectDetector:
    def __init__(self, model_path="best.pt"):
        # Load the YOLO model
        self.model = YOLO(model_path)

    def __call__(self, image):
        """
        Run object detection on the image.
        The image can be a PIL Image, a NumPy array, or a file path.
        YOLO will handle resizing and normalization internally.
        """
        # If the image is a PIL Image, convert it to a NumPy array
        if isinstance(image, Image.Image):
            image = np.array(image)
        
        # Run inference (wrap the image in a list for batched inference)
        results = self.model([image])
        detections = []

        # Extract detection results from the first result in the batch
        if results and results[0].boxes is not None:
            boxes = results[0].boxes
            for i in range(len(boxes.xyxy)):
                coords = boxes.xyxy[i].tolist()  # [x1, y1, x2, y2]
                conf = float(boxes.conf[i])
                cls = int(boxes.cls[i])
                detection = {
                    "label": str(cls),   # Replace with actual label mapping if needed
                    "confidence": conf,
                    "box": coords
                }
                detections.append(detection)
            
            # Optionally, you can display or save the result image:
            results[0].show()
            results[0].save(filename="result.jpg")
        
        return detections
