import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/services/offer/offer.service';
import { UserService } from 'src/services/user/user.service';
import * as url from 'url';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  replies: any[] = [];
  offers: any[] = [];
  role: string = '';
  constructor(
    private userService: UserService,
    public offerService: OfferService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.userService.logged) {
      this.userService.refetchUser();
    }
    this.role = this.userService.user.role.name;
    if (this.role == 'user') {
      this.replies = this.userService.user.responses;
    } else if (this.role == 'recruiter') {
      this.offers = this.userService.user.offers;
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
      this.userService.refetchUser();
    });
  }

  toggleAddOffer() {
    this.offerService.addOfferForm = !this.offerService.addOfferForm;
  }
}
