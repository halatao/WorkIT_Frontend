import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user/user.service';
import { PostAuth } from 'src/model/postAuth';
import { Location } from '@angular/common';
import { User } from 'src/services/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  register: boolean;
  valid: boolean;

  login: string = 'Already have account? Login.';
  reg: string = 'Dont have account? Register.';
  btnLogin: string = 'Login';
  btnReg: string = 'Register';
  authLabel: string = '';
  btnLabel: string = '';
  errMessage: string = '';

  authForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private location: Location,
    private router: Router
  ) {
    this.register = false;
    this.authLabel = this.reg;
    this.btnLabel = this.btnLogin;
    this.valid = false;
  }

  ngOnInit(): void {}

  authUser() {
    this.validateForm();
    if (this.valid === false) {
      return;
    }
    let value = this.authForm.value;
    let auth = new PostAuth(value.username, value.password, 'admin');
    if (this.register) {
      const url = 'https://localhost:7003/api/Users/Create';
      this.http.post(url, auth, { responseType: 'text' }).subscribe(
        (response: any) => {
          this.userService.jwt = response;
          this.fetchUser(value.username);
          this.userService.toggleTrue();
          this.location.back();
        },
        (error: any) => {
          if (error.status == 401) {
            this.router.navigate(['/auth']);
          }
          this.errMessage = error.error;
        }
      );
    } else {
      const url = 'https://localhost:7003/api/Users/Login';
      this.http
        .post(url, null, {
          responseType: 'text',
          params: {
            username: value.username,
            password: value.password,
          },
        })
        .subscribe(
          (response: any) => {
            this.userService.jwt = response;
            this.fetchUser(value.username);
          },
          (error: any) => {
            this.errMessage = error.error;
          }
        );
    }
  }

  fetchUser(username: string) {
    const url =
      'https://localhost:7003/api/Users/ByUsername?username=' + username;
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.userService.jwt
      ),
    };
    this.http.get<User>(url, header).subscribe(
      (response: any) => {
        let user = new User(
          response.userId,
          response.userName,
          response.role,
          response.offers,
          response.responses
        );
        this.userService.user = user;
        this.userService.setJwtCookie();
        this.userService.toggleTrue();
        this.location.back();
      },
      (error: any) => {
        if (error.status == 401) {
          this.location.go('/auth');
        }
        console.log(error);
      }
    );
  }

  toggleRegister() {
    this.errMessage = '';
    this.register = !this.register;
    if (this.register) {
      this.authLabel = this.login;
      this.btnLabel = this.btnReg;
    } else {
      this.authLabel = this.reg;
      this.btnLabel = this.btnLogin;
    }
  }

  validateForm() {
    const req = 'One or more field is required';
    let value = this.authForm.value;

    if (value.username == '' || value.password == '') {
      this.errMessage = req;
      this.valid = false;
    } else {
      this.errMessage = '';
      this.valid = true;
    }
    if (this.register) {
      if (value.password2 == '') {
        this.errMessage = req;
        this.valid = false;
      } else if (value.password != value.password2) {
        this.errMessage = 'Passwords are not matching';
        this.valid = false;
      } else {
        this.errMessage = '';
        this.valid = true;
      }
    }
  }
}
