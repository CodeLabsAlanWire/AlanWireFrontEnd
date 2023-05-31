import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface SelfPayload {
  success: boolean;
  payload: {
    user: Employee;
    is_admin: boolean;
  }
  status: number;
}

export interface UserPayload {
  success: boolean;
  payload: Employee;
  status: number;
}

export interface GetAllPayload {
  success: boolean;
  payload: [];
  status: number;
}

// export interface ValidateAdminResponse {
//   success: boolean;
//   payload: string;
//   status: number;
// }

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router:Router) {}

  getAll(): Observable<any> {
    return this.http.get<GetAllPayload>(`${environment.apiRoute}users/get_all`);
  }

  getUser(userId: number): Observable<any> {
    let params = {
      user_id: userId
    }
    return this.http.post<UserPayload>(`${environment.apiRoute}users/view`, params);
  }

  updateEmployee (formData): Observable<any> {
    return this.http.post<UserPayload>(`${environment.apiRoute}users/update`, formData);
  }

  // validateAdmin(userToken): Observable<any>{
  //   let params = {
  //     token: userToken
  //   }
  //   return this.http.post<ValidateAdminResponse>(`${environment.apiRoute}users/validate`, params);
  // }

}
