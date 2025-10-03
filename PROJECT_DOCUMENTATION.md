# Simple Task Manager - Full Stack Application

## Project Overview

A modern, full-stack task management application built with **Spring Boot** (backend) and **Angular 19** (frontend). The application features JWT-based authentication, RESTful APIs, and a beautiful, responsive UI built with Tailwind CSS.

## Features

### Authentication & Security
- ✅ User registration and login with JWT authentication
- ✅ Secure password hashing using BCrypt
- ✅ Protected routes with Spring Security and Angular Guards
- ✅ Automatic JWT token injection via HTTP Interceptor

### Task Management
- ✅ Create, Read, Update, Delete (CRUD) operations for tasks
- ✅ Task status management (PENDING/COMPLETED)
- ✅ User-specific task isolation (users only see their own tasks)
- ✅ Beautiful, intuitive UI with real-time updates
- ✅ Task statistics dashboard

### User Experience
- ✅ Modern, responsive design with Tailwind CSS
- ✅ Loading indicators and error handling
- ✅ Success/error notifications
- ✅ Confirmation dialogs for destructive actions

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.5.6
- **Language**: Java 17
- **Security**: Spring Security with JWT (jjwt 0.12.3)
- **Database**: H2 (in-memory)
- **ORM**: Spring Data JPA / Hibernate
- **Build Tool**: Maven
- **Utilities**: Lombok, Bean Validation

### Frontend
- **Framework**: Angular 19.2.0
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 4.1.14
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Forms**: Reactive Forms
- **Build Tool**: npm

## Architecture

### Backend Architecture

```
Backend/
├── src/main/java/com/taskmanager/taskmanager/
│   ├── controller/          # REST API endpoints
│   │   ├── AuthController   # /auth/register, /auth/login
│   │   └── TaskController   # /api/tasks CRUD
│   ├── service/             # Business logic layer
│   │   ├── AuthService      # Authentication logic
│   │   ├── TaskService      # Task management logic
│   │   └── UserDetailsServiceImpl
│   ├── repository/          # Data access layer
│   │   ├── UserRepository
│   │   └── TaskRepository
│   ├── model/               # Entity classes
│   │   ├── User             # User entity (implements UserDetails)
│   │   ├── Task             # Task entity
│   │   └── TaskStatus       # Enum (PENDING, COMPLETED)
│   ├── dto/                 # Data Transfer Objects
│   │   ├── LoginRequest
│   │   ├── RegisterRequest
│   │   ├── AuthResponse
│   │   ├── TaskRequest
│   │   └── TaskResponse
│   ├── security/            # Security configuration
│   │   ├── SecurityConfig   # Spring Security setup
│   │   ├── JwtUtil          # JWT generation/validation
│   │   └── JwtAuthenticationFilter
│   └── exception/           # Exception handling
│       ├── GlobalExceptionHandler
│       ├── ResourceNotFoundException
│       ├── UserAlreadyExistsException
│       └── ErrorResponse
```

### Frontend Architecture

```
Frontend/
├── src/app/
│   ├── components/          # UI Components
│   │   ├── login/           # Login page
│   │   ├── register/        # Registration page
│   │   └── tasks/           # Task dashboard
│   ├── services/            # Business logic services
│   │   ├── auth.service     # Authentication handling
│   │   └── task.service     # Task CRUD operations
│   ├── guards/              # Route protection
│   │   └── auth.guard       # Authentication guard
│   ├── interceptors/        # HTTP interceptors
│   │   └── auth.interceptor # JWT token injection
│   ├── models/              # TypeScript interfaces
│   │   ├── auth.model       # Auth-related interfaces
│   │   └── task.model       # Task interface & enum
│   ├── app.config.ts        # Application configuration
│   └── app.routes.ts        # Routing configuration
```

## API Endpoints

### Authentication Endpoints (Public)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/auth/register` | Register new user | `{username, password}` | `{token, username, message}` |
| POST | `/auth/login` | Login user | `{username, password}` | `{token, username, message}` |

### Task Endpoints (Protected - Requires JWT)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/tasks` | Create new task | `{title, description?, status}` | `TaskResponse` |
| GET | `/api/tasks` | Get all user tasks | - | `TaskResponse[]` |
| GET | `/api/tasks/{id}` | Get task by ID | - | `TaskResponse` |
| PUT | `/api/tasks/{id}` | Update task | `{title, description?, status}` | `TaskResponse` |
| DELETE | `/api/tasks/{id}` | Delete task | - | `204 No Content` |

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(1000),
    status VARCHAR(50) NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Setup & Installation

### Prerequisites
- Java 17 or higher
- Node.js 18+ and npm
- Maven 3.6+

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Build the project:
```bash
./mvnw clean install
```

3. Run the application:
```bash
./mvnw spring-boot:run
```

The backend server will start on `http://localhost:8080`

**H2 Console**: Access at `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:taskdb`
- Username: `sa`
- Password: (leave empty)

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend application will start on `http://localhost:4200`

## Usage Guide

### 1. Register a New Account
- Navigate to `http://localhost:4200`
- Click "Sign up" link
- Enter username (3-50 characters) and password (min 6 characters)
- Click "Create Account"

### 2. Login
- Enter your credentials on the login page
- Upon successful login, you'll be redirected to the task dashboard

### 3. Managing Tasks

**Create Task:**
- Click "+ Create New Task" button
- Fill in title (required), description (optional), and status
- Click "Create Task"

**Update Task:**
- Click the edit icon (pencil) on any task
- Modify the details
- Click "Update Task"

**Toggle Status:**
- Click the checkmark icon to quickly toggle between PENDING and COMPLETED

**Delete Task:**
- Click the delete icon (trash)
- Confirm the deletion

### 4. Logout
- Click the "Logout" button in the header

## Configuration

### Backend Configuration
Edit `Backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:h2:mem:taskdb

# JWT Configuration
jwt.secret=YOUR_SECRET_KEY_HERE
jwt.expiration=86400000  # 24 hours in milliseconds

# CORS Configuration
cors.allowed-origins=http://localhost:4200

# Logging Level
logging.level.com.taskmanager=DEBUG
```

### Frontend Configuration
Edit API URLs in service files if backend port changes:
- `Frontend/src/app/services/auth.service.ts` (line 10)
- `Frontend/src/app/services/task.service.ts` (line 8)

## Security Features

### Password Security
- Passwords are hashed using BCrypt before storage
- Original passwords are never stored in the database

### JWT Authentication
- JWT tokens expire after 24 hours
- Tokens are stored in localStorage
- Automatic token injection for API calls

### Authorization
- All `/api/**` endpoints require valid JWT
- Users can only access their own tasks
- Backend validates task ownership on every operation

### CORS Protection
- CORS configured to only allow requests from `http://localhost:4200`
- Adjust in production for your domain

## Testing the Application

### Manual Testing Workflow

1. **Register a User**: Create account with username "testuser"
2. **Login**: Login with the created credentials
3. **Create Tasks**: Add several tasks with different titles and descriptions
4. **Update Task**: Edit a task's title or description
5. **Toggle Status**: Mark tasks as completed/pending
6. **Delete Task**: Remove a task
7. **Logout**: Clear session and return to login
8. **Login Again**: Verify tasks persist for the user

### API Testing with curl

**Register:**
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

**Create Task (replace TOKEN):**
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Task","description":"Test Description","status":"PENDING"}'
```

**Get All Tasks:**
```bash
curl -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Logging

The application logs important events:

- User registration attempts
- Login attempts (successful/failed)
- Task CRUD operations
- Security-related events
- Error conditions

View logs in the console where the Spring Boot application is running.

## Error Handling

### Frontend
- Form validation with real-time feedback
- HTTP error handling with user-friendly messages
- Loading states during async operations

### Backend
- Global exception handler
- Standardized error responses
- Proper HTTP status codes
- Validation error details

### Common HTTP Status Codes
- `200 OK`: Successful GET, PUT
- `201 Created`: Successful POST
- `204 No Content`: Successful DELETE
- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Invalid/missing JWT
- `404 Not Found`: Resource not found
- `409 Conflict`: Username already exists
- `500 Internal Server Error`: Unexpected errors

## Production Deployment Considerations

### Backend
1. Change H2 to PostgreSQL/MySQL
2. Update `jwt.secret` with a strong, unique key
3. Set `spring.jpa.hibernate.ddl-auto=validate`
4. Enable HTTPS
5. Configure proper CORS origins
6. Set logging level to INFO or WARN
7. Use environment variables for sensitive data

### Frontend
1. Update API URLs to production backend
2. Build with `npm run build`
3. Serve from CDN or static hosting
4. Enable production mode
5. Configure Content Security Policy

## Troubleshooting

### Backend won't start
- Verify Java 17 is installed: `java -version`
- Check port 8080 is not in use
- Run `./mvnw clean install` to rebuild

### Frontend won't start
- Clear node_modules: `rm -rf node_modules && npm install`
- Check port 4200 is not in use
- Verify Node.js version: `node -v` (should be 18+)

### CORS errors
- Verify backend is running on port 8080
- Check `cors.allowed-origins` in application.properties
- Clear browser cache

### JWT errors
- Verify token is being sent in Authorization header
- Check token hasn't expired (24 hours)
- Logout and login again to get fresh token

## Future Enhancements

- [ ] Task due dates and reminders
- [ ] Task categories/tags
- [ ] Task priority levels
- [ ] Search and filter functionality
- [ ] Task sharing between users
- [ ] Email notifications
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Task attachments
- [ ] Dark mode theme

## License

This project is created for educational/demonstration purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the logs for error details
3. Verify all prerequisites are installed correctly

---

**Happy Task Managing! 🚀**

