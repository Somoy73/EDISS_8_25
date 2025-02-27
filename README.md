# EDISS_8_25

Code Repository for EDISS Winter School Hackathon - 2025

## Getting Started

Just run a docker command to start our project.

```bash
docker compose up --build -d
```

## API routes

1. send an image via websocket with route `ws://localhost:8000/ws` in json format.

        Example: {"image": "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICA..."}
