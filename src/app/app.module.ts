import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeDocsComponent } from './employee-docs/employee-docs.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginEmailComponent } from './authentication/login-email/login-email.component';
import { SignupEmailComponent } from './authentication/signup-email/signup-email/signup-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeDocsComponent,
    NavBarComponent,
    LoginEmailComponent,
    SignupEmailComponent,
    FormsModule,
    ReactiveFormsModule
     ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
