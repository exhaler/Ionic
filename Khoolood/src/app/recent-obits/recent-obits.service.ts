import { Injectable } from "@angular/core";
import { CanLoad, Router } from "@angular/router";

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: "root",
})
export class RecentObits implements CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService
    ) {}

  canLoad() {
    return this.authService.isLoggedIn().then((res) => {
      if (res) {
        this.router.navigate(["/app", "home"]);
        return false;
      } else {
        return true;
      }
    });
  }
}
