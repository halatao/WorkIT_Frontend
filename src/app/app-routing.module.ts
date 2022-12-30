import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOfferComponent } from 'src/components/add-offer/add-offer.component';
import { FilterOffersComponent } from 'src/components/filter-offers/filter-offers.component';
import { OffersComponent } from 'src/components/offers/offers.component';
import { SelectedOfferComponent } from 'src/components/selected-offer/selected-offer.component';

const routes: Routes = [
  { path: 'offers/:id', component: SelectedOfferComponent },
  { path: 'offers', component: OffersComponent },
  { path: '', component: FilterOffersComponent },
  { path: 'add_offer', component: AddOfferComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
