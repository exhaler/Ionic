import { Injectable } from "@angular/core";

import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  STORAGE_KEY = "favoriteMeals";
  hasMatch = false;

  constructor(public storage: Storage) {}

  isFavorite(mealId) {
    return this.getAllFavoriteMeals().then((result) => {
      return (
        result.filter((val) => {
          return val.idMeal === mealId;
        }).length > 0
      );
    });
  }

  favoriteMeal(meal) {
    return this.getAllFavoriteMeals().then((result) => {
      if (result) {
        result.push(meal);
        return this.storage.set(this.STORAGE_KEY, result);
      } else {
        return this.storage.set(this.STORAGE_KEY, [meal]);
      }
    });
  }

  unfavoriteMeal(meal) {
    return this.getAllFavoriteMeals().then((result) => {
      if (result) {
        var removeIndex = result
          .map(function (item) {
            return item.idMeal;
          })
          .indexOf(meal.idMeal);
        result.splice(removeIndex, 1);
        return this.storage.set(this.STORAGE_KEY, result);
      }
    });
  }

  getAllFavoriteMeals() {
    return this.storage.get(this.STORAGE_KEY);
  }
}
