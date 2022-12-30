import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Offer } from 'src/services/offer/offer';

@Component({
  selector: 'app-selected-offer',
  templateUrl: './selected-offer.component.html',
  styleUrls: ['./selected-offer.component.css'],
})
export class SelectedOfferComponent implements OnInit {
  selectedOffer: Offer = <Offer>{};

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    let active = false;
    let param = 0;
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      param = params['id'];
      active = true;
    });
    if (active) {
      let url = 'https://localhost:7003/api/Offers/ById?offerId=' + param;
      this.http.get(url).subscribe((res) => {
        this.setOffer(res);
      });
    }
  }
  setOffer(offer: any) {
    console.log(offer.offerDescription);
    this.selectedOffer = new Offer(
      offer.offerId,
      offer.offerName,
      offer.offerDescription,
      offer.salaryMin,
      offer.salaryMax,
      offer.location,
      offer.category,
      offer.user,
      offer.reponses
    );
    console.log(this.selectedOffer);
  }
}
