import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Employee } from '../shared/employee.interface';
import { Subscription } from 'rxjs';
import { UsersService } from '../shared/users.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy{
  userSub: Subscription;

  apiData!: Employee;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userSub = this.usersService.employeeData.subscribe(
      (data: Employee) => {
        this.apiData = data;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  editUser() {
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

}
