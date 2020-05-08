import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { take, switchMap, map, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/auth.service";
import { Feed, ReactionObject } from "../models";
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
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            feed.push(
              new Feed(
                resData[key].type,
                new ReactionObject(
                  resData[key].object.actionId,
                  resData[key].object.obituaryId,
                  resData[key].object.categoryId,
                  resData[key].object.timestamp,
                  resData[key].object.userName,
                  resData[key].object.userPhoto,
                  resData[key].object.deceasedName,
                  resData[key].object.thanked,
                  resData[key].object.community,
                  resData[key].object.obituarySponsorId,
                )
              )
            );
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
