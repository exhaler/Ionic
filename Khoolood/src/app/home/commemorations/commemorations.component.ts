import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Obituaries } from "../../shared/models";
import { ObituaryService } from "../../shared/services/obituary.service";

@Component({
  selector: 'app-commemorations',
  templateUrl: './commemorations.component.html',
  styleUrls: ['./commemorations.component.scss'],
})
export class CommemorationsComponent implements OnInit, OnDestroy {
  loadedCommemorations: Obituaries[];
  private commemorationsSub: Subscription;
  pageNumber: number = 1;
  obitType = 'Commemoration';
  isLoading = false;
  Arr = Array;
  num: number = 15;

  constructor(private commemorationService: ObituaryService) { }

  ngOnInit() {
    this.isLoading = true;

    this.commemorationsSub = this.commemorationService
      .getObituaries(this.pageNumber, this.obitType)
      .subscribe((commemorations) => {
        this.loadedCommemorations = commemorations;
        this.isLoading = false;
      });
  }

  loadNextPage(infiniteScroll: any) {
    this.pageNumber++;
    if (this.loadedCommemorations.length < 15) {
      infiniteScroll.target.disabled = true;
      return;
    }
    let moreComms = [...this.loadedCommemorations];
    this.commemorationService.getObituaries(this.pageNumber, this.obitType).subscribe(
      (comms) => {
        if (comms.length < 15) {
          infiniteScroll.target.disabled = true;
        }
        this.loadedCommemorations = moreComms.concat(comms);
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
    if (this.commemorationsSub) {
      this.commemorationsSub.unsubscribe();
    }
  }

}
