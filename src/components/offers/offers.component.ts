import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/offer/offer';
import { OfferService } from 'src/offer/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  offers: Offer[] = [];
  constructor(private offerService: OfferService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<[]>('http://localhost:8080/offers')
      .forEach((offer) => {
        this.offerService.setOffers(offer);
      })
      .then(() => {
        this.offers = this.offerService.getOffers();
        console.log(this.offers);
      });
  }
}
