import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOfferComponent } from 'src/components/add-offer/add-offer.component';
import { AuthComponent } from 'src/components/auth/auth.component';
import { FilterOffersComponent } from 'src/components/filter-offers/filter-offers.component';
import { OffersComponent } from 'src/components/offers/offers.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { SelectedOfferComponent } from 'src/components/selected-offer/selected-offer.component';
import {UpdateOfferComponent} from "../components/update-offer/update-offer.component";

const routes: Routes = [
  { path: 'offers/:id', component: SelectedOfferComponent },
  { path: 'offers', component: OffersComponent },
  { path: '', component: FilterOffersComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'update/:id', component:UpdateOfferComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
