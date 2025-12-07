# 🚀 Module 2 Quick Start - Testing Guide

## Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- Python 3.9+ installed
- MongoDB running locally or Docker
- Redis running locally or Docker

---

## ⚡ Quick Start

### Option A: Using Docker Compose (Easiest)

```bash
# From project root
cd /Users/prajwalmac/Documents/GitHub/Interview-Scheduler

# Start all services
docker-compose up

# In a new terminal, verify services are running
docker ps
```

### Option B: Manual Setup

#### 1. Start MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Or if MongoDB is installed locally
mongod
```

#### 2. Start Redis
```bash
# Using Docker
docker run -d -p 6379:6379 --name redis redis:7

# Or if Redis is installed locally
redis-server
```

#### 3. Start Backend
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # macOS/Linux
# or: venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Start server
python -m uvicorn app.main:app --reload --port 8000
```

#### 4. Start Admin Frontend
```bash
cd admin-frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## ✅ Testing the Authentication Flow

### Step 1: Register a New Admin User

1. Open: `http://localhost:3000/register`
2. Fill in the form:
   - **Full Name**: John Doe
   - **Email**: admin@example.com
   - **Password**: password123
   - **Confirm Password**: password123
3. Click "Sign Up"
4. **Expected**: Redirects to login page with success message

### Step 2: Login with the New Account

1. You're now on: `http://localhost:3000/login`
2. Enter credentials:
   - **Email**: admin@example.com
   - **Password**: password123
3. Click "Sign In"
4. **Expected**: Redirects to dashboard, shows your name in navbar

### Step 3: Verify Dashboard

1. You're now on: `http://localhost:3000/dashboard`
2. **Verify you see**:
   - Your full name in navbar
   - Your email address
   - Statistics cards (candidates, interviews, etc.)
   - Logout button in top-right

### Step 4: Test Session Persistence

1. On dashboard, press **F5** (refresh page)
2. **Expected**: You remain logged in, dashboard loads immediately
3. **Why**: Token is stored in localStorage and auto-recovered

### Step 5: Test Logout

1. On dashboard, click **Logout** button
2. **Expected**: Redirects to login page, token cleared
3. Verify you can't access `/dashboard` without logging in again

### Step 6: Test Protected Routes

1. Open browser DevTools: Press `F12`
2. Clear localStorage: 
   - Go to Application tab
   - Find LocalStorage
   - Delete 'admin_token'
3. Try accessing `http://localhost:3000/dashboard`
4. **Expected**: Automatically redirects to login page

---

## 🔍 Debugging Tips

### Check Network Requests
```
1. Open DevTools (F12)
2. Go to "Network" tab
3. Try registering/logging in
4. Look for API requests to /api/auth/*
5. Check response status: should be 200-201
```

### Check LocalStorage
```
1. Open DevTools (F12)
2. Go to "Application" tab
3. Click "LocalStorage" on the left
4. Look for 'admin_token' key
5. Should have a long JWT string as value
```

### Check Backend Logs
```
# If running locally
# Look for: "POST /api/auth/register" and similar logs

# If using Docker
docker logs backend
```

### Check MongoDB
```
# Connect to MongoDB
mongosh mongodb://localhost:27017

# View databases
show dbs

# Use AI interview system database
use ai_interview_system

# View users collection
db.users.find()

# Count users
db.users.countDocuments()
```

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot connect to backend"
```
Solution:
- Ensure backend is running on port 8000
- Check: http://localhost:8000/docs (FastAPI docs)
- If error, check backend is started and MongoDB is running
```

### Issue: "Email already registered"
```
Solution:
- Use a different email address
- Or clear users collection: db.users.deleteMany({})
- Or delete and recreate MongoDB container
```

### Issue: "Invalid credentials" on login
```
Solution:
- Verify email exists in MongoDB: db.users.find()
- Try registering again with new email
- Check MongoDB is actually storing the user
```

### Issue: "Token expired" errors
```
Solution:
- This is normal after 30 minutes
- Login again to get a new token
- (Development only - make short for testing)
```

### Issue: Frontend shows blank page
```
Solution:
- Clear browser cache (Ctrl+Shift+Delete)
- Check console errors (F12 > Console)
- Restart frontend: npm run dev
- Verify Node.js version: node --version
```

---

## 📊 What's Being Tested

### Authentication Flow
- ✅ User registration with validation
- ✅ Password hashing and security
- ✅ JWT token generation
- ✅ Token storage in localStorage
- ✅ Auto-token injection in requests
- ✅ Protected route access
- ✅ Session persistence on refresh
- ✅ Auto-logout on token expiration

### Frontend Functionality
- ✅ Form validation (email, password, etc.)
- ✅ Error message display
- ✅ Loading states
- ✅ Navigation between pages
- ✅ Protected route redirection
- ✅ User info display

### Backend Security
- ✅ Email uniqueness validation
- ✅ Password hashing
- ✅ JWT validation
- ✅ Bearer token parsing
- ✅ Protected endpoint access
- ✅ CORS configuration

---

## 📝 Test Scenarios to Try

### Scenario 1: Fresh Registration
```
1. Open /register
2. Register with: test1@example.com
3. Login with same credentials
4. Access dashboard
5. Logout
```

### Scenario 2: Multiple Users
```
1. Register: user1@example.com
2. Register: user2@example.com
3. Logout
4. Login as: user1@example.com
5. Verify only user1 data shows
6. Logout and login as user2
```

### Scenario 3: Error Handling
```
1. Try registering with duplicate email
2. Try invalid email format
3. Try mismatched passwords
4. Try login with wrong password
5. Try accessing /dashboard without login
```

### Scenario 4: Session Recovery
```
1. Login to dashboard
2. Copy token from localStorage
3. Open new incognito window
4. Paste token in localStorage
5. Navigate to /dashboard
6. Should load without login
```

---

## 🎯 Success Indicators

You've successfully completed Module 2 when:

- ✅ Can register a new admin user
- ✅ Can login with registered account
- ✅ Dashboard shows user information
- ✅ Session persists on page refresh
- ✅ Can logout successfully
- ✅ Cannot access dashboard without token
- ✅ Token automatically added to API requests
- ✅ Auto-logout on 401 responses

---

## 📚 Files to Review

After testing, review these files to understand the implementation:

1. **Backend Auth** → `backend/app/api/auth.py`
2. **Frontend Store** → `admin-frontend/src/store/authStore.ts`
3. **HTTP Client** → `admin-frontend/src/lib/axios.ts`
4. **Router** → `admin-frontend/src/App.tsx`
5. **Protected Route** → `admin-frontend/src/components/ProtectedRoute.tsx`

---

## 🔗 Useful URLs During Testing

- **Admin Register**: http://localhost:3000/register
- **Admin Login**: http://localhost:3000/login
- **Admin Dashboard**: http://localhost:3000/dashboard
- **API Documentation**: http://localhost:8000/docs
- **MongoDB Compass**: mongodb://localhost:27017

---

## ⏱️ Estimated Time

- Setup: 5-10 minutes
- Testing registration: 2 minutes
- Testing login: 2 minutes
- Testing dashboard: 2 minutes
- Testing logout: 1 minute
- **Total**: ~15 minutes

---

## 🚀 Next Steps After Testing

Once Module 2 is verified working:

1. ✅ Test module 2 authentication (you are here)
2. → Move to Module 3: Candidate Management
3. → Implement candidate registration
4. → Create candidate dashboard
5. → Add interview scheduling

---

## 📞 Need Help?

Check these files for more information:
- `MODULE_2_AUTH_COMPLETE.md` - Detailed testing guide
- `MODULE_2_IMPLEMENTATION_SUMMARY.md` - Technical details
- `verify_module2.sh` - Verification script

---

**Happy Testing! 🎉**

For issues, errors, or questions - check the browser console (F12) first!
