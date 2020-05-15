import { Component, ViewChild } from "@angular/core";

import { MenuController } from "@ionic/angular";
import { IonTabs } from "@ionic/angular";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.page.html",
  styleUrls: ["./tabs.page.scss"],
})
export class TabsPage {
  @ViewChild("mainTabs", { static: false }) tabs: IonTabs;
  selectedTab;

  constructor(public menu: MenuController) {}

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  getSelectedTab(): void {
    this.selectedTab = this.tabs.getSelected();
  }
}
