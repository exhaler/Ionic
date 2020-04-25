import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-memorials',
  templateUrl: './memorials.page.html',
  styleUrls: ['./memorials.page.scss'],
})
export class MemorialsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }
}
