import { Injectable } from "@angular/core";
import { CanLoad, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";

import { AuthService } from '../auth/auth.service';
import { RecentObituary, ObituaryObject } from './recent-obits.model';
import { environment } from '../../environments/environment';
import { RecentObituaryData } from './recent-obits-types';

@Injectable({
  providedIn: "root",
})

export class RecentObitsService implements CanLoad {
  private _recentObits = new BehaviorSubject<RecentObituary[]>([]);

  get places() {
    return this._recentObits.asObservable();
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
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

  getRecentObituaries() {
    return this.http
      .get<{ [key: string]: RecentObituaryData }>(
        environment.firebaseURL + "/recent-obituaries.json"
      )
      .pipe(
        map((resData) => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new RecentObituary(
                  resData[key].type,
                  new ObituaryObject(
                    resData[key].object.categoryId,
                    resData[key].object.deathDay,
                    resData[key].object.funeral,
                    resData[key].object.name,
                    resData[key].object.obituaryId,
                    resData[key].object.photo
                  )
                )
              );
            }
          }
          return places;
        }),
        tap(places => {
          this._recentObits.next(places);
        })
      );
  }
}
