import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";
import { take, switchMap, map, tap } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/auth.service";
import { NotificationObject } from "../models";
import { NotificationData } from "../types";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  private _notifications = new BehaviorSubject<NotificationObject[]>([]);

  get notifications() {
    return this._notifications.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  getNotifications(pageNumber: number) {
    return this.authService.userToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<NotificationData>(
          `${environment.apiURL}myBroadcasts&token=${token}&type=notifications&pag=${pageNumber}`
        );
      }),
      map((resData) => {
        resData = resData.data.notifications;
        const notifications = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            notifications.push(
              new NotificationObject(
                resData[key].object.name_en,
                resData[key].object.message,
                resData[key].object.timestamp,
                resData[key].object.notificationId
              )
            );
          }
        }
        return notifications;
      }),
      tap((notifications) => {
        this._notifications.next(notifications);
      })
    );
  }
}
