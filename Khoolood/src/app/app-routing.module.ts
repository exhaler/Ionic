import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "recent-obtis",
    pathMatch: "full",
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then((m) => m.AuthPageModule),
  },
  {
    path: 'recent-obtis',
    loadChildren: () => import('./recent-obtis/recent-obtis.module').then( m => m.RecentObtisPageModule)
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
