import { Component, OnInit } from "@angular/core";
import { SegmentChangeEventDetail } from "@ionic/core";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { Obituaries } from "../shared/models";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  showPage: string = "obituaries";

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {}

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(this.showPage);
    if (event.detail.value === "updates") {
      this.showPage = "updates";
    } else if (event.detail.value === "obituaries") {
      this.showPage = "obituaries";
    } else {
      this.showPage = "commemorations";
    }
  }

  searchPage() {
    this.router.navigateByUrl("/app/search");
  }
}
