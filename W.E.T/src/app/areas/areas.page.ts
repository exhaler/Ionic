import { Component, OnInit } from "@angular/core";

import { take } from "rxjs/operators";

import { MealdbApiService } from "../services/mealdb-api.service";
import { MEALDB_ListArea } from "../services/model";

@Component({
  selector: "app-areas",
  templateUrl: "./areas.page.html",
  styleUrls: ["./areas.page.scss"],
})
export class AreasPage implements OnInit {
  areas: MEALDB_ListArea;
  isLoading: boolean = false;

  constructor(private mealdb: MealdbApiService) {}

  ngOnInit() {
    this.isLoading = true;
    this.mealdb
      .getAreas()
      .pipe(take(1))
      .subscribe((results) => {
        this.isLoading = false;
        this.areas = results;
      });
  }
}
