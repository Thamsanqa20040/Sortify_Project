import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecyclingBusinessPageRoutingModule } from './recycling-business-routing.module';

import { RecyclingBusinessPage } from './recycling-business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecyclingBusinessPageRoutingModule
  ],
  declarations: [RecyclingBusinessPage]
})
export class RecyclingBusinessPageModule {}
