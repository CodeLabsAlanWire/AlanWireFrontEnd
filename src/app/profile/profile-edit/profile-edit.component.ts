import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService, SelfPayload } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Employee } from 'src/app/shared/employee.interface';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  employeeSub: Subscription;
  userInfo: Employee;
  profileForm: FormGroup;
  validatedAdminSub: Subscription;
  isAdmin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.employeeSub = this.usersService.employeeData.subscribe((res: Employee) => {
      this.userInfo = res;
    });
    this.validatedAdminSub = this.authService.validAdmin.subscribe(res => {
      this.isAdmin = res;
    })
    this.profileForm = this.formBuilder.group({
      phone: this.userInfo.phone || '',
      email: this.userInfo.email || '',
      emergencyContactName: this.userInfo.emergency_contact_name || '',
      emergencyContactPhone: this.userInfo.emergency_contact_phone || '',
      hiringDate: this.userInfo.hiring_date || '',
      availableEto: this.userInfo.available_eto || '',
      imageUrl: this.userInfo.image_url || '',
      admin: ''
    });
  }

  onSubmit() {
    const formData = {
      user_id: this.userInfo.id,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone,
      emergency_contact_name: this.profileForm.value.emergencyContactName,
      emergency_contact_phone: this.profileForm.value.emergencyContactPhone,
      hiring_date: this.profileForm.value.hiringDate,
      available_eto: this.profileForm.value.availableEto,
      image_url: this.profileForm.value.imageUrl,
      admin: this.profileForm.value.admin
    };
    this.usersService.updateUser(formData);
  }

  ngOnDestroy(): void {
      this.employeeSub.unsubscribe();
  }
}
