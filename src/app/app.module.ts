import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OffersComponent } from 'src/components/offers/offers.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SelectedOfferComponent } from 'src/components/selected-offer/selected-offer.component';
import { AddOfferComponent } from 'src/components/add-offer/add-offer.component';
import { FilterOffersComponent } from 'src/components/filter-offers/filter-offers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from './mat-module';

@NgModule({
  declarations: [
    AppComponent,
    OffersComponent,
    SelectedOfferComponent,
    AddOfferComponent,
    FilterOffersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
