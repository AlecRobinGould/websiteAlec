# Backend for Portfolio Website

A lightweight, async Python FastAPI backend for the portfolio website with automatic API documentation.

## Setup

### 1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install dependencies:
```bash
pip install -r requirements.txt
```

### 3. Run the development server:
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 4000
```

The server will start on `http://localhost:4000`

**Interactive API docs:** Visit `http://localhost:4000/docs` for Swagger UI

## API Endpoints

All endpoints return JSON and support CORS for cross-origin requests:

- **`GET /api/projects`** – Returns all portfolio projects
- **`POST /api/convert/celsius`** – Converts Fahrenheit to Celsius  
  Request body: `{ "fahrenheit": number }`  
  Response: `{ "celsius": number }`

- **`POST /api/contact`** – Submits a contact form  
  Request body: `{ "name": string, "email": string, "message": string }`  
  Response: `{ "status": "received" }`

- **`GET /api/contact`** – Retrieves all contact messages (admin endpoint)

- **`GET /health`** – Health check endpoint for monitoring

## Frontend Integration

The frontend development server (Vite on port 3000) is configured to proxy `/api/*` requests to this backend on port 4000.

**Vite proxy configuration (frontend/vite.config.ts):**
```typescript
proxy: {
  '/api': 'http://localhost:4000'
}
```

## Production Deployment

### Using Docker:
```bash
docker build -t portfolio-backend .
docker run -p 4000:4000 -e PORT=4000 portfolio-backend
```

### Using Uvicorn directly:
```bash
uvicorn app:app --host 0.0.0.0 --port 4000 --workers 4
```

### Using Docker Compose:
```bash
docker-compose up backend
```

## Environment Variables

Create a `.env` file (or set in deployment platform):

```
PORT=4000
```

## CORS Configuration

**Current:** Allow all origins (`allow_origins=["*"]`)

**For production**, update `app.py` to restrict to your domain:
```python
allow_origins=["https://yourdomain.com"],
```

## Notes

- **Automatic validation:** Pydantic models validate all request data
- **Async/await:** FastAPI supports async operations for better concurrency
- **API docs:** Auto-generated Swagger UI available at `/docs`
- **In-memory storage:** Contact messages stored in memory; add database for persistence
- **Static files:** Backend serves frontend build in production

## Extending the API

Add new endpoints following FastAPI syntax:

```python
from fastapi import FastAPI

@app.get("/api/custom-endpoint")
async def custom_function():
    return {"data": "value"}
```

For documentation, visit [FastAPI docs](https://fastapi.tiangolo.com/)
