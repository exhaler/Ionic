import { Component, OnInit } from "@angular/core";

import { take } from 'rxjs/operators';

import { Config } from "@ionic/angular";

import { MealdbApiService } from "../services/mealdb-api.service";
import { MEALDB_ListCategory } from "../services/model";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
})
export class CategoriesPage implements OnInit {
  ios: boolean;
  showSearchbar: boolean;
  queryText = "";
  categories: MEALDB_ListCategory;
  isLoading: boolean = false;

  constructor(public config: Config, private mealdb: MealdbApiService) {}

  ngOnInit() {
    this.ios = this.config.get("mode") === "ios";
    this.isLoading = true;
    this.mealdb
      .getCategories()
      .pipe(take(1))
      .subscribe((results) => {
        this.isLoading = false;
        this.categories = results;
      });
  }

  filterCategories() {
    console.log(this.queryText);
  }
}
