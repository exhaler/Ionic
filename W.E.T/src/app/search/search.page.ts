import { Component, OnInit, ViewChild } from "@angular/core";

import { take } from "rxjs/operators";

import { MealdbApiService } from "../services/mealdb-api.service";
import { MEALDB_ListItem } from "../services/model";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
  @ViewChild("searchbar", { static: false }) searchbar;
  queryText = "";
  meals: MEALDB_ListItem;
  isLoading: boolean = false;
  Arr = Array;
  num: number = 5;

  constructor(private mealdb: MealdbApiService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.searchbar.setFocus();
  }

  search() {
    this.isLoading = true;
    this.mealdb
      .searchForMeals(this.queryText)
      .pipe(take(1))
      .subscribe((results) => {
        this.meals = results;
        this.isLoading = false;
      });
  }
}
