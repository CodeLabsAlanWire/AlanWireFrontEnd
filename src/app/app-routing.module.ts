import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './shared/auth/auth.component';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
