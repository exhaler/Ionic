import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { NavController } from "@ionic/angular";

import { Subscription } from "rxjs";

import { ObituaryObject } from "../shared/models";
import { ObituaryService } from "../home/obituaries/obituary.service";

@Component({
  selector: "app-obituary-detail",
  templateUrl: "./obituary-detail.page.html",
  styleUrls: ["./obituary-detail.page.scss"],
})
export class ObituaryDetailPage implements OnInit, OnDestroy {
  obituary: ObituaryObject;
  private obituarySub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private obituaryService: ObituaryService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("obituaryId")) {
        this.navCtrl.navigateBack("/recent-obits");
        return;
      }

      // this.obituarySub = this.obituaryService
      //   .getObituary(+paramMap.get("obituaryId"))
      //   .subscribe((obituary) => {
      //     this.obituary = obituary;
      //   });
    });
  }

  ngOnDestroy() {
    if (this.obituarySub) {
      this.obituarySub.unsubscribe();
    }
  }
}
