import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { EmployeeDocsComponent } from './employee-docs/employee-docs.component';
import { AuthInterceptorService } from './shared/auth/auth-interceptor.service';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component'
import { AuthGuard } from './shared/auth/auth.guard';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    EmployeeDocsComponent,
    NavbarComponent,
    TeamComponent,
    AboutComponent,
    CalendarComponent,
    ProfileComponent,
    ProfileEditComponent,
    AdminComponent
  ],

  imports: [
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [AuthGuard, HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
