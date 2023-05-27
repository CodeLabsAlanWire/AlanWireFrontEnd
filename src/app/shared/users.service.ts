import { Injectable } from '@angular/core';
import { ApiService, UserPayload } from './api.service';
import { AuthService, UserData } from './auth/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Employee } from './employee.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  employeeData = new BehaviorSubject<Employee | null>(null);

  constructor(private apiService: ApiService) { }

  getUserData() {
    this.apiService.getSelf().subscribe((result: UserPayload) => {
        this.employeeData.next(result.payload);
      },
      (error: any) => {
        console.error('Error:', error);
    });
  }

}
