import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/emplyee.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalEmployees = 0;
  totalDepartments = 0;
  activeEmployees = 0;
  averageSalary = 0;
  departments: { name: string; count: number }[] = [];
  recentEmployees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService.employees$.subscribe(employees => {
      this.totalEmployees = employees.length;
      this.activeEmployees = employees.filter(e => e.isActive).length;
      this.averageSalary = employees.length > 0
        ? Math.round(employees.reduce((sum, e) => sum + e.salary, 0) / employees.length)
        : 0;

      const deptMap = new Map<string, number>();
      employees.forEach(e => {
        deptMap.set(e.department, (deptMap.get(e.department) || 0) + 1);
      });
      this.departments = Array.from(deptMap.entries()).map(([name, count]) => ({ name, count }));
      this.totalDepartments = this.departments.length;

      this.recentEmployees = [...employees]
        .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
        .slice(0, 5);
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
