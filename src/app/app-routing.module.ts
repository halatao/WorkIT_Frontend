import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOfferComponent } from 'src/components/add-offer/add-offer.component';
import { OffersComponent } from 'src/components/offers/offers.component';
import { SelectedOfferComponent } from 'src/components/selected-offer/selected-offer.component';

const routes: Routes = [
  { path: 'offer', component: SelectedOfferComponent },
  { path: 'offers', component: OffersComponent },
  { path: '', component: OffersComponent },
  { path: 'add_offer', component: AddOfferComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
