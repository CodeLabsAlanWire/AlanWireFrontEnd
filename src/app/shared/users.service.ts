import { Injectable } from '@angular/core';
import { ApiService, SelfPayload, UserPayload } from './api.service';
import { AuthService, UserData } from './auth/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Employee } from './employee.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  employeeData = new BehaviorSubject<Employee | null>(null);

  constructor(private apiService: ApiService, private router: Router) { }

  getUserData(id: number) {
    this.apiService.getUser(id).subscribe((result: UserPayload) => {
        this.employeeData.next(result.payload);
        console.log("/me response: ", result.payload)
      },
      (error: any) => {
        console.error('Error:', error);
    });
  }

  updateUser(formData) {
    this.apiService.updateEmployee(formData).subscribe(
      (response: SelfPayload) => {
        if (response.success) {
          this.employeeData.next(response.payload.user);
          this.router.navigate(['./profile/' + response.payload.user.id]);
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

}
