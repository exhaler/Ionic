import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObituaryDetailPage } from './obituary-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ObituaryDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObituaryDetailPageRoutingModule {}
