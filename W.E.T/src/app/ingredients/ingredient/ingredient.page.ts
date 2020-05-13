import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';

import { MEALDB_ListItem } from '../../services/model';
import { MealdbApiService } from '../../services/mealdb-api.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.page.html',
  styleUrls: ['./ingredient.page.scss'],
})
export class IngredientPage implements OnInit {
  meals: MEALDB_ListItem;
  ingredientName: string;

  constructor(
    private mealdb: MealdbApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ingredientName = this.activatedRoute.snapshot.paramMap.get("ingredientId");
    this.mealdb
      .getMealsByIngredient(this.ingredientName)
      .pipe(take(1))
      .subscribe((results) => {
        this.meals = results;
      });
  }
}
