import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecyclingCentersPage } from './recycling-centers.page';

const routes: Routes = [
  {
    path: '',
    component: RecyclingCentersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecyclingCentersPageRoutingModule {}
