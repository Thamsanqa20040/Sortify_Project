import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageRewardsPageRoutingModule } from './manage-rewards-routing.module';

import { ManageRewardsPage } from './manage-rewards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageRewardsPageRoutingModule
  ],
  declarations: [ManageRewardsPage]
})
export class ManageRewardsPageModule {}
