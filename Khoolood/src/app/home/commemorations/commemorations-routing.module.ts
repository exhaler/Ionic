import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommemorationsPage } from './commemorations.page';

const routes: Routes = [
  {
    path: '',
    component: CommemorationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommemorationsPageRoutingModule {}
