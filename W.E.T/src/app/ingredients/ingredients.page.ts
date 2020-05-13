import { Component, OnInit } from "@angular/core";

import { take } from 'rxjs/operators';

import { MealdbApiService } from '../services/mealdb-api.service';
import { MEALDB_ListIngredient } from '../services/model';

@Component({
  selector: "app-ingredients",
  templateUrl: "./ingredients.page.html",
  styleUrls: ["./ingredients.page.scss"],
})
export class IngredientsPage implements OnInit {
  ingredients: MEALDB_ListIngredient;
  isLoading: boolean = false;

  constructor(private mealdb: MealdbApiService) {}

  ngOnInit() {
    this.isLoading = true;
    this.mealdb
      .getIngredients()
      .pipe(take(1))
      .subscribe((results) => {
        this.isLoading = false;
        this.ingredients = results;
      });
  }
}
