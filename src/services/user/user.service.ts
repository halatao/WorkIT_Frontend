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
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(<any>{});
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
        this.user$.next(user); // emit new value
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
    if (this.user$ && this.user$.value) { // add a type guard to check if user$ and its value are not null
      this.cookieService.set('username', this.user$.value.username);
    }
  }

  resetUserCredentials() {
    this.jwt = '';
    this.user$.next(<any>{}); // emit new value
    this.deleteCookies();
    this.toggleFalse();
  }

  deleteCookies() {
    this.cookieService.deleteAll();
  }
}
