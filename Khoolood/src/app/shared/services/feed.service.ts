import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";
import { take, switchMap, map, tap } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/auth.service";
import { Feed, ReactionObject, ObituaryObject, FuneralObject } from "../models";
import { FeedData } from "../types";

@Injectable({
  providedIn: "root",
})
export class FeedService {
  private _feed = new BehaviorSubject<Feed[]>([]);

  get feed() {
    return this._feed.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  getFeed(pageNumber: number) {
    return this.authService.userToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<FeedData>(
          `${environment.apiURL}getFeed&token=${token}&page=${pageNumber}`
        );
      }),
      map((resData) => {
        resData = resData.data.items;
        console.log(resData);
        const feed = [];
        let feedTypeObject: ReactionObject | ObituaryObject;
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (
              resData[key].type === "comment" ||
              resData[key].type === "flower" ||
              resData[key].type === "candle"
            ) {
              feedTypeObject = new ReactionObject(
                resData[key].object.actionId,
                resData[key].object.obituaryId,
                resData[key].object.categoryId,
                resData[key].object.timestamp,
                resData[key].object.userName,
                resData[key].object.userPhoto,
                resData[key].object.deceasedName,
                resData[key].object.thanked,
                resData[key].object.community,
                resData[key].object.obituarySponsorId
              );
            } else {
              feedTypeObject = new ObituaryObject(
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
              );
            }

            feed.push(new Feed(resData[key].type, feedTypeObject));
          }
        }
        return feed;
      }),
      tap((feed) => {
        this._feed.next(feed);
      })
    );
  }
}
