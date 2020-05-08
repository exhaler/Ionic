import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryNotificationsPage } from './inventory-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryNotificationsPageRoutingModule {}
