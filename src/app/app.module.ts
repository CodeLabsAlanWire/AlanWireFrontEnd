import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { EmployeeDocsComponent } from './employee-docs/employee-docs.component';
import { AuthInterceptorService } from './shared/auth/auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component'
import { AuthGuard } from './shared/auth/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeDocsComponent,
    NavbarComponent,
    TeamComponent,
    AboutComponent,
  ],

  imports: [
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
