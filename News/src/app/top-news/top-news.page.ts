import { Component, OnInit } from "@angular/core";

import { tap } from "rxjs/operators";

import { NewsService } from "../services/news.service";

@Component({
  selector: "app-top-news",
  templateUrl: "./top-news.page.html",
  styleUrls: ["./top-news.page.scss"],
})
export class TopNewsPage implements OnInit {
  isLoading = false;
  fakeArticles = new Array(5);
  news: any;

  constructor(private newService: NewsService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(event = null) {
    this.isLoading = true;
    this.news = this.newService.getData("top-headlines?country=us").pipe(
      tap((value) => {
        if (event) {
          event.target.complete();
        }
        this.isLoading = false;
      })
    );
  }

  onRefresh(event) {
    this.fetchData(event);
  }
}
