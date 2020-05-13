import { Component, OnInit } from "@angular/core";

import { take } from "rxjs/operators";

import { MealdbApiService } from "../services/mealdb-api.service";
import { MEALDB_ListItem } from "../services/model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-area",
  templateUrl: "./area.page.html",
  styleUrls: ["./area.page.scss"],
})
export class AreaPage implements OnInit {
  meals: MEALDB_ListItem;
  areaName: string;

  constructor(
    private mealdb: MealdbApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.areaName = this.activatedRoute.snapshot.paramMap.get("areaId");
    this.mealdb
      .getMealsByArea(this.areaName)
      .pipe(take(1))
      .subscribe((results) => {
        this.meals = results;
      });
  }
}
