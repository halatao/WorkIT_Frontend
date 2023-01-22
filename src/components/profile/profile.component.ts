import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  replies: any[] = [];
  offers: any[] = [];
  role: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.role = this.userService.user.role.name;

    if (this.role == 'user') {
      this.replies = this.userService.user.responses;
    } else if (this.role == 'recruiter') {
      this.offers = this.userService.user.offers;
    }
  }
}
