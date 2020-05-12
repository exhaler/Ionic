import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  STORAGE_KEY = 'favoriteMeals';

  constructor(public storage: Storage) { }

  isFavorite(mealId) {
    return this.getAllFavoriteMeals().then(result => {
      return result && result.indexOf(mealId) !== -1;
    });
  }
 
  favoriteMeal(mealId) {
    return this.getAllFavoriteMeals().then(result => {
      if (result) {
        result.push(mealId);
        return this.storage.set(this.STORAGE_KEY, result);
      } else {
        return this.storage.set(this.STORAGE_KEY, [mealId]);
      }
    });
  }
 
  unfavoriteMeal(mealId) {
    return this.getAllFavoriteMeals().then(result => {
      if (result) {
        var index = result.indexOf(mealId);
        result.splice(index, 1);
        return this.storage.set(this.STORAGE_KEY, result);
      }
    });
  }
 
  getAllFavoriteMeals() {
    return this.storage.get(this.STORAGE_KEY);
  }
}
