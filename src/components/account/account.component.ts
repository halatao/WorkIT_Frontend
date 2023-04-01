import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/services/user/user';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUser();
  }
  fetchUser() {
    this.userService.fetchUser().subscribe(
      (response: any) => {
        let user = new User(
          response.userId,
          response.userName,
          response.role,
          response.offers,
          response.responses
        );
        this.userService.user = user;
        this.userService.toggleTrue();
        console.log(user);
      },
      (error: any) => {}
    );
  }
  logout() {
    this.userService.resetUserCredentials();
  }
}
