import { Component, OnInit } from "@angular/core";

import { Storage } from "@ionic/storage";

import { FavoriteService } from "../services/favorite.service";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.page.html",
  styleUrls: ["./favorites.page.scss"],
})
export class FavoritesPage implements OnInit {
  meals;

  constructor(
    private favoritesService: FavoriteService,
    public storage: Storage
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    console.log("fetch favorites");

    this.favoritesService.getAllFavoriteMeals().then(data => {
      console.log(data);
      this.meals = data;
    })

  }
}
