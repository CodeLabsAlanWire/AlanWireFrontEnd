import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.interface';
import { Router } from '@angular/router';

export interface UserPayload {
  success: boolean;
  payload: Employee;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router:Router) {}

  getEmployeeData(): Observable<any> {
    return this.http.get<UserPayload>(
      'https://alanwireapi.codefilabsapi.com/api/v1/users/me'
    );
  }

  updateEmployee (formData) {
    const apiUrl = 'https://alanwireapi.codefilabsapi.com/api/v1/user/update';

    this.http.post(apiUrl, formData).subscribe(
      (response: UserPayload) => {
        console.log('API Response:', response);
        if (response.success) {
          this.router.navigate(['./profile']);
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
  }
