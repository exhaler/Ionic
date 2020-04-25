import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObituariesPage } from './obituaries.page';

const routes: Routes = [
  {
    path: '',
    component: ObituariesPage
  },
  {
    path: 'obituary-detail',
    loadChildren: () => import('./obituary-detail/obituary-detail.module').then( m => m.ObituaryDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObituariesPageRoutingModule {}
