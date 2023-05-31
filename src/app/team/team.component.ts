import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Subscription } from 'rxjs';
import { Employee } from '../shared/employee.interface';
import { GetAllPayload } from '../shared/api.service';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {
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
