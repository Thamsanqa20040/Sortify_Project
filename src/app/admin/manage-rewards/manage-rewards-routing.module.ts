import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageRewardsPage } from './manage-rewards.page';

const routes: Routes = [
  {
    path: '',
    component: ManageRewardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRewardsPageRoutingModule {}
