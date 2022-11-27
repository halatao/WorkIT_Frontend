import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectedOfferComponent } from 'src/selected-offer/selected-offer.component';

const routes: Routes = [{ path: 'offer', component: SelectedOfferComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
