import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemorialsPage } from './memorials.page';

const routes: Routes = [
  {
    path: '',
    component: MemorialsPage
  },
  {
    path: 'individuals',
    loadChildren: () => import('./individuals/individuals.module').then( m => m.IndividualsPageModule)
  },
  {
    path: 'families',
    loadChildren: () => import('./families/families.module').then( m => m.FamiliesPageModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('./groups/groups.module').then( m => m.GroupsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemorialsPageRoutingModule {}
