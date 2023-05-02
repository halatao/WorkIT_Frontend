import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { OfferService } from 'src/services/offer/offer.service';
import { UserService } from 'src/services/user/user.service';
import * as url from 'url';
import { User } from '../../services/user/user';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { PostOffer } from '../../model/postOffer';
import { Router } from '@angular/router';

let input = Input;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  replies$: Observable<any> = new Observable<any>();
  offers$: Observable<any> = new Observable<any>();
  role: string = '';
  constructor(
    private userService: UserService,
    public offerService: OfferService,
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refetch();
  }
  onOfferPost(param: any) {
    console.log(param);
    console.log('onOfferPost called');

    const url = 'https://localhost:7003/api/Offers/Create';
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.userService.getJwt()
      ),
    };
    this.http.post<PostOffer>(url, param, header).subscribe(
      (response: any) => {
        this.userService.refetchUser();
        this.offerService.addOfferForm = false;
        this.refetch();
      },
      (error: any) => {
        if (error.status == 401) {
          this.router.navigate(['/auth']);
        }
      }
    );
  }

  refetch() {
    if (this.userService.logged) {
      this.userService.refetchUser();
    }

    const url =
      'https://localhost:7003/api/Users/ByUsername?username=' +
      this.cookieService.get('username');
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.cookieService.get('jwt')
      ),
    };

    this.role = this.userService.user$.getValue().role.name;
    if (this.role == 'user') {
      interface Response {
        responses: any[];
      }
      this.replies$ = this.http.get<Response>(url, header).pipe(
        map(
          (response) => {
            return response.responses;
          },
          (error: any) => {
            if (error.status == 401) {
              this.router.navigate(['/auth']);
            }
          }
        )
      );
      this.offers$.subscribe((data) => {
        console.log(data);
      });
    } else if (this.role == 'recruiter') {
      interface Offers {
        offers: any[];
      }
      this.offers$ = this.http.get<Offers>(url, header).pipe(
        map(
          (response) => {
            return response.offers;
          },
          (error: any) => {
            if (error.status == 401) {
              this.router.navigate(['/auth']);
            }
          }
        )
      );
      this.offers$.subscribe((data) => {
        console.log(data);
      });
    }
  }

  deleteOffer(offerId: number) {
    const url = 'https://localhost:7003/api/Offers/Delete?offerId=' + offerId;
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.userService.getJwt()
      ),
    };
    this.http.delete(url, header).subscribe((res) => {
      this.refetch();
    });
  }

  toggleAddOffer() {
    this.offerService.addOfferForm = !this.offerService.addOfferForm;
  }
}
