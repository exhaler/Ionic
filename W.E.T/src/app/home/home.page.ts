import { Component } from "@angular/core";
import { Router } from '@angular/router';

import { take } from "rxjs/operators";

import { MealdbApiService } from "../services/mealdb-api.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  meals$ = this.mealdb.meals$;
  isLoading: boolean = false;

  constructor(private mealdb: MealdbApiService, private router: Router) {
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

  searchPage() {
    this.router.navigateByUrl("/search");
  }
}
