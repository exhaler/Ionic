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
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.news = this.newService.getData("top-headlines?country=us").pipe(
      tap((value) => {
        console.log(value);
        this.isLoading = false;
      })
    );
  }

  onRefresh(event) {
    this.getData();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
