import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageReportsPageRoutingModule } from './manage-reports-routing.module';

import { ManageReportsPage } from './manage-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageReportsPageRoutingModule
  ],
  declarations: [ManageReportsPage]
})
export class ManageReportsPageModule {}
