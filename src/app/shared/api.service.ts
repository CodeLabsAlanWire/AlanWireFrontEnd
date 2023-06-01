import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Announcement } from '../home/home.component';

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

export interface AnnouncementReturn {
  success: boolean;
  payload: {
    id: number;
    title: string;
    body: string;
  }
  status: number;
}

export interface AnnouncementsReturn {
  success: boolean;
  payload: Announcement[];
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router:Router) {}

  createAnnouncement(title: string, body: string) {
    let params = {
      title: title,
      body: body
    };
    return this.http.post<AnnouncementReturn>(`${environment.apiRoute}announcements/new`, params)
  }

  getAnnouncement(id: number) {
    let params = {
      id: id
    };
    return this.http.post<AnnouncementsReturn>(`${environment.apiRoute}announcements/view`, params)
  }

  getAnnouncements() {
    return this.http.get<AnnouncementsReturn>(`${environment.apiRoute}announcements/all`)
  }

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

}
