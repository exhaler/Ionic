import { Component, OnInit } from "@angular/core";

import { MealdbApiService } from "../../services/mealdb-api.service";
import { MEALDB_ListItem } from "../../services/model";
import { ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"],
})
export class CategoryPage implements OnInit {
  meals: MEALDB_ListItem;
  categoryName: string;
  isLoading: boolean = false;

  constructor(
    private mealdb: MealdbApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.categoryName = this.activatedRoute.snapshot.paramMap.get(
      "categoryId"
    );
    this.mealdb
      .getMealsByCategory(this.categoryName, false)
      .pipe(take(1))
      .subscribe((results) => {
        this.isLoading = false;
        this.meals = results;
      });
  }
}
