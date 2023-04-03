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
  pageNumber = 1;
  pageSize = 5;
  totalPages = 0;
  sortBy = 'date';
  sortOptions = [
    { value: 'salary', label: 'Salary' },
    { value: 'date', label: 'Date' },
    { value: 'headline', label: 'Headline' },
  ];
  public pages: number[] = [];
  constructor(private offerService: OfferService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOffers().then(() => {
      this.pages = Array(this.totalPages)
        .fill(0)
        .map((_, index) => index + 1);
    });
  }
  async fetchOffers() {
    const url = `https://localhost:7003/api/Offers/WithFilter?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}&orderBy=${this.sortBy}`;
    let filter = this.offerService.getFilter();
    await this.http
      .post<Filter>(url, filter)
      .toPromise()
      .then((res: any) => {
        this.offerService.setOffers(res.pagedOffers);
        this.offers = this.offerService.getOffers();
        this.totalPages = res.totalPages;
      });
  }
  handlePageClick(page: number): void {
    this.pageNumber = page;
    this.fetchOffers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.pageNumber = 1;
    this.fetchOffers();
  }
  onSortOptionChange(event: any): void {
    this.sortBy = event.target.value;
    this.fetchOffers();
  }
}
