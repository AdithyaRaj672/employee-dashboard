# Employee Management Dashboard

A comprehensive Angular application for managing employee information with modern UI components.  

## 🎯 Project Overview

This is a full-featured Employee Management Dashboard built with Angular v20+, TypeScript, and Angular Material. It provides CRUD operations for employee management with features like filtering, sorting, and real-time updates.

## ✨ Features

- ✅ Employee List with filtering by department
- ✅ Add/Edit/Delete employees
- ✅ View detailed employee information
- ✅ Responsive design with Angular Material
- ✅ Form validation
- ✅ Custom pipes and directives
- ✅ HTTP Interceptors for API communication
- ✅ Route guards for authentication
- ✅ RxJS Observables for reactive programming
- ✅ Mock JSON Server for backend simulation

## 🛠️ Tech Stack

- **Framework**: Angular v20+
- **Language**: TypeScript
- **UI Library**: Angular Material
- **Backend**: Mock JSON Server
- **Styling**: CSS3
- **State Management**: RxJS Observables
- **Forms**:  Reactive Forms + Template-Driven Forms

## 📋 Prerequisites

- Node.js (v16+)
- Angular CLI (v17+)
- Git
- VS Code (optional but recommended)

## 🚀 Installation & Setup

### 1. Navigate to Project Directory
```bash
cd employee-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Additional Packages
```bash
npm install concurrently --save-dev
```

## ▶️ Running the Application

### Development Server (Single Command)
```bash
npm run dev
```

This runs both JSON Server (API) and Angular dev server concurrently.

### OR Run Separately

**Terminal 1 - Start JSON Server:**
```bash
npm run serve-api
```

**Terminal 2 - Start Angular Server:**
```bash
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:4200
- **API**: http://localhost:3000
- **Employees API**: http://localhost:3000/employees

## 📁 Project Structure

```
employee-dashboard/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── employee.model.ts
│   │   ├── services/
│   │   │   ├── employee.service.ts
│   │   │   └── auth.guard.ts
│   │   ├── pipes/
│   │   │   └── department-filter.pipe.ts
│   │   ├── directives/
│   │   │   └── highlight-salary.directive.ts
│   │   ├── interceptors/
│   │   │   └── http.interceptor.ts
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── employee-list/
│   │   │   ├── employee-detail/
│   │   │   ├── add-edit-employee/
│   │   │   └── confirm-dialog/
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.*
│   ├── assets/
│   │   └── db.json
│   ├── styles. css
│   └── main.ts
├── package.json
├── angular.json
└── README.md
```

## 🔄 CRUD Operations

### Create Employee
1. Click "Add Employee" in navbar
2. Fill the form
3. Click "Add Employee"

### Read Employee
1. View employee list
2. Click on employee row to view details

### Update Employee
1. Click edit icon on employee list
2. Modify details
3. Click "Update Employee"

### Delete Employee
1. Click delete icon
2. Confirm deletion

## 🎨 Key Components

| Component | Purpose |
|-----------|---------|
| NavbarComponent | Navigation |
| EmployeeListComponent | Display all employees |
| EmployeeDetailComponent | Show employee details |
| AddEditEmployeeComponent | Add/Edit employees |
| ConfirmDialogComponent | Delete confirmation |

## 🔧 Services

- **EmployeeService**:  CRUD operations
- **AuthGuard**: Route protection
- **HttpConfigInterceptor**: HTTP request/response handling

## 📚 Learning Outcomes

- Angular components and modules
- Angular Material integration
- Reactive Forms & Form Validation
- Services & Dependency Injection
- Angular Routing
- RxJS Observables & Operators
- HTTP Client & Interceptors
- Custom Pipes & Directives
- Lifecycle Hooks
- Type-safe Development with TypeScript

## 🐛 Troubleshooting

### Port 4200 already in use
```bash
ng serve --port 4300
```

### Port 3000 already in use
```bash
npm run serve-api -- --port 3001
```

### Module errors
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

MIT License - feel free to use for learning purposes

---
