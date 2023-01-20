import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/services/location/location.service';
import { Location } from 'src/services/location/location';
import { Category } from 'src/services/category/category';
import { CategoryService } from 'src/services/category/category.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Filter } from 'src/model/Filter';
import { OfferService } from 'src/services/offer/offer.service';

@Component({
  selector: 'app-filter-offers',
  templateUrl: './filter-offers.component.html',
  styleUrls: ['./filter-offers.component.css'],
})
export class FilterOffersComponent implements OnInit {
  locations: Location[] = [];
  categories: Category[] = [];
  salaryLowest: string = '0';
  filterOfferForm: FormGroup = new FormGroup({
    salaryMin: new FormControl(0),
    category: new FormControl([]),
    location: new FormControl([]),
  });

  constructor(
    private http: HttpClient,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.http
      .get<[]>('https://localhost:7003/api/Locations/All')
      .forEach((location) => {
        this.locationService.setLocations(location);
      })
      .then(() => {
        this.locations = this.locationService.getLocations();
      });
    this.http
      .get<[]>('https://localhost:7003/api/Categories/All')
      .forEach((category) => {
        this.categoryService.setCategories(category);
      })
      .then(() => {
        this.categories = this.categoryService.getCategories();
      });
  }
  filterOffers() {
    let value = this.filterOfferForm.value;
    let location = value.location;
    let category = value.category;
    let salaryMin = value.salaryMin;

    let filter = new Filter(salaryMin, location, category);

    this.offerService.setFilter(filter);
  }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + '.000' + 'Kč';
    }
    return `${value}`;
  }
  updateLable() {
    let ret = this.filterOfferForm.value.salaryMin;
    this.salaryLowest = ret;
  }
}
