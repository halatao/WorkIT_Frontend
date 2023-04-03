import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import { OfferService } from 'src/services/offer/offer.service';
import { UserService } from 'src/services/user/user.service';
import * as url from 'url';
import {User} from "../../services/user/user";

let input = Input;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit,OnChanges {
  @Input() replies: any[] = [];
  @Input() offers: any[] = this.userService.user$.getValue().offers;
  role: string = '';
  constructor(
    private userService: UserService,
    public offerService: OfferService,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refetch();
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log(changes);
    this.refetch();
  }
  refetch(){
    if (this.userService.logged) {
      this.userService.refetchUser();
    }
    this.role = this.userService.user$.getValue().role.name;
    if (this.role == 'user') {
      this.replies = this.userService.user$.getValue().responses;
    } else if (this.role == 'recruiter') {
      this.offers = this.userService.user$.getValue().offers;
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
      this.cd.detectChanges();
    });
  }

  toggleAddOffer() {
    this.offerService.addOfferForm = !this.offerService.addOfferForm;
  }
}
