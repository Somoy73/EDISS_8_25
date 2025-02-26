# Docker Development Setup with Watch Mode

This project uses Docker to containerize both the API (FastAPI) and the frontend (React) for development with hot-reloading.

## Development Setup with Docker Watch Mode

The development setup provides hot-reloading for both the API and frontend using Docker's watch mode:

```bash
# Build and start the development containers with watch mode
docker compose -f compose.dev.yml watch
```

This will:
- Build the API container with FastAPI in reload mode
- Build the frontend container with React in development mode (with hot reloading)
- Use Docker's watch mode to automatically sync file changes and rebuild when necessary

Access the application at:
- Frontend: http://localhost:3000
- API: http://localhost:8000

## WebSocket Testing

To test the WebSocket endpoints:
- `/ws` - Main WebSocket endpoint for object detection
- `/ws/image` - WebSocket endpoint for test image generation

You can use tools like Postman to test the WebSocket connections.

## Notes

- Docker's watch mode is used to automatically sync file changes between your local machine and the containers
- The frontend uses environment variables to connect to the API
- For the frontend, we're using WATCHPACK_POLLING and CHOKIDAR_USEPOLLING to ensure file changes are detected in Docker
- The API uses uvicorn with the `--reload` flag in development mode for hot reloading
