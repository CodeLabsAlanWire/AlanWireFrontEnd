import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, UserData } from '../shared/auth/auth.service';
import { Subscription } from 'rxjs';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  authSub: Subscription;
  isAuthenticated!: boolean;
  validatedAdminSub: Subscription;
  isAdmin: boolean;


  storedUser = localStorage.getItem('userData');

  userId: UserData = JSON.parse(this.storedUser as string);

  public showProfileDropdown = false;

  constructor(private authService: AuthService, private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.authSub = this.authService.currentUser.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.validatedAdminSub = this.authService.validAdmin.subscribe(res => {
      this.isAdmin = res;
    })
  }

  logOut() {
    this.authService.signOut();
  }

  navigateToProfile(id: number) {
    this.usersService.getUserData(id);
    this.router.navigate([`profile/${id}`])
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.validatedAdminSub.unsubscribe();
  }
}
