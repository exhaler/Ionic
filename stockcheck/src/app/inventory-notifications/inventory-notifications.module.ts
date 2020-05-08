import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryNotificationsPageRoutingModule } from './inventory-notifications-routing.module';

import { InventoryNotificationsPage } from './inventory-notifications.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryNotificationsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InventoryNotificationsPage]
})
export class InventoryNotificationsPageModule {}
