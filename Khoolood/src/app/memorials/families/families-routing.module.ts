import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamiliesPage } from './families.page';

const routes: Routes = [
  {
    path: '',
    component: FamiliesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamiliesPageRoutingModule {}
