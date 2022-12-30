import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/services/offer/offer';
import { OfferService } from 'src/services/offer/offer.service';
import { Filter } from 'src/model/Filter';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  offers: Offer[] = [];
  constructor(private offerService: OfferService, private http: HttpClient) {}

  ngOnInit(): void {
    const url = 'https://localhost:7003/api/Offers/WithFilter';
    let filter = this.offerService.getFilter();
    this.http.post<Filter>(url, filter).subscribe((response: any) => {
      this.offerService.setOffers(response);
      this.offers = this.offerService.getOffers();
      console.log(this.offers);
    });
  }
}
