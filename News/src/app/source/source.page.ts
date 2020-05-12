import { Component, OnInit } from "@angular/core";
import { NewsService } from "../services/news.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-source",
  templateUrl: "./source.page.html",
  styleUrls: ["./source.page.scss"],
})
export class SourcePage implements OnInit {
  news;

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.news = this.newsService.getData(`everything?sources=${id}`);
  }
}
