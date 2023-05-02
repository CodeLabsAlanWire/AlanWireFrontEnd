import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Subscription } from 'rxjs'
import { UserService } from 'src/app/users/user.service/user.service'
import { PasswordValidator } from './password-validator'
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-email',
  templateUrl: './signup-email.component.html',
  styleUrls: ['./signup-email.component.scss']
})

export class SignupEmailComponent implements OnInit {
  registerForm: FormGroup
  registerFormValues
  subs = new Subscription()
  submitting = false
  hasError = false
  errorMsg: string
  constructor(
    private fb: FormBuilder, private registerService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.createFormControls()
    this.createForm()
  }

  register() {
    this.submitting = true
    this.hasError = false
    if (this.registerForm.invalid) {
      this.hasError = true
      this.submitting = false
      return;
    }
    const form = this.registerForm.value
    const params = {email: form.email, password: form.password, password_confirmation: form.passwordConfirmation}
    this.subs.add(
      this.registerService.registerUserByEmail(params)
      .pipe(first())
      .subscribe( data => {
        this.submitting = false
        if (data.user) {
          this.router.navigate(['/dashboard'])
        }
      }, error => {
        this.submitting = false
        console.error(error)
      })
    )
  }

  createFormControls() {
    this.registerFormValues = {
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      passwordConfirmation: ['', Validators.compose([Validators.required, PasswordValidator('password')])],
    }
  }

  createForm() {
    this.registerForm = this.fb.group(this.registerFormValues);
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
