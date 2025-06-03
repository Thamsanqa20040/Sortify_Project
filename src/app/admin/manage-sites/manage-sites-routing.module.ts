import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSitesPage } from './manage-sites.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSitesPageRoutingModule {}
