import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";
import { take, switchMap, map, tap } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/auth.service";
import { CommunityObject, DetailedCommunityObject } from "../models";
import { CommunityData, DetailedCommunityData } from "../types";

@Injectable({
  providedIn: "root",
})
export class CommunityService {
  private _communities = new BehaviorSubject<CommunityObject[]>([]);

  get communities() {
    return this._communities.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  getMyCommunities() {
    return this.authService.userToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<CommunityData>(
          `${environment.apiURL}myCommunities&token=${token}`
        );
      }),
      map((resData) => {
        resData = resData.data.communities;
        const myCommunities = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            myCommunities.push(
              new CommunityObject(
                resData[key].id,
                resData[key].name_en,
                resData[key].place,
                resData[key].membersCount,
                resData[key].image,
                resData[key].type
              )
            );
          }
        }
        return myCommunities;
      }),
      tap((myCommunities) => {
        this._communities.next(myCommunities);
      })
    );
  }

  getCommunity(id: number) {
    return this.authService.userToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<DetailedCommunityData>(
          `${environment.apiURL}viewCommunity&communityId=${id}&token=${token}`
        );
      }),
      map((resData) => {
        resData = resData.data.community;
        return new DetailedCommunityObject(
          resData.id,
          resData.name_en,
          resData.place,
          resData.membersCount,
          resData.image,
          resData.type,
          resData.lat,
          resData.long,
        );
      })
    );
  }
}
