import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { RecentObitsService } from "../shared/services/recent-obits.service";
import { RecentObituary } from "../shared/models";

@Component({
  selector: "app-recent-obits",
  templateUrl: "./recent-obits.page.html",
  styleUrls: ["./recent-obits.page.scss"],
})
export class RecentObitsPage implements OnInit, OnDestroy {
  recentObits: RecentObituary[];
  private recentObitsSub: Subscription;
  pageNumber: number = 1;
  isLoading = false;
  Arr = Array;
  num: number = 15;

  constructor(
    private authService: AuthService,
    private router: Router,
    private recentObitsService: RecentObitsService
  ) {}

  ngOnInit() {
    this.recentObitsSub = this.recentObitsService.recentObituaries.subscribe(
      (obits) => {
        this.recentObits = obits;
      }
    );

    this.isLoading = true;
    this.recentObitsService
      .getRecentObituaries(this.pageNumber)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  ionViewWillEnter() {
    this.authService.isLoggedIn().then((res) => {
      if (res === true) {
        this.router.navigateByUrl("/app/home", { replaceUrl: true });
      }
    });
  }

  loadNextPage(infiniteScroll: any) {
    this.pageNumber++;
    if (this.recentObits.length < 15) {
      infiniteScroll.target.disabled = true;
      return;
    }
    let moreRecentObits = [...this.recentObits];
    this.recentObitsService.getRecentObituaries(this.pageNumber).subscribe(
      (recentObits) => {
        if (recentObits.length < 15) {
          infiniteScroll.target.disabled = true;
        }
        this.recentObits = moreRecentObits.concat(recentObits);
      },
      (error) => {
        console.log(error);
      },
      () => {
        infiniteScroll.target.complete();
      }
    );
  }

  ngOnDestroy() {
    if (this.recentObitsSub) {
      this.recentObitsSub.unsubscribe();
    }
  }
}
