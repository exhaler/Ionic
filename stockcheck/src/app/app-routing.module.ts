import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inventory-list',
    pathMatch: 'full'
  },
  {
    path: 'inventory-list',
    loadChildren: () => import('./inventory-list/inventory-list.module').then( m => m.InventoryListPageModule)
  },
  {
    path: 'inventory-edit/:id',
    loadChildren: () => import('./inventory-edit/inventory-edit.module').then( m => m.InventoryEditPageModule)
  },
  {
    path: 'inventory-notifications',
    loadChildren: () => import('./inventory-notifications/inventory-notifications.module').then( m => m.InventoryNotificationsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
