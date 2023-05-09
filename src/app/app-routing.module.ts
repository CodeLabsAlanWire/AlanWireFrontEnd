import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDocsComponent } from './employee-docs/employee-docs.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: 'employee-docs', component: EmployeeDocsComponent},
  {path: 'settings', component: SettingsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
