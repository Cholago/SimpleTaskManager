# 📋 Simple Task Manager

A modern, full-stack task management application showcasing best practices in **Spring Boot** and **Angular** development.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen)
![Angular](https://img.shields.io/badge/Angular-19.2.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.14-blueviolet)

## ✨ Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 📝 **CRUD Operations** - Complete task management functionality
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔒 **Protected Routes** - Angular guards and Spring Security
- 💾 **Data Persistence** - H2 database with JPA/Hibernate
- ⚡ **Real-time Updates** - Instant UI feedback
- 📊 **Task Statistics** - Visual dashboard with metrics
- 🚀 **Best Practices** - Clean architecture, SOLID principles, proper error handling

## 🚀 Quick Start

### Start Backend
```bash
cd Backend
./mvnw spring-boot:run
```
Backend runs on http://localhost:8080

### Start Frontend
```bash
cd Frontend
npm install
npm start
```
Frontend runs on http://localhost:4200

### Access the Application
1. Open http://localhost:4200
2. Click "Sign up" to create an account
3. Start managing your tasks!

📖 See [QUICK_START.md](QUICK_START.md) for detailed setup instructions.

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get up and running in 5 minutes
- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Complete technical documentation

## 🏗️ Architecture

### Backend (Spring Boot)
```
✓ RESTful API design
✓ JWT-based authentication
✓ Spring Security configuration
✓ JPA/Hibernate ORM
✓ Exception handling
✓ Logging with SLF4J
✓ H2 in-memory database
```

### Frontend (Angular)
```
✓ Standalone components (Angular 19)
✓ Reactive Forms
✓ HTTP Interceptors
✓ Route Guards
✓ Service-based architecture
✓ Tailwind CSS styling
✓ TypeScript strict mode
```

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Backend Framework | Spring Boot 3.5.6 |
| Backend Language | Java 17 |
| Frontend Framework | Angular 19.2.0 |
| Frontend Language | TypeScript 5.7.2 |
| Styling | Tailwind CSS 4.1.14 |
| Security | Spring Security + JWT |
| Database | H2 (In-memory) |
| Build Tools | Maven, npm |

## 📋 API Endpoints

### Authentication (Public)
- `POST /auth/register` - Register new user
- `POST /auth/login` - Authenticate user

### Tasks (Protected)
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get task by ID
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## 🎯 Project Structure

```
SimpleTaskManager/
├── Backend/                 # Spring Boot application
│   ├── src/main/java/
│   │   └── com/taskmanager/taskmanager/
│   │       ├── controller/  # REST controllers
│   │       ├── service/     # Business logic
│   │       ├── repository/  # Data access
│   │       ├── model/       # Entities
│   │       ├── dto/         # Data Transfer Objects
│   │       ├── security/    # Security config & JWT
│   │       └── exception/   # Error handling
│   └── pom.xml
├── Frontend/                # Angular application
│   ├── src/app/
│   │   ├── components/      # UI components
│   │   ├── services/        # Business services
│   │   ├── guards/          # Route protection
│   │   ├── interceptors/    # HTTP interceptors
│   │   └── models/          # TypeScript interfaces
│   └── package.json
├── QUICK_START.md          # Quick setup guide
└── PROJECT_DOCUMENTATION.md # Complete documentation
```

## 🔒 Security Features

- ✅ Password hashing with BCrypt
- ✅ JWT token-based authentication
- ✅ Protected API endpoints
- ✅ User-specific data isolation
- ✅ CORS configuration
- ✅ HTTP-only authentication
- ✅ Input validation

## 🎨 UI Screenshots

### Login Page
- Clean, modern authentication form
- Real-time form validation
- Responsive design

### Task Dashboard
- Task statistics overview
- Create/Edit/Delete tasks
- Toggle task status
- Beautiful card-based layout

### Features
- Loading indicators
- Success/error notifications
- Confirmation dialogs
- Mobile-responsive

## 🧪 Testing

### Manual Testing
```bash
# Register a user
# Create some tasks
# Update task status
# Edit task details
# Delete tasks
# Logout and login again
```

### API Testing
```bash
# Use the curl commands in QUICK_START.md
# Or use Postman/Insomnia
```

### Database Inspection
Visit http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:taskdb`
- Username: `sa`
- Password: (empty)

## 📦 What's Included

### Backend Components
- User & Task entities with relationships
- JWT utilities for token generation/validation
- Custom exception handlers
- Request/Response DTOs
- Spring Security configuration
- Comprehensive logging

### Frontend Components
- Login & Register pages
- Task dashboard with CRUD operations
- Authentication service
- Task service
- HTTP interceptor
- Route guard
- TypeScript models

## 🎓 Learning Outcomes

This project demonstrates:

1. **Full-stack Development** - Complete backend and frontend integration
2. **Authentication & Security** - JWT implementation with Spring Security
3. **RESTful API Design** - Proper HTTP methods and status codes
4. **Modern Frontend** - Angular 19 with standalone components
5. **Responsive Design** - Mobile-first approach with Tailwind CSS
6. **Error Handling** - Comprehensive validation and error responses
7. **Clean Architecture** - Separation of concerns, layered design
8. **Best Practices** - SOLID principles, dependency injection

## 🚀 Production Readiness

To deploy to production:

1. **Backend**
   - Switch from H2 to PostgreSQL/MySQL
   - Use environment variables for secrets
   - Enable HTTPS
   - Configure proper CORS

2. **Frontend**
   - Build with `npm run build`
   - Update API URLs
   - Deploy to CDN or static hosting

See PROJECT_DOCUMENTATION.md for detailed deployment guide.

## 📝 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

This is a demonstration project, but feedback and suggestions are welcome!

## 📞 Support

For setup help:
1. Check [QUICK_START.md](QUICK_START.md)
2. Review [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)
3. Check the troubleshooting sections

---

**Built with ❤️ using Spring Boot and Angular**

🌟 Happy Coding! 🌟

