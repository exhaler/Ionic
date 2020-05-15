import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { NavController, AlertController } from "@ionic/angular";

import { Subscription } from "rxjs";

import { DetailedObituaryObject } from "../shared/models";
import { ObituaryService } from "../shared/services/obituary.service";
import { AuthService } from "../auth/auth.service";
import { SaveService } from "../shared/services/save.service";

@Component({
  selector: "app-obituary-detail",
  templateUrl: "./obituary-detail.page.html",
  styleUrls: ["./obituary-detail.page.scss"],
})
export class ObituaryDetailPage implements OnInit, OnDestroy {
  detailObituary: DetailedObituaryObject;
  obituaryId: number | string;
  isLoading = false;
  loggedIn = false;
  isSaved = false;
  private obituarySub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private obituaryService: ObituaryService,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private saveService: SaveService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().then((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("obituaryId")) {
        this.navCtrl.navigateBack("/recent-obits");
        return;
      }

      this.obituaryId = paramMap.get("obituaryId");
      this.isLoading = true;

      this.saveService.isSaved(this.obituaryId).then((isSaved) => {
        this.isSaved = isSaved;
      });

      this.obituarySub = this.obituaryService
        .getObituary(+paramMap.get("obituaryId"))
        .subscribe(
          (obituary) => {
            this.detailObituary = obituary;
            //console.log(obituary);

            this.isLoading = false;
          },
          (error) => {
            this.alertCtrl
              .create({
                header: "An error occurred",
                message: "Obituary could not be fetched",
                buttons: [
                  {
                    text: "Okay",
                    handler: () => {
                      this.router.navigate(["/recent-obits"]);
                    },
                  },
                ],
              })
              .then((alertEl) => {
                alertEl.present();
              });
          }
        );
    });
  }

  share(obituary) {
    console.log(obituary);
  }

  save(obituary) {
    this.saveService.saveItem(obituary).then(() => {
      this.isSaved = true;
    });
  }

  unSave(obituary) {
    this.saveService.unSaveItem(obituary).then(() => {
      this.isSaved = false;
    });
  }

  ngOnDestroy() {
    if (this.obituarySub) {
      this.obituarySub.unsubscribe();
    }
  }
}
