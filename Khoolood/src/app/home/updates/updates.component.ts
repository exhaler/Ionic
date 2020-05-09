import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { FeedService } from '../../shared/services/feed.service';
import { Feed } from '../../shared/models';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
})
export class UpdatesComponent implements OnInit, OnDestroy {
  loadedFeed: Feed[];
  private feedSub: Subscription;
  pageNumber: number = 1;
  isLoading = false;
  Arr = Array;
  num: number = 15;

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.isLoading = true;

    this.feedSub = this.feedService
      .getFeed(this.pageNumber)
      .subscribe((feed) => {
        this.loadedFeed = feed;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    if (this.feedSub) {
      this.feedSub.unsubscribe();
    }
  }

}
