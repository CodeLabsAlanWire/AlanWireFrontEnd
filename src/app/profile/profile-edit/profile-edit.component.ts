import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { Employee } from 'src/app/shared/employee.interface';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  employeeSub: Subscription;
  userInfo: Employee;
  profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.employeeSub = this.usersService.employeeData.subscribe((res: Employee) => {
      this.userInfo = res;
    });
    this.profileForm = this.formBuilder.group({
      phone: this.userInfo.phone || '',
      email: this.userInfo.email || '',
      emergencyContactName: this.userInfo.emergency_contact_name || '',
      emergencyContactPhone: this.userInfo.emergency_contact_phone || '',
    });
  }

  onSubmit() {
    const formData = {
      id: this.userInfo.id,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone,
      emergency_contact_name: this.profileForm.value.emergencyContactName,
      emergency_contact_phone: this.profileForm.value.emergencyContactPhone,
    };

    this.apiService.updateEmployee(formData);
  }
}
