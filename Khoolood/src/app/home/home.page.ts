import { Component, OnInit } from "@angular/core";
import { SegmentChangeEventDetail } from "@ionic/core";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { Obituaries } from "../shared/models";
import { ObituaryService } from "./obituaries/obituary.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  loadedObituaries: Obituaries[];
  relevantObituaries: Obituaries[];
  private obituariesSub: Subscription;
  private commemorationsSub: Subscription;
  pageNumber: number = 1;
  isLoading = false;
  Arr = Array;
  num: number = 15;
  userToken: string;

  constructor(
    private router: Router,
    private obituaryService: ObituaryService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.authService.getUserToken().then((token) => {
      this.userToken = token;
      // Get obituaries
      this.obituariesSub = this.obituaryService
        .getObituaries(this.userToken, this.pageNumber)
        .subscribe((obituaries) => {
          this.loadedObituaries = obituaries;
          this.relevantObituaries = this.loadedObituaries;
          this.isLoading = false;
        });
    });

    // Get updates

    // Get commemorations
    // this.commemorationsSub = this.obituaryService.getCommemorations().subscribe((commemorations) => {
    //   this.loadedObituaries = commemorations;
    //   this.relevantObituaries = this.loadedObituaries;
    //   this.isLoading = false;
    // });
  }

  loadNextPage(infiniteScroll: any) {
    this.pageNumber++;
    if (this.loadedObituaries.length < 15) {
      infiniteScroll.target.disabled = true;
      return;
    }
    let moreObits = [...this.loadedObituaries];
    this.obituaryService
      .getObituaries(this.userToken, this.pageNumber)
      .subscribe(
        (obits) => {
          if (obits.length < 15) {
            infiniteScroll.target.disabled = true;
          }
          this.loadedObituaries = moreObits.concat(obits);
        },
        (error) => {
          console.log(error);
        },
        () => {
          infiniteScroll.target.complete();
        }
      );
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === "updates") {
      this.relevantObituaries = [];
    } else if (event.detail.value === "obituaries") {
      this.relevantObituaries = this.loadedObituaries;
    } else {
      this.relevantObituaries = [];
    }
  }

  searchPage() {
    this.router.navigateByUrl("/app/search");
  }
}
