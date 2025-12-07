# Module 2 Authentication System - Testing Guide

## Overview
Module 2 implements a complete JWT authentication system for admin users with the following components:

### Backend Components ✅
- **POST /api/auth/register**: User registration with email validation and password hashing
- **POST /api/auth/login**: JWT token generation for authenticated users
- **GET /api/auth/me**: Get current user info (protected route)
- **POST /api/auth/logout**: Logout endpoint
- **Security**: BCrypt password hashing, JWT tokens, HTTPBearer scheme

### Frontend Components ✅
1. **Axios Client** (`src/lib/axios.ts`)
   - Automatic JWT token injection in requests
   - Automatic logout on 401 responses
   - baseURL configuration

2. **Auth Service** (`src/services/authService.ts`)
   - register(), login(), getCurrentUser(), logout() methods
   - TypeScript interfaces for type safety

3. **Auth Store** (`src/store/authStore.ts`)
   - Zustand state management
   - localStorage persistence
   - Auto-recovery on page reload via checkAuth()

4. **Components**
   - **ProtectedRoute.tsx**: Route-level access control
   - **Login.tsx**: Admin login form with error handling
   - **Register.tsx**: Admin registration form with validation

5. **App Router** (`src/App.tsx`)
   - /login - Public login page
   - /register - Public registration page
   - /dashboard - Protected dashboard page
   - / - Redirects to /dashboard (protected)

## Testing the Authentication Flow

### Prerequisites
1. Start MongoDB: `docker run -d -p 27017:27017 --name mongodb mongo:7.0`
2. Start Redis: `docker run -d -p 6379:6379 --name redis redis:7`
3. Start Backend: `cd backend && python -m uvicorn app.main:app --reload --port 8000`
4. Start Admin Frontend: `cd admin-frontend && npm run dev`

### Test Scenarios

#### Test 1: User Registration
```
1. Navigate to http://localhost:3000/register
2. Fill form:
   - Full Name: "Test Admin"
   - Email: "admin@test.com"
   - Password: "password123"
   - Confirm Password: "password123"
3. Expected Result:
   - Form validation passes
   - Request sent to POST /api/auth/register
   - Redirects to /login with registered message
   - No errors in console
```

#### Test 2: User Login
```
1. Navigate to http://localhost:3000/login
2. Fill form:
   - Email: "admin@test.com"
   - Password: "password123"
3. Expected Result:
   - Form validation passes
   - Request sent to POST /api/auth/login
   - JWT token saved to localStorage
   - Redirects to /dashboard
   - User name appears in navbar
```

#### Test 3: Protected Route Access
```
1. After login, access /dashboard
2. Expected Result:
   - Dashboard loads successfully
   - User info displayed (name, email)
   - Statistics cards visible
3. Attempt to access /dashboard without token:
   - Should redirect to /login automatically
```

#### Test 4: Session Persistence
```
1. Login successfully
2. Refresh the page (F5)
3. Expected Result:
   - User remains logged in
   - Dashboard loads without redirecting to login
   - User info persists
   - Token retrieved from localStorage
```

#### Test 5: Logout
```
1. From dashboard, click Logout button
2. Expected Result:
   - Token cleared from localStorage
   - Redirects to /login page
   - Can't access /dashboard without logging in again
```

#### Test 6: Invalid Credentials
```
1. Navigate to /login
2. Try with wrong email/password
3. Expected Result:
   - Error message displays
   - Stays on login page
   - No token generated
```

#### Test 7: Token Expiration
```
1. Login successfully
2. Wait 30 minutes (or modify ACCESS_TOKEN_EXPIRE_MINUTES to 1 for testing)
3. Make API request
4. Expected Result:
   - 401 response triggers logout
   - Redirected to /login
   - Token cleared
```

## Files Created/Modified in Module 2

### Backend
- `app/api/auth.py` - Complete auth endpoints
- `app/main.py` - Auth router integration

### Frontend (Admin)
- `src/lib/axios.ts` - HTTP client with interceptors
- `src/services/authService.ts` - API service layer
- `src/store/authStore.ts` - Zustand state management
- `src/components/ProtectedRoute.tsx` - Route protection
- `src/pages/Login.tsx` - Login page
- `src/pages/Register.tsx` - Registration page
- `src/pages/Dashboard.tsx` - Enhanced with user info
- `src/App.tsx` - Updated router configuration

## Key Features Implemented

✅ **Security**
- Password hashing with bcrypt
- JWT tokens for session management
- HTTPBearer authentication scheme
- CORS configuration

✅ **User Experience**
- Form validation (email, password match, password strength)
- Real-time error messages
- Loading states during API calls
- Persistent login across page refreshes
- Automatic logout on token expiration

✅ **Code Quality**
- TypeScript throughout
- Type-safe API responses
- Error handling in all paths
- Proper async/await patterns
- Zustand state management with persistence

## Next Steps (Module 3)

- Candidate user registration endpoint
- Candidate dashboard
- Candidate profile management
- Email verification system
- Password reset functionality

## Troubleshooting

### Issue: Blank page on /dashboard
- Check localStorage has 'admin_token' key
- Verify backend /api/auth/me endpoint returns current user
- Check browser console for errors

### Issue: Can't login
- Verify MongoDB is running
- Check backend logs: `docker logs backend`
- Ensure users collection is created
- Verify password hashing works correctly

### Issue: Token not persisting
- Check localStorage is enabled in browser
- Verify Zustand persist middleware is working
- Check browser DevTools > Application > LocalStorage

### Issue: 401 errors on requests
- Token may be expired (default 30 minutes)
- Check request headers include "Authorization: Bearer {token}"
- Verify Axios interceptor is adding token correctly

## Performance Notes

- Token validation happens on each protected route access
- Axios interceptors catch 401 errors automatically
- Zustand persist middleware writes to localStorage on state change
- checkAuth() called on app mount, minimal performance impact

---

**Status**: Module 2 Authentication System ✅ COMPLETE
**Code Quality**: Production Ready
**Test Coverage**: Manual testing guide provided above
**Next Phase**: Module 3 - Candidate Management
