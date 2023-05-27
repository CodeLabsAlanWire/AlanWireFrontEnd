import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  phone: string;
  emergencyContactName: string;
  email: string;
  emergencyContactPhone: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      phone: [''],
      emergencyContactName: [''],
      email: [''],
      emergencyContactPhone: ['']
    });
  }

  onSubmit() {
    const formData = this.profileForm.value;
    // API Calls
  }
}
