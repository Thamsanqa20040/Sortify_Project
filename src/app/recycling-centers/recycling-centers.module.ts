import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecyclingCentersPageRoutingModule } from './recycling-centers-routing.module';

import { RecyclingCentersPage } from './recycling-centers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecyclingCentersPageRoutingModule
  ],
  declarations: [RecyclingCentersPage]
})
export class RecyclingCentersPageModule {}
