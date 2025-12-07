#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}AI Interview System - Module 1 Verification${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Counter for checks
PASS=0
FAIL=0

# Function to check if directory exists
check_dir() {
  if [ -d "$1" ]; then
    echo -e "${GREEN}✓${NC} $1 exists"
    ((PASS++))
  else
    echo -e "${RED}✗${NC} $1 missing"
    ((FAIL++))
  fi
}

# Function to check if file exists
check_file() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✓${NC} $1 exists"
    ((PASS++))
  else
    echo -e "${RED}✗${NC} $1 missing"
    ((FAIL++))
  fi
}

echo -e "${YELLOW}Checking Directory Structure...${NC}"
check_dir "admin-frontend"
check_dir "candidate-frontend"
check_dir "backend"
check_dir "interview-analysis"
check_dir "backend/app"
check_dir "backend/app/api"
check_dir "backend/app/core"
check_dir "backend/app/models"
check_dir "backend/app/services"
check_dir "backend/app/sockets"
check_dir "admin-frontend/src/pages"
check_dir "admin-frontend/src/store"
check_dir "candidate-frontend/src/pages"
check_dir "candidate-frontend/src/store"
check_dir "interview-analysis/src/analyzers"

echo -e "\n${YELLOW}Checking Configuration Files...${NC}"
check_file "docker-compose.yml"
check_file ".env.example"
check_file ".gitignore"
check_file "README.md"
check_file "backend/requirements.txt"
check_file "backend/Dockerfile"
check_file "admin-frontend/package.json"
check_file "admin-frontend/vite.config.ts"
check_file "admin-frontend/tailwind.config.js"
check_file "candidate-frontend/package.json"
check_file "candidate-frontend/vite.config.ts"

echo -e "\n${YELLOW}Checking Backend Files...${NC}"
check_file "backend/app/main.py"
check_file "backend/app/core/database.py"
check_file "backend/app/core/config.py"
check_file "backend/app/core/security.py"
check_file "backend/app/models/user.py"
check_file "backend/app/models/candidate.py"
check_file "backend/app/models/interview.py"
check_file "backend/app/models/transcript.py"
check_file "backend/app/models/report.py"

echo -e "\n${YELLOW}Checking Frontend Files...${NC}"
check_file "admin-frontend/src/App.tsx"
check_file "admin-frontend/src/pages/Login.tsx"
check_file "admin-frontend/src/pages/Dashboard.tsx"
check_file "admin-frontend/src/store/authStore.ts"
check_file "candidate-frontend/src/App.tsx"
check_file "candidate-frontend/src/pages/Home.tsx"
check_file "candidate-frontend/src/store/interviewStore.ts"

echo -e "\n${YELLOW}Checking Interview Analysis Module...${NC}"
check_file "interview-analysis/requirements.txt"
check_file "interview-analysis/src/models/report_schema.py"

echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}Verification Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"

if [ $FAIL -eq 0 ]; then
  echo -e "\n${GREEN}✓ Module 1 Setup Complete!${NC}"
  echo -e "${YELLOW}Next Steps:${NC}"
  echo -e "1. Copy .env file: ${BLUE}cp .env.example .env${NC}"
  echo -e "2. Update .env with your API keys"
  echo -e "3. Start with Docker: ${BLUE}docker-compose up --build${NC}"
  echo -e "4. Or start locally with:"
  echo -e "   - Backend: ${BLUE}cd backend && source venv/bin/activate && uvicorn app.main:app --reload${NC}"
  echo -e "   - Admin: ${BLUE}cd admin-frontend && npm install && npm run dev${NC}"
  echo -e "   - Candidate: ${BLUE}cd candidate-frontend && npm install && npm run dev -- --port 3001${NC}"
  exit 0
else
  echo -e "\n${RED}✗ Some checks failed. Please verify the setup.${NC}"
  exit 1
fi
