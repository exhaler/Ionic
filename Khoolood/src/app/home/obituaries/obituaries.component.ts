import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from "rxjs";

import { Obituaries } from "../../shared/models";
import { ObituaryService } from "../../shared/services/obituary.service";

@Component({
  selector: 'app-obituaries',
  templateUrl: './obituaries.component.html',
  styleUrls: ['./obituaries.component.scss'],
})
export class ObituariesComponent implements OnInit, OnDestroy {
  loadedObituaries: Obituaries[];
  private obituariesSub: Subscription;
  pageNumber: number = 1;
  isLoading = false;
  Arr = Array;
  num: number = 15;

  constructor(private obituaryService: ObituaryService) { }

  ngOnInit() {
    this.isLoading = true;

    this.obituariesSub = this.obituaryService
      .getObituaries(this.pageNumber)
      .subscribe((obituaries) => {
        this.loadedObituaries = obituaries;
        this.isLoading = false;
      });
  }

  loadNextPage(infiniteScroll: any) {
    this.pageNumber++;
    if (this.loadedObituaries.length < 15) {
      infiniteScroll.target.disabled = true;
      return;
    }
    let moreObits = [...this.loadedObituaries];
    this.obituaryService.getObituaries(this.pageNumber).subscribe(
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

  ngOnDestroy() {
    if (this.obituariesSub) {
      this.obituariesSub.unsubscribe();
    }
  }

}
