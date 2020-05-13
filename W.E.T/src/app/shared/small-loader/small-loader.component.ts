import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-small-loader',
  templateUrl: './small-loader.component.html',
  styleUrls: ['./small-loader.component.scss'],
})
export class SmallLoaderComponent implements OnInit {
  @Input() isLoading;
  Arr = Array;
  num: number = 20;

  constructor() { }

  ngOnInit() {}

}
