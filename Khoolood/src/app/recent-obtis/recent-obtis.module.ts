import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentObtisPageRoutingModule } from './recent-obtis-routing.module';

import { RecentObtisPage } from './recent-obtis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentObtisPageRoutingModule
  ],
  declarations: [RecentObtisPage]
})
export class RecentObtisPageModule {}
