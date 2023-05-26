import { Component, OnDestroy, OnInit, } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

isAuthenticated!: boolean;
  
public showProfileDropdown = false;

constructor(private authService: AuthService){}


  ngOnInit(): void {
      this.authService.currentUser.subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }
  
  logOut(){
    this.authService.signOut();
  }
  ngOnDestroy(): void {
    this.authService.currentUser.unsubscribe();
}



