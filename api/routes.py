from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
import io
from box_detector import ObjectDetector

router = APIRouter()
detector = ObjectDetector()

class RootHandler:
    def __call__(self):
        return {"message": "Box Detection Service"}

class InferenceHandler:
    def __init__(self, detector: ObjectDetector):
        self.detector = detector

    async def __call__(self, file: UploadFile = File(...)):
        try:
            image_bytes = await file.read()
            pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        processed_image = self.detector.process_image(pil_image)
        detections = self.detector(processed_image)
        return {"detections": detections}

root_handler = RootHandler()
inference_handler = InferenceHandler(detector)

@router.get("/")
def read_root():
    return root_handler()

@router.post("/inference")
async def inference(file: UploadFile = File(...)):
    return await inference_handler(file)
