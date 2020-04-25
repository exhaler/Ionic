import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'updates',
    loadChildren: () => import('./updates/updates.module').then( m => m.UpdatesPageModule)
  },
  {
    path: 'obituaries',
    loadChildren: () => import('./obituaries/obituaries.module').then( m => m.ObituariesPageModule)
  },
  {
    path: 'commemorations',
    loadChildren: () => import('./commemorations/commemorations.module').then( m => m.CommemorationsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
