import { Injectable } from "@angular/core";
import { CanLoad, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";

import { AuthService } from "../auth/auth.service";
import { RecentObituary } from "../shared/models"

import { environment } from "../../environments/environment";
import { ObituaryObject, FuneralObject } from '../shared/models';
import { RecentObituaryData } from '../shared/types';

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
          const recentObits = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              recentObits.push(
                new RecentObituary(
                  resData[key].type,
                  new ObituaryObject(
                    resData[key].object.categoryId,
                    resData[key].object.deathDay,
                    new FuneralObject(
                      resData[key].object.funeral.communityId,
                      resData[key].object.funeral.funeralDate,
                      resData[key].object.funeral.funeralTime,
                      resData[key].object.funeral.lat,
                      resData[key].object.funeral.long,
                      resData[key].object.funeral.place
                    ),
                    resData[key].object.name,
                    resData[key].object.obituaryId,
                    resData[key].object.photo
                  )
                )
              );
            }
          }
          return recentObits;
        }),
        tap((recentObits) => {
          this._recentObits.next(recentObits);
        })
      );
  }
}
