import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SourcePage } from './source.page';

const routes: Routes = [
  {
    path: '',
    component: SourcePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SourcePageRoutingModule {}
