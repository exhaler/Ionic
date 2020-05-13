import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-big-loader',
  templateUrl: './big-loader.component.html',
  styleUrls: ['./big-loader.component.scss'],
})
export class BigLoaderComponent implements OnInit {
  @Input() isLoading;
  Arr = Array;
  num: number = 5;

  constructor() { }

  ngOnInit() {}

}
