import { Component } from "@angular/core";
import { MealdbApiService } from "../services/mealdb-api.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  meals$ = this.mealdb.meals$;
  isLoading: boolean = false;
  Arr = Array;
  num: number = 5;

  constructor(private mealdb: MealdbApiService) {
    this.loadData();
  }

  loadData($event?) {
    this.isLoading = true;
    this.mealdb
      .getWhatToEat()
      .pipe(take(1))
      .subscribe((done) => {
        this.isLoading = false;
        if ($event) {
          $event.target.complete();
        }
      });
  }
}
