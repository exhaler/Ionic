import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";

import { NotificationObject } from "../shared/models";
import { NotificationsService } from "../shared/services/notifications.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.page.html",
  styleUrls: ["./notifications.page.scss"],
})
export class NotificationsPage implements OnInit {
  loadedNotifications: NotificationObject[];
  private notificationsSub: Subscription;
  isLoading = false;
  pageNumber: number = 1;
  Arr = Array;
  num: number = 15;

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.isLoading = true;

    this.notificationsSub = this.notificationsService
      .getNotifications(this.pageNumber)
      .subscribe((notifications) => {
        this.loadedNotifications = notifications;
        this.isLoading = false;
      });
  }

  loadNextPage(infiniteScroll: any) {
    this.pageNumber++;
    if (this.loadedNotifications.length < 15) {
      infiniteScroll.target.disabled = true;
      return;
    }
    let moreNotifications = [...this.loadedNotifications];
    this.notificationsService.getNotifications(this.pageNumber).subscribe(
      (loadedNotifications) => {
        if (loadedNotifications.length < 15) {
          infiniteScroll.target.disabled = true;
        }
        this.loadedNotifications = moreNotifications.concat(
          loadedNotifications
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        infiniteScroll.target.complete();
      }
    );
  }

  ngOnDestroy() {
    if (this.notificationsSub) {
      this.notificationsSub.unsubscribe();
    }
  }
}
