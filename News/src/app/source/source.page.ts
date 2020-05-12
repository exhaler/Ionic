import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { tap, take } from "rxjs/operators";

import { NewsService } from "../services/news.service";

@Component({
  selector: "app-source",
  templateUrl: "./source.page.html",
  styleUrls: ["./source.page.scss"],
})
export class SourcePage implements OnInit {
  news;
  sourceName: string;
  isLoading = false;
  fakeSources = new Array(15);

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.news = this.newsService.getData(`everything?sources=${id}`).pipe(
      take(1),
      tap((res) => {
        this.sourceName = res["articles"][0].source.name;
        this.isLoading = false;
      })
    );
  }
}
