import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommemorationsPageRoutingModule } from './commemorations-routing.module';

import { CommemorationsPage } from './commemorations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommemorationsPageRoutingModule
  ],
  declarations: [CommemorationsPage]
})
export class CommemorationsPageModule {}
