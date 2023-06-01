import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../shared/api.service';



export interface Announcement {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  announcementSub = new Subscription;
    primaryColor= "#005596";

  announcements: Announcement[] = [
    // {
    //   title: 'Welcome to our Website',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam sapien in volutpat ornare. Duis dapibus odio vitae elit tincidunt maximus. Nunc sit amet nulla ac ante pharetra suscipit. Nulla facilisi. Nullam lobortis erat vel consequat imperdiet.',
    //   imageUrl: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    // },
    // {
    //   title: 'PTO Request Changes',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam sapien in volutpat ornare. Duis dapibus odio vitae elit tincidunt maximus. Nunc sit amet nulla ac ante pharetra suscipit. Nulla facilisi. Nullam lobortis erat vel consequat imperdiet.',
    //   imageUrl: 'https://example.com/announcement2.jpg'
    // },
    // {
    //   title: 'Summer Family Event',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam sapien in volutpat ornare. Duis dapibus odio vitae elit tincidunt maximus. Nunc sit amet nulla ac ante pharetra suscipit. Nulla facilisi. Nullam lobortis erat vel consequat imperdiet.',
    //   imageUrl: 'https://example.com/announcement2.jpg'
    // },
    // {
    //   title: 'Welcome to our Website',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam sapien in volutpat ornare. Duis dapibus odio vitae elit tincidunt maximus. Nunc sit amet nulla ac ante pharetra suscipit. Nulla facilisi. Nullam lobortis erat vel consequat imperdiet.',
    //   imageUrl: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    // },
    // {
    //   title: 'Welcome to our Website',
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam sapien in volutpat ornare. Duis dapibus odio vitae elit tincidunt maximus. Nunc sit amet nulla ac ante pharetra suscipit. Nulla facilisi. Nullam lobortis erat vel consequat imperdiet.',
    //   imageUrl: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    // },
  ];

  currentAnnouncement: Announcement = this.announcements[0];
  currentImage = 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  nextImage = 1;
  interval: any;

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.nextImage = this.nextImage === 2 ? 0 : this.nextImage + 1;
      this.currentImage = `https://via.placeholder.com/1200x600/007aff/ffffff?text=Image+${this.nextImage + 1}`;
      this.currentAnnouncement = this.announcements[this.nextImage];
    }, 5000);
    this.announcementSub = this.apiService.getAnnouncements().subscribe((res) => {
      if (res.success) {
        this.announcements = res.payload;
        console.log(this.announcements)
      }
    });
  }

  hideModal() {
    document.getElementById("modal").style.display = 'none';
  }

  openModal(index: number) {
    document.getElementById('modalTitle').innerText = this.announcements[index].title;
    document.getElementById('modalBody').innerText = this.announcements[index].body;
    document.getElementById("modal").style.display = 'block';
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}


