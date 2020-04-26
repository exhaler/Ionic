import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { AuthGuard } from './auth/auth.guard';
import { RecentObits } from './recent-obits/recent-obits.service';

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
    path: 'recent-obits',
    loadChildren: () => import('./recent-obits/recent-obits.module').then( m => m.RecentObitsPageModule),
    canLoad: [RecentObits]
  },
  {
    path: "app",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
      canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
