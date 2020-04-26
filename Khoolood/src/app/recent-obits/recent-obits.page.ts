import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recent-obits',
  templateUrl: './recent-obits.page.html',
  styleUrls: ['./recent-obits.page.scss'],
})
export class RecentObitsPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.userIsAuthenticated.then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/home', { replaceUrl: true });
      }
    });
  }
}
