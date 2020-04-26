import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentObitsPage } from './recent-obits.page';

const routes: Routes = [
  {
    path: '',
    component: RecentObitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentObitsPageRoutingModule {}
