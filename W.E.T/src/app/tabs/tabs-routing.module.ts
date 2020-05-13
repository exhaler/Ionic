import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("../home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: "categories",
        loadChildren: () =>
          import("../categories/categories.module").then(
            (m) => m.CategoriesPageModule
          ),
      },
      {
        path: "area",
        loadChildren: () =>
          import("../area/area.module").then((m) => m.AreaPageModule),
      },
      {
        path: "ingredients",
        loadChildren: () =>
          import("../ingredients/ingredients.module").then(
            (m) => m.IngredientsPageModule
          ),
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
