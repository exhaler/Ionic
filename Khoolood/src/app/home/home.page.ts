import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

  searchPage() {
    this.router.navigateByUrl('/app/search')
  }
}
