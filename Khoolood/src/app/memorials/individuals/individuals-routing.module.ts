import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndividualsPage } from './individuals.page';

const routes: Routes = [
  {
    path: '',
    component: IndividualsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndividualsPageRoutingModule {}
