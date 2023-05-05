import { Component, } from '@angular/core';
// import { toggleAnimation } from './animation-utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent {
toggleAnimation() {
throw new Error('Method not implemented.');
}
  showDropdown: boolean = false;

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }
}
//  toggleAnimation() {
//   const button = document.querySelector('.settings-button');
//   button.classList.add('bounce');
//   setTimeout(() => {
//     button.classList.remove('bounce');
//   }, 500);
// }
