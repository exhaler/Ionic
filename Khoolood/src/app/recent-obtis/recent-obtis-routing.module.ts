import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentObtisPage } from './recent-obtis.page';

const routes: Routes = [
  {
    path: '',
    component: RecentObtisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentObtisPageRoutingModule {}
