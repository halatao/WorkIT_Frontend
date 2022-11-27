import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css'],
})
export class AddOfferComponent implements OnInit {
  addOfferForm: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    salaryLowest:new FormControl(0),
    salaryHighest:new FormControl(0),
    category: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}
  postOffer() {}
}
