import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AddEditEmployeeComponent } from './components/add-edit-employee/add-edit-employee.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'employees', 
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employee/:id', 
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'add-employee', 
    component: AddEditEmployeeComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'edit-employee/:id', 
    component: AddEditEmployeeComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home' }
];
