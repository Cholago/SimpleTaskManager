# Quick Start Guide - Task Manager

This guide will get your Task Manager application up and running in under 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Java 17 or higher: `java -version`
- ✅ Node.js 18+: `node -v`
- ✅ npm: `npm -v`

## Step 1: Start the Backend (Terminal 1)

```bash
cd Backend
./mvnw spring-boot:run
```

**Wait for**: `Started TaskmanagerApplication` message in the console.

**Backend is ready at**: http://localhost:8080

## Step 2: Start the Frontend (Terminal 2)

```bash
cd Frontend
npm install     # First time only
npm start
```

**Wait for**: `Angular Live Development Server is listening on localhost:4200`

**Frontend is ready at**: http://localhost:4200

## Step 3: Use the Application

### First Time Setup
1. Open browser to http://localhost:4200
2. Click **"Sign up"**
3. Create account:
   - Username: `demo` (or any username, min 3 chars)
   - Password: `password123` (min 6 chars)
4. Click **"Create Account"**

✨ You'll be automatically logged in and redirected to the task dashboard!

### Create Your First Task
1. Click **"+ Create New Task"**
2. Fill in:
   - Title: `Complete the application`
   - Description: `Test all features`
   - Status: `PENDING`
3. Click **"Create Task"**

### Manage Tasks
- ✅ **Toggle Status**: Click the checkmark icon
- ✏️ **Edit Task**: Click the pencil icon
- 🗑️ **Delete Task**: Click the trash icon

### Logout & Login
1. Click **"Logout"** button (top right)
2. Login again with your credentials
3. Your tasks are still there! ✨

## Verify Everything Works

### ✅ Backend Health Check
```bash
curl http://localhost:8080/auth/login
```
Should return: `{"timestamp":"...","status":400,"error":"Bad Request"...}` (this is normal for GET request)

### ✅ Database Console (Optional)
Visit: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:taskdb`
- Username: `sa`
- Password: (leave empty)

You can see your users and tasks in the database!

## Common Commands

### Backend
```bash
# Start
cd Backend && ./mvnw spring-boot:run

# Stop
Ctrl+C

# Clean build
./mvnw clean install
```

### Frontend
```bash
# Start
cd Frontend && npm start

# Stop
Ctrl+C

# Install dependencies
npm install

# Production build
npm run build
```

## Troubleshooting

### Port Already in Use

**Backend (8080)**:
```bash
# macOS/Linux
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID [PID_NUMBER] /F
```

**Frontend (4200)**:
```bash
# macOS/Linux
lsof -ti:4200 | xargs kill -9

# Windows
netstat -ano | findstr :4200
taskkill /PID [PID_NUMBER] /F
```

### Backend Won't Start
```bash
cd Backend
./mvnw clean install
./mvnw spring-boot:run
```

### Frontend Won't Start
```bash
cd Frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### CORS Errors in Browser
1. Make sure backend is running on port 8080
2. Make sure frontend is running on port 4200
3. Clear browser cache (Ctrl+Shift+Delete)
4. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## Test Users & Data

The application starts with an empty database. Create your own test data:

**Sample Test User:**
- Username: `testuser`
- Password: `test123456`

**Sample Tasks to Create:**
1. Deploy the application ✅
2. Write documentation 📝
3. Test all features 🧪
4. Review code quality 🔍

## Next Steps

Once you've verified everything works:

1. 📖 Read `PROJECT_DOCUMENTATION.md` for complete details
2. 🔧 Customize the configuration
3. 🎨 Modify the UI to your liking
4. 🚀 Deploy to production

## API Quick Reference

### Register
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

Response will include a JWT token. Copy the token for next requests.

### Create Task
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{"title":"My Task","description":"Task details","status":"PENDING"}'
```

### Get All Tasks
```bash
curl -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Features to Explore

✅ **User Authentication**
- Register new users
- Login/logout
- JWT token-based security

✅ **Task Management**
- Create tasks with title and description
- Update task details
- Toggle task status (PENDING ↔ COMPLETED)
- Delete tasks
- View task statistics

✅ **UI/UX**
- Responsive design (try on mobile!)
- Real-time form validation
- Loading indicators
- Success/error notifications
- Confirmation dialogs

## Development Tips

### Watch Backend Logs
The terminal running the backend shows:
- User registrations
- Login attempts
- API requests
- SQL queries
- Errors and exceptions

### Watch Frontend Console
Open browser DevTools (F12) to see:
- HTTP requests/responses
- Console logs
- Network activity
- Any errors

### Hot Reload
Both backend and frontend support hot reload:
- **Backend**: Changes to Java files trigger automatic rebuild
- **Frontend**: Changes to TypeScript/HTML/CSS files update instantly

## Need Help?

1. Check the logs in both terminal windows
2. Open browser DevTools (F12) → Console tab
3. Review `PROJECT_DOCUMENTATION.md` for detailed info
4. Verify all ports are correct (8080 backend, 4200 frontend)

---

**You're all set! Start building amazing task management workflows! 🎉**

