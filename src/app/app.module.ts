import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardComponent } from './shared/auth-guard/auth-guard.component';
import { EmployeeDocsComponent } from './employee-docs/employee-docs.component';
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    AuthGuardComponent,
    EmployeeDocsComponent,
    NavbarComponent,
    SettingsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
