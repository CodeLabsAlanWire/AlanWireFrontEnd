import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UserPayload } from '../shared/api.service';
import { Employee } from '../shared/employee.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  apiSub: Subscription;

  apiData!: Employee;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiSub = this.apiService.getEmployeeData().subscribe(
      (data: UserPayload) => {
        console.log(data);
        this.apiData = data.payload;
        console.log(this.apiData);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

}
