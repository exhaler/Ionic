import { Component, OnInit } from "@angular/core";

import { Storage } from "@ionic/storage";
import { IonItemSliding } from "@ionic/angular";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.page.html",
  styleUrls: ["./favorites.page.scss"],
})
export class FavoritesPage implements OnInit {
  sources = [];

  constructor(private storage: Storage) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get("favorites").then((val) => {
      let items = [];
      if (val != null) {
        this.sources = JSON.parse(val);
      }
      //console.log(this.sources);
    });
  }

  removeFavorite(source, slidingEl: IonItemSliding) {
    //console.log(source);
    const index = this.sources.indexOf(source);
    this.sources.splice(index, 1);
    this.storage.set("favorites", JSON.stringify(this.sources));
    slidingEl.close();
  }

  removeAllFavorites() {
    this.storage.remove("favorites");
    this.sources = [];
  }
}
