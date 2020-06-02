import { Component, OnInit } from "@angular/core";

import { Storage } from "@ionic/storage";

import { SaveService } from "../shared/services/save.service";
import { DetailedObituaryObject } from "../shared/models";

@Component({
  selector: "app-saved",
  templateUrl: "./saved.page.html",
  styleUrls: ["./saved.page.scss"],
})
export class SavedPage implements OnInit {
  savedObituaries: DetailedObituaryObject[] = [];

  constructor(private saveService: SaveService, public storage: Storage) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.saveService.getAllSavedItems().then((data) => {
      this.savedObituaries = data;
      console.log(this.savedObituaries);
    });
  }
}
