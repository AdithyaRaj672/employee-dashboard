import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Employee } from '../models/emplyee.model';

@Injectable({
  providedIn:  'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      tap(employees => this.employeesSubject. next(employees)),
      catchError(this.handleError)
    );
  }

  // Get single employee by ID
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Add new employee
  addEmployee(employee:  Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      tap(newEmployee => {
        const currentEmployees = this.employeesSubject.getValue();
        this.employeesSubject.next([...currentEmployees, newEmployee]);
      }),
      catchError(this.handleError)
    );
  }

  // Update employee
  updateEmployee(id:  number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee).pipe(
      tap(updatedEmployee => {
        const currentEmployees = this.employeesSubject. getValue();
        const index = currentEmployees.findIndex(e => e.id === id);
        if (index !== -1) {
          currentEmployees[index] = updatedEmployee;
          this.employeesSubject. next([...currentEmployees]);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Delete employee
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentEmployees = this.employeesSubject.getValue();
        this.employeesSubject.next(currentEmployees.filter(e => e.id !== id));
      }),
      catchError(this.handleError)
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
