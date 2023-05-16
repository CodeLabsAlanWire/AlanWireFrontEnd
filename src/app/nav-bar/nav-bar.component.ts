import { Component, } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent {
  secondaryColor = "#003A66";

  showProfileDropdown = false;

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }
}
