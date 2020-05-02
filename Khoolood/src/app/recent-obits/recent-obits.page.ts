import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { RecentObitsService } from "./recent-obits.service";
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
    this.recentObitsSub = this.recentObitsService.places.subscribe((places) => {
      this.recentObits = places;
    });

    this.isLoading = true;
    this.recentObitsService
      .getRecentObituaries(this.pageNumber)
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  ionViewWillEnter() {
    this.authService.userIsAuthenticated.then((res) => {
      if (res === true) {
        this.router.navigateByUrl("/app/home", { replaceUrl: true });
      }
    });
  }

  loadNextPage(infiniteScroll: any) {
    this.pageNumber++;
    let moreRecentObits = [...this.recentObits];
    this.recentObitsService.getRecentObituaries(this.pageNumber).subscribe(
      (places) => {
        if (places.length < 15) {
          infiniteScroll.target.disabled = true;
        }
        this.recentObits = moreRecentObits.concat(places);
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
