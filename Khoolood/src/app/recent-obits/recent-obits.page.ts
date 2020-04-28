import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { RecentObitsService } from './recent-obits.service';
import { RecentObituary } from '../shared/models';

@Component({
  selector: 'app-recent-obits',
  templateUrl: './recent-obits.page.html',
  styleUrls: ['./recent-obits.page.scss'],
})
export class RecentObitsPage implements OnInit, OnDestroy {
  recentObits: RecentObituary[];
  private recentObitsSub: Subscription;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private recentObitsService: RecentObitsService,
  ) { }

  ngOnInit() {
    this.recentObitsSub = this.recentObitsService.places.subscribe(places => {
      this.recentObits = places;
      console.log(this.recentObits);
    });

    this.isLoading = true;
    this.recentObitsService.getRecentObituaries().subscribe(() => {
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.authService.userIsAuthenticated.then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/home', { replaceUrl: true });
      }
    });
  }

  ngOnDestroy() {
    if (this.recentObitsSub) {
      this.recentObitsSub.unsubscribe();
    }
  }
}
