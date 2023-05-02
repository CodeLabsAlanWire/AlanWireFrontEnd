import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service/user.service';
import { User } from 'src/app/users/user.service/user';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss']
})

export class LoginEmailComponent implements OnInit {
  loginForm: FormGroup
  loginFormValues
  subs = new Subscription()
  submitting = false
  hasError = false
  errorMsg: string
  currentUser: User
  loggedIn: boolean
  constructor(
    private fb: FormBuilder, private loginService: UserService,
    private router: Router
  ) {
    this.currentUser = this.loginService.currentUserValue
  }

  ngOnInit() {
    if (this.currentUser) {
      this.loggedIn = true
      this.router.navigate(['dashboard'])
    }
    this.createFormControls();
    this.createForm();
  }

  login() {
    this.submitting = true
    this.hasError = false
    if (this.loginForm.invalid) {
      this.hasError = true
      this.submitting = false
      return;
    }
    const form = this.loginForm.value
    const params = { email: form.email, password: form.password }
    this.subs.add(
      this.loginService.loginByEmail(params)
        .pipe(first())
        .subscribe(user => {
          this.submitting = false
          if (user) {
            const loginData = { userName: `${user.first_name}` }
            this.router.navigate(['dashboard'], {state: {loginData: loginData}})
          }
        }, error => {
          this.submitting = false
          this.errorMsg = 'Email and Password not found.  Please verify that you entered the correct email and password combination.'
          console.error(error)
        })
    )
  }

  createFormControls() {
    this.loginFormValues = {
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    }
  }

  createForm() {
    this.loginForm = this.fb.group(this.loginFormValues);
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
