import { Component, OnInit } from "@angular/core";

import { ToastController, IonItemSliding } from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { NewsService } from "../services/news.service";

@Component({
  selector: "app-sources",
  templateUrl: "./sources.page.html",
  styleUrls: ["./sources.page.scss"],
})
export class SourcesPage implements OnInit {
  sources;
  term = "";
  isLoading = false;
  fakeSources = new Array(15);

  constructor(
    private newsService: NewsService,
    private storage: Storage,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.newsService.getData("sources").subscribe((sources) => {
      this.sources = sources["sources"];
      this.isLoading = false;
    });
  }

  addFavorite(source, slidingEl: IonItemSliding) {
    this.storage.get("favorites").then((val) => {
      let items = [];
      if (val != null) {
        items = JSON.parse(val);
      }

      items.push(source);
      this.storage.set("favorites", JSON.stringify(items));
      this.toastCtrl
        .create({
          color: "success",
          message: source.name + " added to favorites",
          duration: 1500,
          position: "top"
        })
        .then((toastEl) => {
          toastEl.present();
          slidingEl.close();
        });
    });
  }
}
