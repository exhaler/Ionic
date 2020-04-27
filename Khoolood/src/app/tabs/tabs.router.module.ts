import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          },
          
        ]
      },
      {
        path: 'communities',
        children: [
          {
            path: '',
            loadChildren: () => import('../communities/communities.module').then(m => m.CommunitiesPageModule)
          }
        ]
      },
      {
        path: 'memorials',
        children: [
          {
            path: '',
            loadChildren: () => import('../memorials/memorials.module').then(m => m.MemorialsPageModule)
          }
        ]
      },
      {
        path: 'saved',
        children: [
          {
            path: '',
            loadChildren: () => import('../saved/saved.module').then(m => m.SavedPageModule)
          }
        ]
      }
    ]
  },
  {
    path: 'notifications',
    loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('../user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
  },
  // /app/ redirect
  {
    path: '',
    redirectTo: 'app/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
  providers: []
})
export class TabsPageRoutingModule {}
