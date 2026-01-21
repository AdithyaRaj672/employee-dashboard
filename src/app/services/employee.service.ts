import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Employee } from '../models/emplyee.model';

@Injectable({
  providedIn:  'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  // Mock data for development/demo
  private mockEmployees: Employee[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Manager",
      department: "IT",
      salary: 120000,
      joinDate: "2020-01-15",
      isActive: true
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "Developer",
      department: "IT",
      salary: 85000,
      joinDate: "2021-03-20",
      isActive: true
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      role: "Designer",
      department: "Marketing",
      salary: 75000,
      joinDate: "2019-06-10",
      isActive: true
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@company.com",
      role: "Analyst",
      department: "Finance",
      salary: 95000,
      joinDate: "2020-11-05",
      isActive: true
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.brown@company.com",
      role: "Consultant",
      department: "HR",
      salary: 88000,
      joinDate: "2021-08-12",
      isActive: false
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      role: "Developer",
      department: "IT",
      salary: 82000,
      joinDate: "2022-01-08",
      isActive: true
    }
  ];

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      tap(employees => this.employeesSubject.next(employees)),
      catchError(error => {
        // Use mock data if API is not available
        console.warn('API not available, using mock data');
        this.employeesSubject.next(this.mockEmployees);
        return of(this.mockEmployees);
      })
    );
  }

  // Get single employee by ID
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        // Use mock data if API is not available
        const employee = this.mockEmployees.find(e => e.id === id);
        if (employee) {
          return of(employee);
        }
        return throwError(() => new Error('Employee not found'));
      })
    );
  }

  // Add new employee
  addEmployee(employee:  Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      tap(newEmployee => {
        const currentEmployees = this.employeesSubject.getValue();
        this.employeesSubject.next([...currentEmployees, newEmployee]);
      }),
      catchError(error => {
        // Use mock data if API is not available
        const newId = this.mockEmployees.length > 0 
          ? Math.max(...this.mockEmployees.map(e => e.id)) + 1 
          : 1;
        const newEmployee = { ...employee, id: newId } as Employee;
        this.mockEmployees.push(newEmployee);
        const currentEmployees = this.employeesSubject.getValue();
        this.employeesSubject.next([...currentEmployees, newEmployee]);
        return of(newEmployee);
      })
    );
  }

  // Update employee
  updateEmployee(id:  number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee).pipe(
      tap(updatedEmployee => {
        const currentEmployees = this.employeesSubject.getValue();
        const index = currentEmployees.findIndex(e => e.id === id);
        if (index !== -1) {
          currentEmployees[index] = updatedEmployee;
          this.employeesSubject.next([...currentEmployees]);
        }
      }),
      catchError(error => {
        // Use mock data if API is not available
        const index = this.mockEmployees.findIndex(e => e.id === id);
        if (index !== -1) {
          this.mockEmployees[index] = employee;
          const currentEmployees = this.employeesSubject.getValue();
          const currIndex = currentEmployees.findIndex(e => e.id === id);
          if (currIndex !== -1) {
            currentEmployees[currIndex] = employee;
            this.employeesSubject.next([...currentEmployees]);
          }
          return of(employee);
        }
        return throwError(() => new Error('Employee not found'));
      })
    );
  }

  // Delete employee
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentEmployees = this.employeesSubject.getValue();
        this.employeesSubject.next(currentEmployees.filter(e => e.id !== id));
      }),
      catchError(error => {
        // Use mock data if API is not available
        const index = this.mockEmployees.findIndex(e => e.id === id);
        if (index !== -1) {
          this.mockEmployees.splice(index, 1);
        }
        const currentEmployees = this.employeesSubject.getValue();
        this.employeesSubject.next(currentEmployees.filter(e => e.id !== id));
        return of(void 0);
      })
    );
  }

  // Load employees on service initialization
  private loadEmployees(): void {
    this.getEmployees().subscribe();
  }

  // Error handling
  private handleError(error: any) {
    console.error('Error occurred:', error);
    let errorMessage = 'An error occurred.  Please try again.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
