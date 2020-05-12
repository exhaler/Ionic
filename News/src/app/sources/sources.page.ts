import { Component, OnInit } from "@angular/core";

import { Storage } from "@ionic/storage";

import { NewsService } from "../services/news.service";
import { ToastController } from "@ionic/angular";

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

  addFavorite(source) {
    console.log(source);
    this.storage.get("favorite").then((val) => {
      let items = [];
      if (val != null) {
        items = JSON.parse(val);
      }

      items.push(source);
      this.storage.set("favorite", JSON.stringify(items));
      this.toastCtrl
        .create({
          color: 'success',
          message: "Added to favorites",
          duration: 1500,
        })
        .then((toastEl) => toastEl.present());
    });
  }
}
