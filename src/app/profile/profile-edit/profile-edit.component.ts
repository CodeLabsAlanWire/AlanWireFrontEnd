import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { Employee } from 'src/app/shared/employee.interface';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  @Input() userInfo: Employee;
  profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      phone: [''],
      emergencyContactName: [''],
      email: [''],
      emergencyContactPhone: [''],
    });
  }

  onSubmit() {
    const formData = {
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone,
      emergency_contact_name: this.profileForm.value.emergencyContactName,
      emergency_contact_phone: this.profileForm.value.emergencyContactPhone,
    };

    this.apiService.updateEmployee(formData);
  }
}
