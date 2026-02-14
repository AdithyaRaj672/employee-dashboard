import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/emplyee.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { HighlightSalaryDirective } from '../../directives/highlight-salary.directive';
import { DepartmentFilterPipe } from '../../pipes/department-filter.pipe';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    // Angular Material
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,

    // Custom
    HighlightSalaryDirective,
    DepartmentFilterPipe,

  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  employees: Employee[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'role',
    'department',
    'salary',
    'joinDate',
    'actions'
  ];

  isLoading = false;
  errorMessage = '';
  selectedDepartment = '';
  departments: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.employeeService.employees$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (employees) => {
          this.employees = employees;
          this.extractDepartments();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load employees';
          this.isLoading = false;
          console.error(error);
        }
      });
  }

  extractDepartments(): void {
    this.departments = [...new Set(this.employees.map(emp => emp.department))];
  }

  viewEmployee(id: number): void {
    this.router.navigate(['/employee', id]);
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit-employee', id]);
  }

  deleteEmployee(id: number, name: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => this.loadEmployees(),
          error: (error) => {
            this.errorMessage = 'Failed to delete employee';
            console.error(error);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
