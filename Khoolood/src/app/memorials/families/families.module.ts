import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamiliesPageRoutingModule } from './families-routing.module';

import { FamiliesPage } from './families.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamiliesPageRoutingModule
  ],
  declarations: [FamiliesPage]
})
export class FamiliesPageModule {}
