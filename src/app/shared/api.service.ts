import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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

  getSelf(): Observable<any> {
    return this.http.get<UserPayload>(
      `${environment.apiRoute}users/me`
    );
  }


  validateAdmin() {
    return this.http.get(`${environment.apiRoute}users/get_all`);
  }

  updateEmployee (formData) {
    this.http.post(`${environment.apiRoute}user/update`, formData).subscribe(
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
 

