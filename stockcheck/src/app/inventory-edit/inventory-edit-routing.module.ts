import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryEditPage } from './inventory-edit.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryEditPageRoutingModule {}
