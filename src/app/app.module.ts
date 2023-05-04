import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
<<<<<<< Updated upstream
import { EmployeeDocsComponent } from './employee-docs/employee-docs.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginEmailComponent } from './authentication/login-email/login-email.component';
import { SignupEmailComponent } from './authentication/signup-email/signup-email/signup-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

=======
import { SignupComponent } from './signup/signup.component';
import { EmployeeDocsComponent } from './employee-docs/employee-docs.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthInterceptorService } from './shared/auth/auth-interceptor.service';
>>>>>>> Stashed changes


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
<<<<<<< Updated upstream
    EmployeeDocsComponent,
    NavBarComponent,
    LoginEmailComponent,
    SignupEmailComponent,
    FormsModule,
    ReactiveFormsModule
     ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
=======
    SignupComponent,
    EmployeeDocsComponent,
    NavBarComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],


  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],

>>>>>>> Stashed changes
  bootstrap: [AppComponent],
})
export class AppModule {}
