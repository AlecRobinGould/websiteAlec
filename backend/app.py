from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr
from datetime import datetime
import os
from pathlib import Path

app = FastAPI(
    title="Portfolio API",
    description="Backend API for portfolio website",
    version="1.0.0"
)

# Configure CORS - allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for contact messages
contact_messages = []

# Portfolio projects data
projects = [
        {
    "id": 1,
    "title": 'Vacuum sensor tester',
    "description": 'An embedded system project that automates, expidites, and improves testing of vacuum sensors on a production scale.',
    "image": 'https://github.com/user-attachments/assets/04c04bde-962a-416b-8f3e-f8e5558cdaf3',
    "techStack": ['Python', 'C/C++', 'Autodesk Fusion', 'PlatformIO'],
    "githubUrl": 'https://github.com/AlecRobinGould/Pressure-sensor-GUI-app',
    "liveUrl": 'https://github.com/AlecRobinGould/Pressure-sensor-GUI-app/releases',
    },
    {
    "id": 2,
    "title": 'Helium Purge Jig',
    "description": 'Embedded system project to automate, expedite and improved the purging of helium equipment on a production scale.',
    "image": 'https://github.com/user-attachments/assets/5a16a5ad-afd4-4100-b59c-ec4df42066d4',
    "techStack": ['Python', 'C/C++', 'Bash', 'Ubuntu', 'Raspberry Pi', 'Multi-core processing'],
    "githubUrl": 'https://github.com/AlecRobinGould/purgeJigPii',
    "liveUrl": 'https://github.com/user-attachments/files/25684922/Conference.style.paper.purge.jig.pdf',
    },
    {
    "id": 3,
    "title": 'Dynamic QR codes',
    "description": 'A self-hosted website to generate and store dynamic QR codes.',
    "image": 'https://github.com/AlecRobinGould/AntennasQRcodes/assets/95220293/0d21113d-6da1-42b5-a5d2-a89590468e24',
    "techStack": ['JavaScript', 'PHP', 'CSS', 'HTML', 'MySQL'],
    "githubUrl": 'https://github.com/AlecRobinGould/AntennasQRcodes',
    "liveUrl": 'http://qr.emss.co.za:8213/',
    },
    {
    "id": 4,
    "title": 'Additive Manufacturing of Antennas',
    "description": 'A process to resin print (SLA), and metalize the surface of an antenna.',
    "image": 'https://github.com/user-attachments/assets/bd33c01d-919a-42af-a2ee-38e0898938bb',
    "techStack": ['Ansys HFSS', 'Autodesk Fusion 360', 'Python', 'ChituBox', 'Electroless Plating'],
    "githubUrl": 'https://github.com/AlecRobinGould/Honours-public',
    "liveUrl": 'https://github.com/AlecRobinGould/Honours-public/blob/main/Additive%20Manufacturing%20in%20Ka-band%20Antenna%20Engineering.pdf',
    },
    {
    "id": 5,
    "title": 'RSC Integration Automation',
    "description": 'SaaP developed to automate a tedious process of integrating software/updates.',
    "image": 'https://github.com/EMSS-Antennas/RSC-S-band-Intergration-Automation-Public/assets/95220293/bb226040-a19f-42ee-a4ea-45c2a11495ad',
    "techStack": ['python', 'Bash', 'Linux', 'Networking', 'SaaP'],
    "githubUrl": 'https://github.com/EMSS-Antennas/RSC-S-band-Intergration-Automation-Public',
    "liveUrl": 'https://github.com/EMSS-Antennas/RSC-S-band-Intergration-Automation-Public/assets/95220293/5b8887be-2d01-4ffa-b22c-54c3176d1a86',
    },
    {
    "id": 6,
    "title": 'S-Parameter Viewer',
    "description": 'Application developed to visualize and obtain metrics such as average attenuation, etc.',
    "image": 'https://github.com/AlecRobinGould/Scattering-parameter-viewer/assets/95220293/85676b08-cc6e-496e-b5ac-db740fb02091',
    "techStack": ['python', 'VNA', 'RF measurements', 'SaaP'],
    "githubUrl": 'https://github.com/EMSS-Antennas/Scattering-parameter-viewer',
    "liveUrl": 'https://github.com/EMSS-Antennas/Scattering-parameter-viewer/releases/tag/V1.1',
    }
] 

# Pydantic models for request/response validation
class ConversionRequest(BaseModel):
    fahrenheit: float

class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactResponse(BaseModel):
    status: str

# API Routes

@app.get("/api/projects")
async def get_projects():
    """Get all portfolio projects"""
    return projects

@app.post("/api/convert/celsius")
async def convert_celsius(request: ConversionRequest):
    """Convert Fahrenheit to Celsius"""
    try:
        celsius = (request.fahrenheit - 32) * 5 / 9
        return {"celsius": round(celsius, 2)}
    except (ValueError, TypeError):
        raise HTTPException(status_code=400, detail="fahrenheit must be a valid number")

@app.post("/api/contact", response_model=ContactResponse)
async def handle_contact(request: ContactFormRequest):
    """Handle contact form submissions"""
    message = {
        "name": request.name,
        "email": request.email,
        "message": request.message,
        "date": datetime.utcnow().isoformat()
    }
    contact_messages.append(message)
    print(f"Received contact: {message}")
    return {"status": "received"}

@app.get("/api/contact")
async def get_contacts():
    """Retrieve all contact messages (admin endpoint)"""
    return contact_messages

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "ok"}

# Serve frontend static files in production
frontend_dist = Path(__file__).parent.parent / "frontend" / "dist"

if frontend_dist.exists():
    app.mount("/assets", StaticFiles(directory=frontend_dist / "assets"), name="assets")

@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    """Serve frontend build or fallback to index.html for SPA routing"""
    file_path = frontend_dist / full_path
    
    # If it's a file that exists, serve it
    if file_path.is_file():
        return FileResponse(file_path)
    
    # Otherwise, serve index.html for SPA routing
    index_path = frontend_dist / "index.html"
    if index_path.exists():
        return FileResponse(index_path)
    
    # Frontend not built yet
    raise HTTPException(
        status_code=404,
        detail="Frontend not found. Build with 'npm run build:frontend' first."
    )

@app.get("/")
async def root():
    """Root endpoint - serve index.html for SPA"""
    index_path = frontend_dist / "index.html"
    if index_path.exists():
        return FileResponse(index_path)
    return {"message": "Portfolio API - Frontend not yet built"}
