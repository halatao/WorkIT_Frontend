import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/services/location/location.service';
import { Location } from 'src/services/location/location';
import { Category } from 'src/services/category/category';
import { CategoryService } from 'src/services/category/category.service';
import { PostOffer } from 'src/model/postOffer';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user/user.service';

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
    description: new FormControl('', Validators.required),
    salaryLowest: new FormControl(0),
    salaryHighest: new FormControl(0),
    category: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private router: Router,
    private userService: UserService
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
    let description = value.description;
    let salaryLowest = value.salaryLowest;
    let salaryHighest = value.salaryHighest;
    let location = value.location;
    let category = value.category;
    let offer = new PostOffer(
      name,
      description,
      this.userService.user.id,
      category,
      location,
      salaryLowest,
      salaryHighest
    );
    const url = 'https://localhost:7003/api/Offers/Create';
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.userService.jwt
      ),
    };
    this.http.post<PostOffer>(url, offer, header).subscribe(
      (response: any) => {},
      (error: any) => {
        if (error.status == 401) {
          this.router.navigate(['/auth']);
        }
      }
    );
  }
}
