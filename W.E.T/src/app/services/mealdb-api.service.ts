import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";

import {
  MEALDB_Category,
  MEALDB_ListItem,
  MEALDB_Meal,
  MEALDB_ListCategory,
  MEALDB_ListArea,
  MEALDB_ListIngredient,
  MEALDB_GroupListIngredient,
} from "./model";

export const MEALDB_API = {
  ROOT: "https://www.themealdb.com/api/json/v1/1/",
  get FILTER() {
    return this.ROOT + "filter.php";
  },
  get LOOKUP() {
    return this.ROOT + "lookup.php";
  },
  get SEARCH() {
    return this.ROOT + "search.php";
  },
  get CATEGORIES() {
    return this.ROOT + "categories.php";
  },
  get AREAS() {
    return this.ROOT + "list.php?a=list";
  },
  get INGREDIENTS() {
    return this.ROOT + "list.php?i=list";
  },
};

@Injectable({
  providedIn: "root",
})
export class MealdbApiService {
  meals$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  groupedIngredients = [];
  usedIds = new Set();
  constructor(private http: HttpClient) {}

  getMealById(id: string): Observable<MEALDB_Meal> {
    return this.http
      .get(`${MEALDB_API.LOOKUP}?i=${id}`)
      .pipe(map((res: { meals: MEALDB_Meal[] }) => res.meals[0]));
  }

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
        //console.log(res);
        this.meals$.next(this.meals$.getValue().concat(res));
      })
    );
  }

  searchForMeals(query: string): Observable<MEALDB_ListItem> {
    //console.log(query);
    return this.http.get(`${MEALDB_API.SEARCH}?s=${query}`).pipe(
      map((res: any) => {
        if (res.meals) {
          return res.meals;
        } else {
          return null;
        }
      })
    );
  }

  getCategories(): Observable<MEALDB_ListCategory> {
    return this.http.get(`${MEALDB_API.CATEGORIES}`).pipe(
      map((res: any) => {
        if (res.categories) {
          return res.categories;
        } else {
          return null;
        }
      })
    );
  }

  getIngredients(): Observable<MEALDB_ListIngredient[]> {
    return this.http.get(`${MEALDB_API.INGREDIENTS}`).pipe(
      map((res: any) => {
        if (res.meals) {
          return res.meals.sort((a, b) =>
            a.strIngredient > b.strIngredient ? 1 : -1
          );
          // this.groupIngredients(res.meals);
          // return this.groupedIngredients;
        } else {
          return null;
        }
      })
    );
  }

  getAreas(): Observable<MEALDB_ListArea> {
    return this.http.get(`${MEALDB_API.AREAS}`).pipe(
      map((res: any) => {
        if (res.meals) {
          return res.meals;
        } else {
          return null;
        }
      })
    );
  }

  getMealsByArea(area: string): Observable<MEALDB_ListItem> {
    return this.http.get(`${MEALDB_API.FILTER}?a=${area}`).pipe(
      map((res: any) => {
        if (res.meals) {
          return res.meals;
        } else {
          return null;
        }
      })
    );
  }

  getMealsByIngredient(ingredient: string): Observable<MEALDB_ListItem> {
    return this.http.get(`${MEALDB_API.FILTER}?i=${ingredient}`).pipe(
      map((res: any) => {
        if (res.meals) {
          return res.meals;
        } else {
          return null;
        }
      })
    );
  }

  getMealsByCategory(
    category: string,
    checkDupes: boolean = true
  ): Observable<MEALDB_ListItem> {
    return this.http.get(`${MEALDB_API.FILTER}?c=${category}`).pipe(
      map((res: any) => {
        if (res.meals) {
          if (!checkDupes) {
            return res.meals;
          }

          let count = 0;
          let results;
          // check for dupes
          while (
            (!results ||
              !results.strMealThumb ||
              this.usedIds.has(results.idMeal)) &&
            count < 15
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

  groupIngredients(ingredients) {
    let sortedIngredients = ingredients.sort((a, b) =>
      a.strIngredient > b.strIngredient ? 1 : -1
    );
    let currentLetter = false;
    let currentIngredients = [];

    sortedIngredients.forEach((value, index) => {
      if (value.strIngredient.charAt(0) != currentLetter) {
        currentLetter = value.strIngredient.charAt(0);

        let newGroup = {
          letter: currentLetter,
          ingredients: [],
        };

        currentIngredients = newGroup.ingredients;
        this.groupedIngredients.push(newGroup);
      }

      currentIngredients.push(value);
    });
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
