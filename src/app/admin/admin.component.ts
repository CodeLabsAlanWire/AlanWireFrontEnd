import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Subscription } from 'rxjs';
import { Employee } from '../shared/employee.interface';
import { GetAllPayload } from '../shared/api.service';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

    allUsersSub: Subscription;
    allUsers = [];
    announcementForm = new FormGroup({
      title: new FormControl<string>(''),
      body: new FormControl<string>('')
    });

    constructor(
      private apiService: ApiService,
      private usersService: UsersService,
      private formBuilder: FormBuilder,
      private router: Router
      ) { }

    ngOnInit(): void {
      this.allUsersSub = this.apiService.getAll().subscribe((res: GetAllPayload) => {
        this.allUsers = res.payload;
        console.log(res.payload);
      });
    }

    navigateToProfile(id: number) {
      this.usersService.getUserData(id);
      this.router.navigate(['profile/id'])
    }

    onAnnouncementSubmit() {
      this.apiService.createAnnouncement(this.announcementForm.value.title, this.announcementForm.value.body).subscribe((res) => {
        if (res.success) {
          document.getElementById('success-div').style.display = 'block';
          this.announcementForm.reset();
        }
        else {
          document.getElementById('error-div').style.display = 'block';
        }
      })
    }

    ngOnDestroy(): void {
      this.allUsersSub.unsubscribe();
    }
  }
