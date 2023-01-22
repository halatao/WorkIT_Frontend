import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/services/location/location.service';
import { Location } from 'src/services/location/location';
import { Category } from 'src/services/category/category';
import { CategoryService } from 'src/services/category/category.service';
import { PostOffer } from 'src/model/postOffer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css'],
})
export class AddOfferComponent implements OnInit {
  locations: Location[] = [];
  categories: Category[] = [];
  addOfferForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    salaryLowest: new FormControl(0),
    salaryHighest: new FormControl(0),
    category: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.http
      .get<[]>('https://localhost:7003/api/Locations/All')
      .forEach((location) => {
        this.locationService.setLocations(location);
      })
      .then(() => {
        this.locations = this.locationService.getLocations();
        console.log(this.locations);
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
  postOffer() {
    let value = this.addOfferForm.value;
    let name = value.name;
    let salaryLowest = value.salaryLowest;
    let salaryHighest = value.salaryHighest;
    let location = value.location;
    let category = value.category;
    let offer = new PostOffer(
      name,
      salaryLowest,
      salaryHighest,
      location,
      category,
      1
    );
    const url = 'https://localhost:7003/api/Offers/Create';
    this.http.post<PostOffer>(url, offer).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        if (error.status == 401) {
          this.router.navigate(['/auth']);
        }
      }
    );
  }
}
