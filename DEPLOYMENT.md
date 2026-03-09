# Deployment Guide

## Overview

Your portfolio website is ready for deployment with a cleanly separated frontend and Python backend.

## Local Development

### Prerequisites
- Node.js 18+
- Python 3.11+

### Setup

```bash
# Clone/navigate to project
cd portfolio-website

# Install frontend dependencies
npm install

# Set up Python backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### Run Locally

**Terminal 1 - Frontend:**
```bash
npm run start:frontend
# Opens on http://localhost:3000
```

**Terminal 2 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn app:app --reload --host 0.0.0.0 --port 4000
# Runs on http://localhost:4000
# Interactive API docs: http://localhost:4000/docs
```

## Production Deployment

### Option 1: Docker (Recommended)

**Build both images:**
```bash
# Build frontend
docker build -t portfolio-frontend frontend/

# Build backend
docker build -t portfolio-backend backend/
```

**Run with Docker Compose:**
```bash
docker-compose up
```

**Or run individually:**
```bash
# Backend
docker run -p 4000:4000 portfolio-backend

# Frontend (serves static files when built)
docker run -p 3000:3000 portfolio-frontend
```

### Option 2: Cloud Platforms (Heroku, Render, Railway, Vercel)

#### Heroku

1. **Prepare Procfile:**
   ```
   web: uvicorn app:app --host 0.0.0.0 --port $PORT
   ```

2. **Deploy:**
   ```bash
   heroku login
   heroku create your-app-name
   git push heroku main
   heroku config:set PYTHONUNBUFFERED=1
   ```

3. **Build frontend and view logs:**
   ```bash
   npm run build
   heroku logs --tail
   ```

#### Render/Railway/Fly.io

These platforms automatically detect Python/Node.js and deploy accordingly.

1. Push repository to GitHub
2. Connect repository to platform
3. Set environment variables if needed
4. Automatic deploys on push

### Option 3: VPS/Self-Hosted (Ubuntu/Debian)

1. **SSH into server:**
   ```bash
   ssh user@your-server.com
   ```

2. **Install dependencies:**
   ```bash
   sudo apt update
   sudo apt install python3.11 python3-pip nodejs npm nginx
   ```

3. **Clone and setup project:**
   ```bash
   git clone <your-repo> portfolio
   cd portfolio
   npm install
   npm run build
   
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

4. **Create systemd service for backend:**
   ```bash
   sudo nano /etc/systemd/system/portfolio.service
   ```
   
   Add:
   ```ini
   [Unit]
   Description=Portfolio Backend
   After=network.target

   [Service]
   User=www-data
   WorkingDirectory=/home/user/portfolio/backend
   Environment="PATH=/home/user/portfolio/backend/venv/bin"
   ExecStart=/home/user/portfolio/backend/venv/bin/uvicorn app:app --host 0.0.0.0 --port 4000 --workers 4
   Restart=always
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

5. **Enable and start service:**
   ```bash
   sudo systemctl enable portfolio
   sudo systemctl start portfolio
   ```

6. **Configure Nginx reverse proxy:**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       # Proxy API requests
       location /api/ {
           proxy_pass http://localhost:4000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }

       # Serve frontend static files
       location / {
           root /home/user/portfolio/frontend/dist;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

7. **Enable SSL (Let's Encrypt):**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Environment Variables

**Backend (.env file):**
```
FLASK_ENV=production
PORT=4000
```

**Frontend (vite.config.ts - already configured):**
- API proxy redirects `/api` to backend

## Monitoring & Maintenance

- **Check backend status:** `curl http://localhost:4000/api/projects`
- **View logs:** `docker logs <container-id>` or `journalctl -u portfolio -f`
- **Restart services:** `systemctl restart portfolio` or `docker-compose restart`

## Security

1. Enable HTTPS/TLS in production
2. Set Flask `debug=False` in production
3. Use environment variables for sensitive data
4. Regularly update dependencies: `pip install --upgrade -r requirements.txt`
5. Implement rate limiting if needed
6. Add database instead of in-memory storage for contact messages

## Custom Domain

1. Register domain with registrar
2. Point DNS to your server/platform
3. Update `CORS_ORIGINS` in `backend/app.py` if needed
4. Enable SSL certificate

## Scaling Considerations

- Add PostgreSQL/MongoDB for persistent storage
- Implement contact form email notifications
- Cache static assets with CDN
- Use load balancing for multiple backend instances
- Add authentication for admin endpoints

---

**Questions?** Check individual README files in `frontend/` and `backend/` directories.
