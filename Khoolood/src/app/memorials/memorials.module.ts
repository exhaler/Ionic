import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemorialsPageRoutingModule } from './memorials-routing.module';

import { MemorialsPage } from './memorials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemorialsPageRoutingModule
  ],
  declarations: [MemorialsPage]
})
export class MemorialsPageModule {}
