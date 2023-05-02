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
import { MaterialModule } from './mat-module';
import { AuthComponent } from 'src/components/auth/auth.component';
import { AccountComponent } from 'src/components/account/account.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { UpdateOfferComponent } from '../components/update-offer/update-offer.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    OffersComponent,
    SelectedOfferComponent,
    AddOfferComponent,
    FilterOffersComponent,
    AuthComponent,
    AccountComponent,
    ProfileComponent,
    WelcomeComponent,
    UpdateOfferComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  exports: [MatPaginatorModule, MatTooltipModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
