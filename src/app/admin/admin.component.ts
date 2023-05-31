import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Subscription } from 'rxjs';
import { Employee } from '../shared/employee.interface';
import { GetAllPayload } from '../shared/api.service';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

    allUsersSub: Subscription;
    allUsers = [];

    constructor(private apiService: ApiService, private usersService: UsersService, private router: Router) { }

    ngOnInit(): void {
      this.allUsersSub = this.apiService.getAll().subscribe((res: GetAllPayload) => {
        this.allUsers = res.payload;
        console.log(res.payload);
      })
    }

    navigateToProfile(id: number) {
      this.usersService.getUserData(id);
      this.router.navigate(['profile/id'])
    }

    ngOnDestroy(): void {

    }
  }
