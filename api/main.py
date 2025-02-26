from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import base64
from PIL import Image
import io

app = FastAPI()

@app.get("/")
def read_root():
    return {"EDISS": "Hackathon 2025"}

class ImageRequest(BaseModel):
    image: str  # Base64 encoded image string

@app.post("/get_image")
def image_processing(request: ImageRequest):
    # Attempt to decode and open the image
    try:
        # Decode the base64 string to binary image data
        image_data = base64.b64decode(request.image)
        image = Image.open(io.BytesIO(image_data))
    except Exception as e:
        # Return a 400 error if decoding fails or image cannot be opened
        raise HTTPException(status_code=400, detail="Invalid image data") from e

    # Process the image: convert it to grayscale
    try:
        processed_image = image.convert("L")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing image") from e

    # Save the processed image to an in-memory bytes buffer in PNG format
    buffered = io.BytesIO()
    try:
        processed_image.save(buffered, format="PNG")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error saving processed image") from e

    buffered.seek(0)
    
    # Encode the processed image back to base64 for response
    processed_image_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
    
    return {"processed_image": processed_image_base64}
