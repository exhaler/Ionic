import { Component, OnInit } from "@angular/core";

import { Storage } from "@ionic/storage";

import { FavoriteService } from "../services/favorite.service";
import { MEALDB_Meal } from "../services/model";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.page.html",
  styleUrls: ["./favorites.page.scss"],
})
export class FavoritesPage implements OnInit {
  meals: MEALDB_Meal[] = [];

  constructor(
    private favoritesService: FavoriteService,
    public storage: Storage
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.favoritesService.getAllFavoriteMeals().then((data) => {
      //console.log(data);
      this.meals = data;
    });
  }
}
