import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Offer} from "../../services/offer/offer";
import {Location} from "../../services/location/location";
import {Category} from "../../services/category/category";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationService} from "../../services/location/location.service";
import {CategoryService} from "../../services/category/category.service";
import {PostOffer} from "../../model/postOffer";
import {UserService} from "../../services/user/user.service";
import { Location as Loc } from '@angular/common';

@Component({
  selector: 'app-update-offer',
  templateUrl: './update-offer.component.html',
  styleUrls: ['./update-offer.component.css']
})
export class UpdateOfferComponent implements OnInit {
  selectedOffer: Offer = <Offer>{};
  param: number = 0;
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
  constructor(private route: ActivatedRoute,private http:HttpClient, private locationService: LocationService,
              private categoryService: CategoryService, private userService:UserService, private router:Router, private loc:Loc) { }

  setOffer(offer: any) {
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

    this.addOfferForm.controls['name'].setValue(this.selectedOffer.name);
    this.addOfferForm.controls['description'].setValue(this.selectedOffer.description);
    this.addOfferForm.controls['salaryLowest'].setValue(this.selectedOffer.salaryLowest);
    this.addOfferForm.controls['salaryHighest'].setValue(this.selectedOffer.salaryHighest);
  }

  postOffer() {
    let value = this.addOfferForm.value;
    console.log(value);
    let name = value.name;
    let description = value.description;
    let salaryLowest = value.salaryLowest;
    let salaryHighest = value.salaryHighest;
    let location = value.location;
    let category = value.category;

    let offer = {
      offerName:name,
      offerId:this.selectedOffer.id,
      userId:this.userService.user$.getValue().id,
      offerDescription:description,
      salaryMin:salaryLowest,
      salaryMax:salaryHighest,
      categoryId:category,
      locationId:location,
    };
    console.log(offer);
    const url = 'https://localhost:7003/api/Offers/Update';
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.userService.getJwt()
      ),
    };
    this.http.put<any>(url, offer, header).subscribe(
      (response: any) => {
        this.userService.refetchUser();
        this.router.navigate(['/profile']);
      },
      (error: any) => {
        console.log(error);
        if (error.status == 401) {
          this.router.navigate(['/auth']);
        }
      }
    );
  }
  ngOnInit(): void {
    let active = false;
    this.route.params.subscribe((params) => {
      this.param = params['id'];
      active = true;
    });
    if (active) {
      let url = 'https://localhost:7003/api/Offers/ById?offerId=' + this.param;
      this.http.get(url).subscribe((res) => {
        this.setOffer(res);
      });
    }
    this.http
      .get<[]>('https://localhost:7003/api/Locations/All')
      .forEach((location) => {
        this.locationService.setLocations(location);
      })
      .then(() => {
        this.locations = this.locationService.getLocations();
        if (this.locations.length > 0) {
          this.addOfferForm.controls['location'].setValue(this.selectedOffer.location.locationId);
        }
      });
    this.http
      .get<[]>('https://localhost:7003/api/Categories/All')
      .forEach((category) => {
        this.categoryService.setCategories(category);
      })
      .then(() => {
        this.categories = this.categoryService.getCategories();
        if (this.categories.length > 0) {
          this.addOfferForm.controls['category'].setValue(this.selectedOffer.category.categoryId);
        }
      });
  }

}
