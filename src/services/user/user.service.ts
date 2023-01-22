import { Injectable } from '@angular/core';
import { User } from './user';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  logged: boolean;
  jwt: string = '';
  user: User = <User>{};
  constructor(private cookieService: CookieService) {
    this.logged = false;
  }
  toggleTrue() {
    this.logged = true;
  }

  toggleFalse() {
    this.logged = false;
  }

  setJwtCookie() {
    this.cookieService.set('jwt', this.jwt);
    this.cookieService.set('username', this.user.username);
  }

  resetUserCredentials() {
    this.jwt = '';
    this.user = <User>{};
    this.deleteCookies();
    this.toggleFalse();
  }

  deleteCookies() {
    this.cookieService.deleteAll();
  }
}
