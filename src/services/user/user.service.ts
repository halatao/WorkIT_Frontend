import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  logged: boolean;
  jwt: string = '';
  user: User = <User>{};
  constructor() {
    this.logged = false;
  }
  toggleTrue() {
    this.logged = true;
  }
}
