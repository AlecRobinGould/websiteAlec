# Portfolio Website

A modern, responsive portfolio website with a React/Vite frontend and FastAPI backend.

## Project Structure

```
.
├── frontend/          # React + Vite + TypeScript (Emotion styling)
│   ├── src/
│   │   ├── App.tsx              # Main app component with ThemeProvider
│   │   ├── main.tsx             # React entry point
│   │   ├── components/
│   │   │   ├── layout/          # Layout wrapper with nav/footer
│   │   │   └── sections/        # Hero, Projects, Skills, Contact sections
│   │   ├── styles/              # Theme, global styles
│   │   └── hooks/               # useKeyboardNavigation
│   ├── vite.config.ts           # Vite config with /api proxy to backend
│   └── package.json
│
├── backend/           # Python + FastAPI + Uvicorn
│   ├── app.py                   # FastAPI application
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example             # Environment variables template
│   ├── Dockerfile              # Docker image for backend
│   └── README.md               # Backend documentation
│
├── docker-compose.yml # Run both services locally
├── DEPLOYMENT.md      # Detailed deployment guide
├── package.json       # Root frontend scripts
└── README.md          # This file
```

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+

### Full Stack (Development)

**1. Install dependencies:**
```bash
# Frontend
npm install

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

**2. Start frontend (Terminal 1):**
```bash
npm run start:frontend
# Runs on http://localhost:3000
```

**3. Start backend (Terminal 2):**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn app:app --reload --host 0.0.0.0 --port 4000
# Runs on http://localhost:4000
# API docs at http://localhost:4000/docs
```

**4. Visit `http://localhost:3000`**

### Frontend Only (Static Build)

```bash
npm install
npm run build:frontend
# Opens frontend/dist/index.html in browser
```

## API Endpoints

All endpoints accessible at `http://localhost:4000/api`:

- `GET /api/projects` – Portfolio projects
- `POST /api/convert/celsius` – Temperature conversion  
  Body: `{ "fahrenheit": number }`
- `POST /api/contact` – Contact form submission  
  Body: `{ "name": string, "email": string, "message": string }`
- `GET /api/contact` – Retrieve all messages (admin)
- `GET /health` – Health check

**Interactive API docs:** `http://localhost:4000/docs` (Swagger UI)

## Building for Production

```bash
npm run build:frontend
```

The built frontend will be served by the FastAPI backend.

## Deployment

### Docker Compose (Fastest)

```bash
docker-compose up
# Frontend: http://localhost:3000
# Backend: http://localhost:4000
```

### Docker Individual Services

**Backend:**
```bash
docker build -t portfolio-backend backend/
docker run -p 4000:4000 portfolio-backend
```

**Frontend:**
```bash
docker build -t portfolio-frontend frontend/
docker run -p 3000:3000 portfolio-frontend
```

### Cloud Platforms

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guides:
- Heroku
- Render
- Railway  
- Fly.io
- Self-hosted VPS (Ubuntu/Debian with Nginx)

### Manual Deployment

1. Build frontend: `npm run build:frontend`
2. Deploy backend Python app to server
3. Backend automatically serves frontend build

## Tech Stack

**Frontend:**
- React 18.3 with TypeScript
- Vite 5.2 (build tool)
- Emotion & styled-components (CSS-in-JS)
- Framer Motion (animations)
- React Icons (icon library)
- Axios (HTTP client)

**Backend:**
- FastAPI 0.104 (modern async Python)
- Uvicorn (ASGI server)
- Pydantic (request validation)
- CORS enabled for frontend

## Customization

### Add Projects
Edit `backend/app.py` – modify the `projects` list

### Update Contact Form
Edit `frontend/src/components/sections/Contact.tsx` 

### Theme & Styling
Theme colors: `frontend/src/styles/theme.ts`

### API Configuration
CORS settings: `backend/app.py` (line ~20)

## Development

- Frontend changes: automatic hot-reload on port 3000
- Backend changes: use `--reload` flag with uvicorn
- API proxy: frontend proxies `/api/*` to `http://localhost:4000`

## Production Notes

- Backend serves frontend static files automatically
- Contact messages stored in memory (add database for persistence)
- Enable HTTPS/TLS when deploying
- Restrict CORS origins to your domain
- Use environment variables for sensitive data

## Next Steps

1. **Update project data** in `backend/app.py`
2. **Deploy** using Docker or cloud platform (see [DEPLOYMENT.md](DEPLOYMENT.md))
3. **Add database** for persistent contact messages
4. **Configure custom domain** with SSL certificate
5. **Set up monitoring** for production
