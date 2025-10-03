# API Testing Guide

This guide provides complete examples for testing all API endpoints using curl, Postman, or any HTTP client.

## Base URL
```
http://localhost:8080
```

## 🔓 Public Endpoints

### 1. Register a New User

**Endpoint**: `POST /auth/register`

**Request**:
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "secure123"
  }'
```

**Success Response (201 Created)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "johndoe",
  "message": "User registered successfully"
}
```

**Error Response (409 Conflict)** - Username exists:
```json
{
  "status": 409,
  "message": "Username already exists: johndoe",
  "timestamp": "2025-10-03T10:30:00.123456",
  "path": "/auth/register"
}
```

**Error Response (400 Bad Request)** - Validation failed:
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "username": "Username must be between 3 and 50 characters",
    "password": "Password must be at least 6 characters"
  },
  "timestamp": "2025-10-03T10:30:00.123456",
  "path": "/auth/register"
}
```

---

### 2. Login

**Endpoint**: `POST /auth/login`

**Request**:
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "secure123"
  }'
```

**Success Response (200 OK)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lIiwiaWF0IjoxNjk2MzIwMDAwLCJleHAiOjE2OTY0MDY0MDB9.signature",
  "username": "johndoe",
  "message": "Login successful"
}
```

**Error Response (401 Unauthorized)** - Invalid credentials:
```json
{
  "status": 401,
  "message": "Invalid username or password",
  "timestamp": "2025-10-03T10:30:00.123456",
  "path": "/auth/login"
}
```

---

## 🔒 Protected Endpoints

> **Note**: All protected endpoints require the JWT token in the Authorization header.

### Format
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

### 3. Create a New Task

**Endpoint**: `POST /api/tasks`

**Request**:
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." \
  -d '{
    "title": "Deploy the application",
    "description": "Deploy to production server",
    "status": "PENDING"
  }'
```

**Success Response (201 Created)**:
```json
{
  "id": 1,
  "title": "Deploy the application",
  "description": "Deploy to production server",
  "status": "PENDING",
  "createdAt": "2025-10-03T10:30:00.123456",
  "updatedAt": "2025-10-03T10:30:00.123456"
}
```

**Minimal Request** (description and status are optional):
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." \
  -d '{
    "title": "Quick task"
  }'
```

**Error Response (400 Bad Request)** - Validation error:
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "title": "Title is required"
  },
  "timestamp": "2025-10-03T10:30:00.123456",
  "path": "/api/tasks"
}
```

**Error Response (401 Unauthorized)** - Missing/invalid token:
```json
{
  "status": 401,
  "message": "Unauthorized",
  "timestamp": "2025-10-03T10:30:00.123456",
  "path": "/api/tasks"
}
```

---

### 4. Get All Tasks

**Endpoint**: `GET /api/tasks`

**Request**:
```bash
curl -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
```

**Success Response (200 OK)**:
```json
[
  {
    "id": 1,
    "title": "Deploy the application",
    "description": "Deploy to production server",
    "status": "PENDING",
    "createdAt": "2025-10-03T10:30:00.123456",
    "updatedAt": "2025-10-03T10:30:00.123456"
  },
  {
    "id": 2,
    "title": "Write documentation",
    "description": "Complete API documentation",
    "status": "COMPLETED",
    "createdAt": "2025-10-03T11:00:00.123456",
    "updatedAt": "2025-10-03T12:00:00.123456"
  }
]
```

**Empty Response** (when no tasks exist):
```json
[]
```

---

### 5. Get Task by ID

**Endpoint**: `GET /api/tasks/{id}`

**Request**:
```bash
curl -X GET http://localhost:8080/api/tasks/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
```

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "title": "Deploy the application",
  "description": "Deploy to production server",
  "status": "PENDING",
  "createdAt": "2025-10-03T10:30:00.123456",
  "updatedAt": "2025-10-03T10:30:00.123456"
}
```

**Error Response (404 Not Found)** - Task doesn't exist or doesn't belong to user:
```json
{
  "status": 404,
  "message": "Task not found with id: 999",
  "timestamp": "2025-10-03T10:30:00.123456",
  "path": "/api/tasks/999"
}
```

---

### 6. Update a Task

**Endpoint**: `PUT /api/tasks/{id}`

**Request** (Full update):
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." \
  -d '{
    "title": "Deploy the application - Updated",
    "description": "Deploy to production server with new features",
    "status": "COMPLETED"
  }'
```

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "title": "Deploy the application - Updated",
  "description": "Deploy to production server with new features",
  "status": "COMPLETED",
  "createdAt": "2025-10-03T10:30:00.123456",
  "updatedAt": "2025-10-03T13:45:00.789012"
}
```

**Request** (Just toggle status):
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." \
  -d '{
    "title": "Deploy the application",
    "description": "Deploy to production server",
    "status": "COMPLETED"
  }'
```

**Error Response (404 Not Found)**:
```json
{
  "status": 404,
  "message": "Task not found with id: 999",
  "timestamp": "2025-10-03T10:30:00.123456",
  "path": "/api/tasks/999"
}
```

---

### 7. Delete a Task

**Endpoint**: `DELETE /api/tasks/{id}`

**Request**:
```bash
curl -X DELETE http://localhost:8080/api/tasks/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
```

**Success Response (204 No Content)**:
```
(Empty response body)
```

**Error Response (404 Not Found)**:
```json
{
  "status": 404,
  "message": "Task not found with id: 999",
  "timestamp": "2025-10-03T10:30:00.123456",
  "path": "/api/tasks/999"
}
```

---

## 🧪 Complete Testing Workflow

### Step 1: Register
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123456"}'
```

**Save the token from the response!**

### Step 2: Create Tasks
```bash
# Task 1
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Deploy application","description":"Production deployment","status":"PENDING"}'

# Task 2
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Write tests","description":"Unit and integration tests","status":"PENDING"}'

# Task 3
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Code review","status":"PENDING"}'
```

### Step 3: Get All Tasks
```bash
curl -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Step 4: Update a Task
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Deploy application","description":"Production deployment - DONE!","status":"COMPLETED"}'
```

### Step 5: Delete a Task
```bash
curl -X DELETE http://localhost:8080/api/tasks/2 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Step 6: Verify
```bash
curl -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📋 Postman Collection

### Import into Postman

1. Create a new collection named "Task Manager"
2. Add these requests with the examples above
3. Create an environment variable `token` for easy token management
4. Use `{{token}}` in Authorization headers

### Environment Variables
```
baseUrl: http://localhost:8080
token: (set after login/register)
```

---

## 🔍 Testing Edge Cases

### 1. Invalid Token
```bash
curl -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer invalid_token_here"
```

Expected: 401 Unauthorized

### 2. Missing Token
```bash
curl -X GET http://localhost:8080/api/tasks
```

Expected: 401 Unauthorized

### 3. Accessing Another User's Task
1. Register user1, create a task (note the task ID)
2. Register user2, try to access user1's task
```bash
curl -X GET http://localhost:8080/api/tasks/1 \
  -H "Authorization: Bearer USER2_TOKEN"
```

Expected: 404 Not Found (task ownership validation)

### 4. Validation Errors
```bash
# Title too long (>200 chars)
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"'$(printf 'a%.0s' {1..201})'","status":"PENDING"}'
```

Expected: 400 Bad Request with validation error

### 5. Username Already Exists
```bash
# Register the same user twice
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123456"}'
```

Expected: 409 Conflict

---

## 📊 Response Status Codes Reference

| Code | Meaning | When It Happens |
|------|---------|-----------------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST (task/user created) |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation errors, invalid JSON |
| 401 | Unauthorized | Missing/invalid JWT token |
| 404 | Not Found | Task doesn't exist or doesn't belong to user |
| 409 | Conflict | Username already exists |
| 500 | Internal Server Error | Unexpected server error |

---

## 🛠️ Useful Testing Tools

### 1. curl (Command Line)
Already shown in all examples above.

### 2. Postman
Download from: https://www.postman.com/

### 3. Insomnia
Download from: https://insomnia.rest/

### 4. HTTPie (Prettier CLI)
```bash
# Install
brew install httpie  # macOS
pip install httpie   # Python

# Usage
http POST localhost:8080/auth/login username=johndoe password=secure123
http GET localhost:8080/api/tasks "Authorization:Bearer TOKEN"
```

### 5. Browser Extensions
- **Talend API Tester** (Chrome/Firefox)
- **RESTClient** (Firefox)

---

## 📝 Tips for Testing

1. **Save the JWT token** - You'll need it for every protected endpoint
2. **Check token expiration** - Tokens expire after 24 hours
3. **Use variables** - In Postman/Insomnia, use environment variables
4. **Test error cases** - Don't just test the happy path
5. **Check the logs** - Backend console shows detailed request information
6. **Use H2 Console** - Verify data is actually saved in the database

---

**Happy Testing! 🧪**

