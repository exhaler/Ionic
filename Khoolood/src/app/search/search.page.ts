import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
  @ViewChild('searchbar', {static: false}) searchbar: IonSearchbar;
  queryText: string = "";

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.searchbar.setFocus();
  }

  search() {
    console.log(this.queryText);
  }
}
