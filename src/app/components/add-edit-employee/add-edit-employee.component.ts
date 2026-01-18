import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/emplyee.model';

// Angular Material (adjust if your HTML uses different controls)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    // Material modules
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  isEditMode = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  employeeId: number | null = null;

  departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];
  roles = ['Manager', 'Developer', 'Designer', 'Analyst', 'Consultant', 'Coordinator'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      department: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      joinDate: ['', Validators.required],
      isActive: [true]
    });
  }

  checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = Number(id);
      this.loadEmployee(this.employeeId);
    }
  }

  loadEmployee(id: number): void {
    this.isLoading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue(employee);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load employee';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isEditMode && this.employeeId) {
      const updatedEmployee: Employee = {
        id: this.employeeId,
        ...this.employeeForm.value
      };

      this.employeeService.updateEmployee(this.employeeId, updatedEmployee).subscribe({
        next: () => {
          this.successMessage = 'Employee updated successfully!';
          this.isLoading = false;
          setTimeout(() => this.router.navigate(['/employees']), 1500);
        },
        error: (error) => {
          this.errorMessage = 'Failed to update employee';
          this.isLoading = false;
          console.error(error);
        }
      });

    } else {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe({
        next: () => {
          this.successMessage = 'Employee added successfully!';
          this.isLoading = false;
          setTimeout(() => this.router.navigate(['/employees']), 1500);
        },
        error: (error) => {
          this.errorMessage = 'Failed to add employee';
          this.isLoading = false;
          console.error(error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }

  // Form getters
  get nameControl() {
    return this.employeeForm.get('name');
  }

  get emailControl() {
    return this.employeeForm.get('email');
  }

  get salaryControl() {
    return this.employeeForm.get('salary');
  }
}
