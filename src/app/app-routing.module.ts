import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersComponent } from 'src/components/offers/offers.component';
import { SelectedOfferComponent } from 'src/components/selected-offer/selected-offer.component';

const routes: Routes = [
  { path: 'offer', component: SelectedOfferComponent },
  { path: 'offers', component: OffersComponent },
  { path: '', component: OffersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
