import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "meal/:mealId",
    loadChildren: () =>
      import("./meal/meal.module").then((m) => m.MealPageModule),
  },
  {
    path: "search",
    loadChildren: () =>
      import("./search/search.module").then((m) => m.SearchPageModule),
  },
  {
    path: "category/:categoryId",
    loadChildren: () =>
      import("./categories/category/category.module").then(
        (m) => m.CategoryPageModule
      ),
  },
  {
    path: "area/:areaId",
    loadChildren: () =>
      import("./areas/area/area.module").then((m) => m.AreaPageModule),
  },
  {
    path: "ingredient/:ingredientId",
    loadChildren: () =>
      import("./ingredients/ingredient/ingredient.module").then(
        (m) => m.IngredientPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
