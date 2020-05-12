import { Component, OnInit } from '@angular/core';

import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.page.html',
  styleUrls: ['./sources.page.scss'],
})
export class SourcesPage implements OnInit {
  sources;
  term = "";

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getData('sources').subscribe(sources => {
      this.sources = sources['sources'];
    })
  }

  favorite(source) {
    console.log(source);
  }

}
