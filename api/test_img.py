import requests
import base64

with open("./test_img1.jpeg", "rb") as image_file:
    encoded_image = base64.b64encode(image_file.read()).decode("utf-8")

payload = {"image": encoded_image}

response = requests.post("http://127.0.0.1:8000/get_image", json=payload)

print(response.json())
