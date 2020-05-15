import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";

import { CommunityObject } from "../shared/models";
import { CommunityService } from "../shared/services/community.service";

@Component({
  selector: "app-communities",
  templateUrl: "./communities.page.html",
  styleUrls: ["./communities.page.scss"],
})
export class CommunitiesPage implements OnInit, OnDestroy {
  loadedCommunities: CommunityObject[];
  private communitiesSub: Subscription;
  isLoading = false;
  Arr = Array;
  num: number = 15;

  constructor(private communityService: CommunityService) {}

  ngOnInit() {
    this.isLoading = true;

    this.communitiesSub = this.communityService
      .getMyCommunities()
      .subscribe((communities) => {
        this.loadedCommunities = communities;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    if (this.communitiesSub) {
      this.communitiesSub.unsubscribe();
    }
  }
}
