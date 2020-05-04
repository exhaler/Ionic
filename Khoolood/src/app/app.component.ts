import { Component, OnInit, OnDestroy, Output } from "@angular/core";
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';

import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private previousAuthState = false;
  loggedIn = false;
  username: string;

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
    this.fetchUsername();

    this.authSub = this.authService.userIsAuthenticated.subscribe((isAuth) => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl("/auth");
      }
      this.previousAuthState = isAuth;
      this.loggedIn = isAuth;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  checkLoginStatus() {
    return this.authService.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  fetchUsername() {
    this.authService.getUsername().then((username) => {
      this.username = username;
    });
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.fetchUsername();
    });

    // window.addEventListener('user:signup', () => {
    //   this.updateLoggedInStatus(true);
    // });

    // window.addEventListener('user:logout', () => {
    //   this.onLogout()
    // });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/recent-obits");
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
