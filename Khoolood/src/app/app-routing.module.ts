import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { AuthGuard } from './auth/auth.guard';
import { RecentObitsService } from './recent-obits/recent-obits.service';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/recent-obits",
    pathMatch: "full",
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthPageModule)
  },
  {
    path: "obituary-detail/:obituaryId",
    loadChildren: () => import("./obituary-detail/obituary-detail.module").then((m) => m.ObituaryDetailPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'recent-obits',
    loadChildren: () => import('./recent-obits/recent-obits.module').then( m => m.RecentObitsPageModule),
    canLoad: [RecentObitsService]
  },
  {
    path: "app",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
      canLoad: [AuthGuard]
  },  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
