import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageSitesPageRoutingModule } from './manage-sites-routing.module';

import { ManageSitesPage } from './manage-sites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageSitesPageRoutingModule
  ],
  declarations: [ManageSitesPage]
})
export class ManageSitesPageModule {}
