import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { MEALDB_Category, MEALDB_ListItem } from "./model";

export const MEALDB_API = {
  ROOT: "https://www.themealdb.com/api/json/v1/1/",
  get FILTER() {
    return this.ROOT + "filter.php";
  },
};

@Injectable({
  providedIn: "root",
})
export class MealdbApiService {
  meals$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  usedIds = new Set();
  constructor(private http: HttpClient) {}

  getWhatToEat(): Observable<void> {
    const categoryAsArray = Object.keys(MEALDB_Category).map(
      (i) => MEALDB_Category[i]
    );
    const getRandomCategories = this._randomFromArray(categoryAsArray, 12);
    const arrayOfHttpCalls = getRandomCategories.map((category) =>
      this.getMealsByCategory(category)
    );
    return forkJoin(arrayOfHttpCalls).pipe(
      map((res: Array<MEALDB_ListItem>) => {
        console.log(res);
        this.meals$.next(this.meals$.getValue().concat(res));
      })
    );
  }

  getMealsByCategory(category: string): Observable<MEALDB_ListItem> {
    return this.http.get(`${MEALDB_API.FILTER}?c=${category}`).pipe(
      map((res: any) => {
        if (res.meals) {
          let count = 0;
          let results;
          // check for dupes
          while (
            (!results ||
              !results.strMealThumb ||
              this.usedIds.has(results.idMeal)) &&
            count < 12
          ) {
            results = this._randomFromArray(res.meals)[0];
            count++;
          }
          this.usedIds.add(results.idMeal);
          return results;
        }
      })
    );
  }

  private _randomFromArray(array, times = 1): any[] {
    const results = [];
    for (let i = 0; i < times; i++) {
      const randomIndex = Math.floor(Math.random() * array.length);
      results.push(array[randomIndex]);
    }

    return results;
  }
}
