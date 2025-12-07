#!/bin/bash

# Module 2 Authentication System - Verification Script
# This script checks if all required files are in place and properly configured

echo "=========================================="
echo "Module 2 Auth System Verification"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
CHECKS_PASSED=0
CHECKS_FAILED=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} Found: $1"
        ((CHECKS_PASSED++))
        return 0
    else
        echo -e "${RED}❌${NC} Missing: $1"
        ((CHECKS_FAILED++))
        return 1
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} Found: $1"
        ((CHECKS_PASSED++))
        return 0
    else
        echo -e "${RED}❌${NC} Missing: $1"
        ((CHECKS_FAILED++))
        return 1
    fi
}

# Function to check if string exists in file
check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✅${NC} Found in $1: \"$2\""
        ((CHECKS_PASSED++))
        return 0
    else
        echo -e "${RED}❌${NC} Missing in $1: \"$2\""
        ((CHECKS_FAILED++))
        return 1
    fi
}

echo "📁 CHECKING BACKEND FILES"
echo "================================"
check_file "backend/app/api/auth.py"
check_file "backend/app/models/user.py"
check_file "backend/app/core/security.py"
check_file "backend/app/main.py"
echo ""

echo "📁 CHECKING FRONTEND FILES"
echo "================================"
check_file "admin-frontend/src/App.tsx"
check_file "admin-frontend/src/lib/axios.ts"
check_file "admin-frontend/src/services/authService.ts"
check_file "admin-frontend/src/store/authStore.ts"
check_file "admin-frontend/src/components/ProtectedRoute.tsx"
check_file "admin-frontend/src/pages/Login.tsx"
check_file "admin-frontend/src/pages/Register.tsx"
check_file "admin-frontend/src/pages/Dashboard.tsx"
echo ""

echo "🔍 CHECKING BACKEND IMPLEMENTATION"
echo "================================"
check_content "backend/app/api/auth.py" "register"
check_content "backend/app/api/auth.py" "login"
check_content "backend/app/api/auth.py" "get_me"
check_content "backend/app/api/auth.py" "logout"
check_content "backend/app/api/auth.py" "get_current_user"
check_content "backend/app/api/auth.py" "HTTPBearer"
echo ""

echo "🔍 CHECKING FRONTEND IMPLEMENTATION"
echo "================================"
check_content "admin-frontend/src/store/authStore.ts" "login"
check_content "admin-frontend/src/store/authStore.ts" "register"
check_content "admin-frontend/src/store/authStore.ts" "logout"
check_content "admin-frontend/src/store/authStore.ts" "checkAuth"
check_content "admin-frontend/src/lib/axios.ts" "Authorization"
check_content "admin-frontend/src/lib/axios.ts" "Bearer"
check_content "admin-frontend/src/components/ProtectedRoute.tsx" "isAuthenticated"
echo ""

echo "🔍 CHECKING ROUTER SETUP"
echo "================================"
check_content "admin-frontend/src/App.tsx" "/login"
check_content "admin-frontend/src/App.tsx" "/register"
check_content "admin-frontend/src/App.tsx" "/dashboard"
check_content "admin-frontend/src/App.tsx" "ProtectedRoute"
check_content "admin-frontend/src/App.tsx" "checkAuth"
echo ""

echo "🔍 CHECKING CONFIGURATION"
echo "================================"
check_file "backend/app/core/config.py"
check_file "backend/app/core/database.py"
check_content "backend/app/core/config.py" "SECRET_KEY"
check_content "backend/app/core/config.py" "ACCESS_TOKEN_EXPIRE_MINUTES"
echo ""

echo "=========================================="
echo "SUMMARY"
echo "=========================================="
echo -e "${GREEN}Passed:${NC} $CHECKS_PASSED checks"
echo -e "${RED}Failed:${NC} $CHECKS_FAILED checks"
echo ""

if [ $CHECKS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Module 2 is properly configured.${NC}"
    exit 0
else
    echo -e "${RED}❌ Some checks failed. Please review the setup.${NC}"
    exit 1
fi
