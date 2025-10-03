# Project Structure - Task Manager

## 📂 Complete Directory Tree

```
SimpleTaskManager/
│
├── 📄 README.md                           # Main project overview
├── 📄 QUICK_START.md                      # 5-minute setup guide
├── 📄 PROJECT_DOCUMENTATION.md            # Complete technical docs
├── 📄 API_TESTING_GUIDE.md               # API testing examples
├── 📄 IMPLEMENTATION_SUMMARY.md          # Implementation checklist
├── 📄 PROJECT_STRUCTURE.md               # This file
│
├── 📁 Backend/                            # Spring Boot Application
│   ├── 📄 pom.xml                         # Maven dependencies
│   ├── 📄 mvnw                            # Maven wrapper (Unix)
│   ├── 📄 mvnw.cmd                        # Maven wrapper (Windows)
│   │
│   └── 📁 src/
│       ├── 📁 main/
│       │   ├── 📁 java/
│       │   │   └── 📁 com/taskmanager/taskmanager/
│       │   │       │
│       │   │       ├── 📁 controller/                    # REST API Endpoints
│       │   │       │   ├── 📄 AuthController.java        # /auth/register, /auth/login
│       │   │       │   └── 📄 TaskController.java        # /api/tasks CRUD
│       │   │       │
│       │   │       ├── 📁 service/                       # Business Logic
│       │   │       │   ├── 📄 AuthService.java           # Authentication logic
│       │   │       │   ├── 📄 TaskService.java           # Task management
│       │   │       │   └── 📄 UserDetailsServiceImpl.java # Spring Security integration
│       │   │       │
│       │   │       ├── 📁 repository/                    # Data Access Layer
│       │   │       │   ├── 📄 UserRepository.java        # User queries
│       │   │       │   └── 📄 TaskRepository.java        # Task queries
│       │   │       │
│       │   │       ├── 📁 model/                         # Database Entities
│       │   │       │   ├── 📄 User.java                  # User entity (implements UserDetails)
│       │   │       │   ├── 📄 Task.java                  # Task entity
│       │   │       │   └── 📄 TaskStatus.java            # Enum: PENDING, COMPLETED
│       │   │       │
│       │   │       ├── 📁 dto/                           # Data Transfer Objects
│       │   │       │   ├── 📄 LoginRequest.java          # Login credentials
│       │   │       │   ├── 📄 RegisterRequest.java       # Registration data
│       │   │       │   ├── 📄 AuthResponse.java          # Auth response with JWT
│       │   │       │   ├── 📄 TaskRequest.java           # Task create/update
│       │   │       │   └── 📄 TaskResponse.java          # Task data response
│       │   │       │
│       │   │       ├── 📁 security/                      # Security Configuration
│       │   │       │   ├── 📄 SecurityConfig.java        # Spring Security setup
│       │   │       │   ├── 📄 JwtUtil.java               # JWT generation/validation
│       │   │       │   └── 📄 JwtAuthenticationFilter.java # JWT filter
│       │   │       │
│       │   │       ├── 📁 exception/                     # Exception Handling
│       │   │       │   ├── 📄 GlobalExceptionHandler.java # Centralized error handling
│       │   │       │   ├── 📄 ResourceNotFoundException.java
│       │   │       │   ├── 📄 UserAlreadyExistsException.java
│       │   │       │   └── 📄 ErrorResponse.java         # Standardized error format
│       │   │       │
│       │   │       └── 📄 TaskmanagerApplication.java    # Main Spring Boot application
│       │   │
│       │   └── 📁 resources/
│       │       ├── 📄 application.properties              # Application configuration
│       │       ├── 📁 static/                            # Static resources
│       │       └── 📁 templates/                         # Templates (not used)
│       │
│       └── 📁 test/
│           └── 📁 java/
│               └── 📁 com/taskmanager/taskmanager/
│                   └── 📄 TaskmanagerApplicationTests.java
│
└── 📁 Frontend/                          # Angular Application
    ├── 📄 package.json                   # npm dependencies
    ├── 📄 package-lock.json              # Locked dependency versions
    ├── 📄 angular.json                   # Angular configuration
    ├── 📄 tsconfig.json                  # TypeScript configuration
    ├── 📄 tsconfig.app.json              # App-specific TS config
    ├── 📄 tsconfig.spec.json             # Test-specific TS config
    │
    ├── 📁 public/
    │   └── 📄 favicon.ico                # Application icon
    │
    └── 📁 src/
        ├── 📄 index.html                 # Main HTML file
        ├── 📄 main.ts                    # Application entry point
        ├── 📄 styles.css                 # Global styles
        │
        └── 📁 app/
            ├── 📄 app.component.ts       # Root component
            ├── 📄 app.component.html     # Root template
            ├── 📄 app.component.css      # Root styles
            ├── 📄 app.config.ts          # App configuration (HTTP client, interceptors)
            ├── 📄 app.routes.ts          # Route configuration
            │
            ├── 📁 components/                        # UI Components
            │   │
            │   ├── 📁 login/                         # Login Page
            │   │   ├── 📄 login.component.ts         # Login logic
            │   │   ├── 📄 login.component.html       # Login template
            │   │   └── 📄 login.component.css        # Login styles
            │   │
            │   ├── 📁 register/                      # Registration Page
            │   │   ├── 📄 register.component.ts      # Register logic
            │   │   ├── 📄 register.component.html    # Register template
            │   │   └── 📄 register.component.css     # Register styles
            │   │
            │   └── 📁 tasks/                         # Task Dashboard
            │       ├── 📄 tasks.component.ts         # Dashboard logic
            │       ├── 📄 tasks.component.html       # Dashboard template
            │       └── 📄 tasks.component.css        # Dashboard styles
            │
            ├── 📁 services/                          # Business Logic Services
            │   ├── 📄 auth.service.ts                # Authentication service
            │   └── 📄 task.service.ts                # Task CRUD service
            │
            ├── 📁 guards/                            # Route Protection
            │   └── 📄 auth.guard.ts                  # Authentication guard
            │
            ├── 📁 interceptors/                      # HTTP Interceptors
            │   └── 📄 auth.interceptor.ts            # JWT token interceptor
            │
            └── 📁 models/                            # TypeScript Interfaces
                ├── 📄 auth.model.ts                  # Auth-related types
                └── 📄 task.model.ts                  # Task interface & enum
```

---

## 🗂️ File Descriptions

### Backend Files

| File | Purpose | Lines |
|------|---------|-------|
| **Controllers** |
| `AuthController.java` | Handles /auth/register and /auth/login endpoints | ~40 |
| `TaskController.java` | Handles CRUD operations for tasks | ~70 |
| **Services** |
| `AuthService.java` | Business logic for registration and login | ~80 |
| `TaskService.java` | Business logic for task operations | ~120 |
| `UserDetailsServiceImpl.java` | Spring Security user loading | ~30 |
| **Repositories** |
| `UserRepository.java` | User data access with Spring Data JPA | ~15 |
| `TaskRepository.java` | Task data access with custom queries | ~20 |
| **Models** |
| `User.java` | User entity with UserDetails implementation | ~85 |
| `Task.java` | Task entity with relationships | ~60 |
| `TaskStatus.java` | Enum for task statuses | ~5 |
| **DTOs** |
| `LoginRequest.java` | Login request structure | ~20 |
| `RegisterRequest.java` | Registration request with validation | ~25 |
| `AuthResponse.java` | Authentication response with JWT | ~20 |
| `TaskRequest.java` | Task creation/update request | ~25 |
| `TaskResponse.java` | Task response structure | ~30 |
| **Security** |
| `SecurityConfig.java` | Spring Security configuration with JWT | ~90 |
| `JwtUtil.java` | JWT token generation and validation | ~80 |
| `JwtAuthenticationFilter.java` | JWT request filter | ~60 |
| **Exceptions** |
| `GlobalExceptionHandler.java` | Centralized exception handling | ~100 |
| `ResourceNotFoundException.java` | Custom exception for 404 | ~10 |
| `UserAlreadyExistsException.java` | Custom exception for conflicts | ~10 |
| `ErrorResponse.java` | Standardized error response | ~25 |

### Frontend Files

| File | Purpose | Lines |
|------|---------|-------|
| **Components** |
| `login.component.ts` | Login page logic with form validation | ~60 |
| `login.component.html` | Login page template | ~80 |
| `register.component.ts` | Registration page logic | ~60 |
| `register.component.html` | Registration page template | ~80 |
| `tasks.component.ts` | Dashboard with CRUD operations | ~200 |
| `tasks.component.html` | Dashboard template with task list | ~200 |
| **Services** |
| `auth.service.ts` | Authentication service with JWT handling | ~60 |
| `task.service.ts` | Task CRUD service | ~30 |
| **Guards** |
| `auth.guard.ts` | Route protection guard | ~15 |
| **Interceptors** |
| `auth.interceptor.ts` | Automatic JWT injection | ~15 |
| **Models** |
| `auth.model.ts` | Authentication interfaces | ~15 |
| `task.model.ts` | Task interface and enum | ~15 |
| **Configuration** |
| `app.routes.ts` | Route definitions with guards | ~15 |
| `app.config.ts` | App configuration with providers | ~15 |

---

## 🔗 Component Relationships

### Backend Flow

```
HTTP Request
    ↓
JwtAuthenticationFilter (validates JWT)
    ↓
SecurityConfig (checks authorization)
    ↓
Controller (receives request)
    ↓
Service (business logic)
    ↓
Repository (database access)
    ↓
Entity (database table)
    ↓
Repository → Service → Controller
    ↓
DTO (response)
    ↓
HTTP Response
```

### Frontend Flow

```
User Action
    ↓
Component (UI)
    ↓
Service (business logic)
    ↓
HTTP Request
    ↓
AuthInterceptor (adds JWT token)
    ↓
Backend API
    ↓
HTTP Response
    ↓
Service → Component
    ↓
UI Update
```

---

## 📊 Key File Interactions

### Authentication Flow

```
Frontend                          Backend
--------                          -------
LoginComponent
    ↓
AuthService.login()
    ↓
POST /auth/login
                                  AuthController.login()
                                      ↓
                                  AuthService.login()
                                      ↓
                                  UserRepository.findByUsername()
                                      ↓
                                  JwtUtil.generateToken()
                                      ↓
                                  AuthResponse (with JWT)
    ↑
AuthService (saves token)
    ↓
Router.navigate('/tasks')
```

### Task Creation Flow

```
Frontend                          Backend
--------                          -------
TasksComponent
    ↓
TaskService.createTask()
    ↓
AuthInterceptor (adds JWT)
    ↓
POST /api/tasks
                                  JwtAuthenticationFilter (validates JWT)
                                      ↓
                                  TaskController.createTask()
                                      ↓
                                  TaskService.createTask()
                                      ↓
                                  TaskRepository.save()
                                      ↓
                                  TaskResponse
    ↑
TasksComponent (updates UI)
```

---

## 🎯 Entry Points

### Backend
- **Main Class**: `TaskmanagerApplication.java`
- **Port**: 8080
- **Base URL**: `http://localhost:8080`

### Frontend
- **Main File**: `main.ts`
- **Root Component**: `app.component.ts`
- **Port**: 4200
- **Base URL**: `http://localhost:4200`

---

## 📦 Dependencies

### Backend (pom.xml)
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- spring-boot-starter-security
- spring-boot-starter-validation
- jjwt-api, jjwt-impl, jjwt-jackson (JWT)
- h2 (database)
- lombok
- spring-boot-starter-test

### Frontend (package.json)
- @angular/core (19.2.0)
- @angular/common
- @angular/forms
- @angular/router
- @angular/platform-browser
- rxjs
- tailwindcss (4.1.14)
- typescript (5.7.2)

---

## 🚀 Build Outputs

### Backend
```
Backend/target/
├── classes/                      # Compiled .class files
├── taskmanager-0.0.1-SNAPSHOT.jar # Executable JAR
└── test-classes/                 # Test classes
```

### Frontend
```
Frontend/dist/                    # Production build
└── task-manager/
    ├── index.html
    ├── main-*.js                 # Bundled JavaScript
    ├── styles-*.css              # Bundled CSS
    └── assets/                   # Static assets
```

---

## 📝 Configuration Files

### Backend
- `application.properties` - Database, JWT, CORS, logging
- `pom.xml` - Maven dependencies and build config

### Frontend
- `package.json` - npm dependencies and scripts
- `angular.json` - Angular build configuration
- `tsconfig.json` - TypeScript compiler options

---

## 🔍 Important Directories

### Backend
- `/controller` - API endpoints
- `/service` - Business logic
- `/repository` - Database queries
- `/model` - Database entities
- `/dto` - Request/response objects
- `/security` - Authentication & authorization
- `/exception` - Error handling

### Frontend
- `/components` - UI components
- `/services` - API communication
- `/guards` - Route protection
- `/interceptors` - HTTP middleware
- `/models` - TypeScript types

---

**Total Files Created**: 50+
**Total Lines of Code**: 3500+
**Languages**: Java, TypeScript, HTML, CSS
**Frameworks**: Spring Boot, Angular

---

This structure follows industry best practices for:
- ✅ Separation of concerns
- ✅ Clean architecture
- ✅ SOLID principles
- ✅ Maintainability
- ✅ Scalability

