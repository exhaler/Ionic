import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopNewsPageRoutingModule } from './top-news-routing.module';

import { TopNewsPage } from './top-news.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopNewsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TopNewsPage]
})
export class TopNewsPageModule {}
