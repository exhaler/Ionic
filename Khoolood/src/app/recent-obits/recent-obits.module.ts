import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentObitsPageRoutingModule } from './recent-obits-routing.module';

import { RecentObitsPage } from './recent-obits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentObitsPageRoutingModule
  ],
  declarations: [RecentObitsPage]
})
export class RecentObitsPageModule {}
