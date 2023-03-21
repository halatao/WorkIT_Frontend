import { Injectable } from '@angular/core';
import { Filter } from 'src/model/filter';
import { Offer } from './offer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  offers: Offer[] = [];
  filter: Filter = new Filter(0, [], [], new Date('2000'), '');
  addOfferForm: boolean = false;
  constructor() {}

  setOffers(offers: any[]) {
    this.offers = [];
    offers.forEach((offer) => {
      this.offers.push(
        new Offer(
          offer.offerId,
          offer.offerName,
          offer.offerDescription,
          offer.salaryMin,
          offer.salaryMax,
          offer.location,
          offer.category,
          offer.user,
          offer.responses
        )
      );
    });
  }

  setFilter(filter: Filter) {
    this.filter = filter;
  }

  getOffers() {
    return this.offers;
  }

  clearOffers() {
    this.offers = [];
  }

  getFilter() {
    return this.filter;
  }
}
