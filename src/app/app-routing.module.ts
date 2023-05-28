import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './shared/auth/auth.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { EmployeeDocsComponent } from './employee-docs/employee-docs.component';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'employee-docs', component: EmployeeDocsComponent, canActivate: [AuthGuard]},
  {path: 'team', component: TeamComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile-edit', component: ProfileEditComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent},
  {path: 'calendar', component: CalendarComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
