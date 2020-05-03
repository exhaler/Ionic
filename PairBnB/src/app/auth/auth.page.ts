import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login();
    this.isLoading = true;
    this.loadingCtrl
    .create({
      keyboardClose: true,
      message: 'Logging in..'
    })
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover')
      }, 500);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    //console.log(email, password);

    if (this.isLogin) {
      // Send request to API to login
    } else {
      // Send request to API to signup
      this.authService.signup(email, password).subscribe(resData => {
        console.log(resData);
      })
    }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

}
