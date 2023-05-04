import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Offer } from 'src/services/offer/offer';
import { OfferService } from 'src/services/offer/offer.service';
import { Filter } from 'src/model/Filter';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  offers: MatTableDataSource<Offer> = new MatTableDataSource<Offer>();
  pageNumber = 1;
  pageSize = 5;
  totalPages = 0;
  sortBy = 'date';
  sortOptions = [
    { value: 'salary', label: 'Salary' },
    { value: 'date', label: 'Date' },
    { value: 'headline', label: 'Headline' },
  ];
  searchTerm: string = '';
  public pages: number[] = [];
  displayedColumns: string[] = ['name', 'salary', 'location', 'actions'];
  displayedData: Offer[] = [];
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
        this.offerService.setOffers(res.ordered);
        this.offers.data = this.offerService.getOffers();
        this.totalPages = res.totalPages;

        const startIndex = 0;
        const endIndex = startIndex + this.pageSize;
        this.displayedData = this.offers.data.slice(startIndex, endIndex);
      });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedData = this.offers.data.slice(startIndex, endIndex);
  }

  onSortChange(event: any) {
    this.sortBy = event.value;
    this.fetchOffers().then(() => {
      this.pages = Array(this.totalPages)
        .fill(0)
        .map((_, index) => index + 1);
    });
  }

  applyFilter() {
    let data = this.offers.data.filter((offer) => {
      return offer.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
    this.displayedData = data;
  }
}
