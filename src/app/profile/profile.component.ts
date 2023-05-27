import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

 apiData: any;

 constructor(private router: Router, private http: HttpClient, private apiService: ApiService) {}

 ngOnInit() {
  this.fetchEmployeeData();
}

 editProfile () {
    this.router.navigate(['/profile-edit'])
  }

  fetchEmployeeData () {
    this.apiService.getEmployeeData().subscribe(
      (data: any) => {
        this.apiData = data;
      },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    }
  }
