import { Injectable } from '@angular/core';
import { Offer } from './offer';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  offers: Offer[] = [];
  constructor() {}

  setOffers(offers: any[]) {
    this.offers = [];
    offers.forEach((offer) => {
      this.offers.push(
        new Offer(
          offer.id,
          offer.name,
          offer.salaryLowest,
          offer.salaryHighest,
          offer.location,
          offer.category,
          offer.user,
          offer.responses
        )
      );
    });
  }

  getOffers() {
    return this.offers;
  }
}
