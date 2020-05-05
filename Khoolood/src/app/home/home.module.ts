import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ObituariesComponent } from "./obituaries/obituaries.component";
import { CommemorationsComponent } from "./commemorations/commemorations.component";
import { UpdatesComponent } from "./updates/updates.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ObituariesComponent, CommemorationsComponent, UpdatesComponent]
})
export class HomePageModule {}
