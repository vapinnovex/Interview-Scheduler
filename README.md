# AI Interview System - Complete Development Guide

## 📋 Project Overview

An end-to-end AI-powered interview platform with two modes:
- **Fully AI-based Interview**: AI agent conducts the entire technical interview
- **AI-assisted Interview**: Human interviewer with real-time AI assistance

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose (recommended)
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)
- MongoDB 7.0+ (if not using Docker)

### Option 1: Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone <repo-url>
cd Interview-Scheduler

# Copy environment variables
cp .env.example .env

# Start all services
docker-compose up --build

# Services will be available at:
# - Admin Frontend: http://localhost:3000
# - Candidate Frontend: http://localhost:3001
# - Backend API: http://localhost:8000
# - API Docs: http://localhost:8000/docs
# - MongoDB: localhost:27017
# - Redis: localhost:6379
```

### Option 2: Local Development Setup

#### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy env file
cp ../.env.example .env

# Run server
uvicorn app.main:app --reload
```

#### Admin Frontend Setup
```bash
cd admin-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Runs on http://localhost:3000
```

#### Candidate Frontend Setup
```bash
cd candidate-frontend

# Install dependencies
npm install

# Start development server
npm run dev -- --port 3001

# Runs on http://localhost:3001
```

#### Interview Analysis Module
```bash
cd interview-analysis

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

## 📁 Project Structure

```
Interview-Scheduler/
├── admin-frontend/              # React Admin Dashboard
│   ├── src/
│   │   ├── components/
│   │   ├── pages/              # Login, Dashboard
│   │   ├── store/              # Zustand auth store
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── candidate-frontend/          # React Candidate Portal
│   ├── src/
│   │   ├── components/
│   │   ├── pages/              # Home (Interview ID Entry)
│   │   ├── store/              # Zustand interview store
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── backend/                     # FastAPI Backend
│   ├── app/
│   │   ├── api/                # Route modules
│   │   │   ├── auth.py
│   │   │   ├── candidates.py
│   │   │   ├── interviews.py
│   │   │   └── reports.py
│   │   ├── core/               # Core configurations
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   ├── models/             # Pydantic models
│   │   │   ├── user.py
│   │   │   ├── candidate.py
│   │   │   ├── interview.py
│   │   │   ├── transcript.py
│   │   │   └── report.py
│   │   ├── services/           # Business logic
│   │   │   ├── resume_parser.py
│   │   │   ├── email_service.py
│   │   │   ├── ai_interviewer.py
│   │   │   ├── transcription.py
│   │   │   └── tts_service.py
│   │   ├── sockets/            # WebSocket handlers
│   │   │   ├── websocket.py
│   │   │   └── events.py
│   │   ├── utils/              # Helper functions
│   │   │   └── helpers.py
│   │   └── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .gitignore
│
├── interview-analysis/         # Python Analysis Module
│   ├── src/
│   │   ├── analyzers/
│   │   │   ├── performance_analyzer.py
│   │   │   ├── qa_extractor.py
│   │   │   └── report_generator.py
│   │   ├── models/
│   │   │   └── report_schema.py
│   │   └── utils/
│   │       ├── scoring.py
│   │       └── evaluation.py
│   ├── requirements.txt
│   └── .gitignore
│
├── docker-compose.yml          # Docker orchestration
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

---

## 🗄️ Database Schema

### Users Collection
```json
{
  "_id": ObjectId,
  "email": "admin@example.com",
  "password_hash": "bcrypt_hash",
  "full_name": "Admin User",
  "role": "admin",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Candidates Collection
```json
{
  "_id": ObjectId,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "resume_url": "s3://bucket/resume.pdf",
  "skills": ["Python", "JavaScript", "React"],
  "experience": "5 years",
  "education": "B.Tech Computer Science",
  "projects": [...],
  "achievements": [...],
  "parsed_data": {...},
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Interviews Collection
```json
{
  "_id": ObjectId,
  "interview_id": "ABC12345",
  "candidate_id": ObjectId,
  "admin_id": ObjectId,
  "job_description": "Senior Software Engineer",
  "interview_type": "ai_based",
  "status": "scheduled",
  "scheduled_at": "2024-01-15T10:00:00Z",
  "expiry_date": "2024-01-20T23:59:59Z",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Transcripts Collection
```json
{
  "_id": ObjectId,
  "interview_id": "ABC12345",
  "speaker": "ai",
  "text": "Tell me about your experience with React",
  "timestamp": "2024-01-15T10:05:00Z",
  "sequence": 1
}
```

### Reports Collection
```json
{
  "_id": ObjectId,
  "interview_id": "ABC12345",
  "qa_mapping": [...],
  "performance_score": 82.5,
  "strengths": ["Problem solving", "Communication"],
  "weaknesses": ["System design"],
  "technical_assessment": {
    "coding_skills": 85,
    "problem_solving": 80,
    "communication": 90,
    "technical_knowledge": 75
  },
  "recommendation": "hire",
  "detailed_analysis": "...",
  "generated_at": "2024-01-15T11:00:00Z"
}
```

---

## 🔑 Environment Variables

See `.env.example` for all available variables:

```
MONGODB_URL              # MongoDB connection string
DATABASE_NAME            # Database name
SECRET_KEY              # JWT secret key (min 32 chars)
OPENAI_API_KEY          # OpenAI API key
SENDGRID_API_KEY        # SendGrid email API key
REDIS_URL               # Redis connection URL
ADMIN_FRONTEND_URL      # Admin portal URL
CANDIDATE_FRONTEND_URL  # Candidate portal URL
```

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:8000/health
```

### API Documentation
Visit: `http://localhost:8000/docs` (Swagger UI)

---

## 📚 Module Breakdown

### Module 1: Monorepo Setup & Database Schema ✅
- Complete folder structure
- All dependencies installed
- MongoDB collections & indexes
- Docker configuration
- Environment setup

### Module 2: Admin Authentication & Dashboard
- User registration/login
- JWT token management
- Protected routes
- Dashboard UI

### Module 3: Resume Upload & Parsing
- File upload endpoint
- PDF parsing
- Data extraction
- Candidate profile

### Module 4: Interview Scheduling
- Interview creation
- Email notifications
- Interview ID generation
- Status management

### Module 5: Candidate Portal Entry
- Interview ID validation
- Device permission checks
- Network testing
- Instructions page

### Module 6: WebSocket Communication
- Real-time messaging
- Room management
- Connection handling
- Event broadcasting

### Module 7: Audio/Video Capture
- WebRTC setup
- MediaRecorder API
- Stream handling
- Video display

### Module 8: Speech-to-Text
- Whisper integration
- Real-time transcription
- Transcript storage
- Display in UI

### Module 9: AI Interviewer Agent
- GPT-4 integration
- Question generation
- Conversation context
- Text-to-speech

### Module 10: Analysis & Reports
- Interview analysis
- Q&A extraction
- Performance scoring
- PDF report generation

### Module 11: AI-Assisted Mode
- Multi-participant WebSocket
- Live suggestions
- Real-time Q&A
- Summary export

### Module 12: Deployment & Polish
- Error handling
- Performance optimization
- Security hardening
- Cloud deployment

---

## 🔐 Security Considerations

- JWT tokens with expiration
- Password hashing with bcrypt
- Input validation with Pydantic
- CORS configuration
- Rate limiting (to be implemented)
- SQL injection prevention (using MongoDB ODM)

---

## 📊 Deployment

### Docker Compose (Development)
```bash
docker-compose up --build
```

### Production Deployment
```bash
# Build images
docker-compose -f docker-compose.yml build

# Deploy with environment
docker-compose -f docker-compose.yml up -d
```

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Submit pull request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 📞 Support

For issues and questions:
- Create a GitHub issue
- Contact: support@example.com

---

**Next Step**: Proceed to Module 2 - Admin Authentication & Dashboard
