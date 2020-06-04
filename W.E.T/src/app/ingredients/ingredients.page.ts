import { Component, OnInit, ViewChild } from "@angular/core";

import { take } from "rxjs/operators";

import { MealdbApiService } from "../services/mealdb-api.service";
import { MEALDB_GroupListIngredient } from "../services/model";

@Component({
  selector: "app-ingredients",
  templateUrl: "./ingredients.page.html",
  styleUrls: ["./ingredients.page.scss"],
})
export class IngredientsPage implements OnInit {
  @ViewChild("filterBar", { static: false }) filterBar;
  groupedIngredients: MEALDB_GroupListIngredient[];
  isLoading: boolean = false;
  ios: boolean;
  showSearchbar: boolean;
  filterIngredients = "";

  constructor(private mealdb: MealdbApiService) {}

  ngOnInit() {
    this.isLoading = true;
    this.mealdb
      .getIngredients()
      .pipe(take(1))
      .subscribe((results) => {
        this.isLoading = false;
        this.groupedIngredients = results;
      });
  }

  focusFilter() {
    setTimeout(() => {
      this.filterBar.setFocus();
    }, 150);
  }
}
