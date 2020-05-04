import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { LoadingController, AlertController } from "@ionic/angular";

import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { AuthResponseData } from "../shared/types";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    });
  }

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: "Logging in..",
      })
      .then((loadingEl) => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          //authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          (resData) => {
            if (resData.error) {
              loadingEl.dismiss();
              this.showAlert(resData.message);
            } else {
              this.isLoading = false;
              loadingEl.dismiss();
              window.dispatchEvent(new CustomEvent('user:login'));
              this.router.navigateByUrl("/app/home");
              this.loginForm.reset();
            }
          },
          (errRes) => {
            console.log(errRes);
            loadingEl.dismiss();
            this.showAlert(errRes);
          }
        );
      });
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: "Authentication failed",
        message: message,
        buttons: ["Okay"],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  onLogout() {
    this.authService.logout();
  }

  onLoginSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    //console.log(email, password);

    this.authenticate(email, password);
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }
}
