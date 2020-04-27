import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObituaryDetailPageRoutingModule } from './obituary-detail-routing.module';

import { ObituaryDetailPage } from './obituary-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObituaryDetailPageRoutingModule
  ],
  declarations: [ObituaryDetailPage]
})
export class ObituaryDetailPageModule {}
