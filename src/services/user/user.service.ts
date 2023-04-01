import { Injectable } from '@angular/core';
import { User } from './user';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  logged: boolean;
  jwt: string = '';
  user: User = <User>{};
  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.logged = false;
  }

  fetchUser() {
    const url =
      'https://localhost:7003/api/Users/ByUsername?username=' +
      this.cookieService.get('username');
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.cookieService.get('jwt')
      ),
    };
    return this.http.get<User>(url, header);
  }

  refetchUser() {
    this.fetchUser().subscribe(
      (response: any) => {
        let user = new User(
          response.userId,
          response.userName,
          response.role,
          response.offers,
          response.responses
        );
        this.user = user;
        this.toggleTrue();
      },
      (error: any) => {}
    );
  }

  getJwt() {
    return this.cookieService.get('jwt');
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
