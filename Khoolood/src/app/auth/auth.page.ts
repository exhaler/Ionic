import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoadingController } from '@ionic/angular';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(5),
        ]
      }),
    });
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
        this.router.navigateByUrl('/app/home')
      }, 500);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onSubmit() {
    // if (!form.valid) {
    //   return;
    // }

    // const email = form.value.email;
    // const password = form.value.password;
    // console.log(email, password);

    // if (this.isLogin) {
    //   // Send request to API to login
    // } else {
    //   // Send request to API to signup
    // }
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

}