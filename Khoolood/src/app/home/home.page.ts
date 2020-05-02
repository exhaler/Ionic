import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Obituaries } from '../shared/models';
import { ObituaryService } from './obituaries/obituary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loadedObituaries: Obituaries[];
  relevantObituaries: Obituaries[];
  private obituariesSub: Subscription;
  private commemorationsSub: Subscription;
  isLoading = false;
  pageNumber: number = 1;

  constructor(
    private router: Router,
    private obituaryService: ObituaryService,
  ) { }

  ngOnInit() {
    this.isLoading = true;

    // Get obituaries
    this.obituariesSub = this.obituaryService.getObituaries().subscribe((obituaries) => {
      this.loadedObituaries = obituaries;
      this.relevantObituaries = this.loadedObituaries;
      this.isLoading = false;
    });

    // Get updates

    // Get commemorations
    // this.commemorationsSub = this.obituaryService.getCommemorations().subscribe((commemorations) => {
    //   this.loadedObituaries = commemorations;
    //   this.relevantObituaries = this.loadedObituaries;
    //   this.isLoading = false;
    // });
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
    this.router.navigateByUrl('/app/search')
  }
}
