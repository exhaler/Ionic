import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryNotificationsPageRoutingModule } from './inventory-notifications-routing.module';

import { InventoryNotificationsPage } from './inventory-notifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryNotificationsPageRoutingModule
  ],
  declarations: [InventoryNotificationsPage]
})
export class InventoryNotificationsPageModule {}
