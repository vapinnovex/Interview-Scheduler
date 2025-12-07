import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

# Database
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ai_interview_system")

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-minimum-32-characters-long")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# API URLs
ADMIN_FRONTEND_URL = os.getenv("ADMIN_FRONTEND_URL", "http://localhost:3000")
CANDIDATE_FRONTEND_URL = os.getenv("CANDIDATE_FRONTEND_URL", "http://localhost:3001")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")

# OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

# Email Service
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY", "")
RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@example.com")

# Storage
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads/resumes")

# Redis
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

# Ensure upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)
