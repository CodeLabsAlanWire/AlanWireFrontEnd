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

export interface GetAllPayload {
  success: boolean;
  payload: Employee[];
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router:Router) {}

  getAll(): Observable<any> {
    return this.http.get<GetAllPayload>(`${environment.apiRoute}users/get_all`);
  }

  getSelf(): Observable<any> {
    return this.http.get<UserPayload>(`${environment.apiRoute}users/me`);
  }

  updateEmployee (formData): Observable<any> {
    return this.http.post(`${environment.apiRoute}users/update`, formData)
  }

  validateAdmin(): Observable<any>{
    return this.http.get(`${environment.apiRoute}users/validate`);
  }

}
