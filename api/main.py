from fastapi import FastAPI
from routes import router as http_router
from websocket_server import websocket_router

app = FastAPI()
app.include_router(http_router)
app.include_router(websocket_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
