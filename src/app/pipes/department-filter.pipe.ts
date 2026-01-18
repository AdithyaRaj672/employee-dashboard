import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/emplyee.model';

@Pipe({
  name: 'departmentFilter',
  standalone: true
})
export class DepartmentFilterPipe implements PipeTransform {
  transform(employees: Employee[], department: string): Employee[] {
    if (!department || department === '') {
      return employees;
    }
    return employees.filter(emp => emp. department. toLowerCase() === department.toLowerCase());
  }
}
