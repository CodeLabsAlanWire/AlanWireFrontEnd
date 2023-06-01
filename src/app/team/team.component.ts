import { Component } from '@angular/core';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  allUsers: any[]; // Modify the type according to your user data structure

  constructor() {
    // Initialize the allUsers array with sample data
    this.allUsers = [
      [1, 'John', 'Doe'],
      [2, 'Jane', 'Smith'],
      [3, 'Alice', 'Johnson']
      // Add more user data as needed
    ];
  }

  navigateToProfile(userId: number) {
    // Implement your navigation logic here
    console.log('Navigating to profile of user with ID:', userId);
  }
}
