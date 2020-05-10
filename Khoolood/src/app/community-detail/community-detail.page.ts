import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { AlertController, NavController } from '@ionic/angular';

import { CommunityService } from '../shared/services/community.service';
import { DetailedCommunityObject } from '../shared/models';

@Component({
  selector: 'app-community-detail',
  templateUrl: './community-detail.page.html',
  styleUrls: ['./community-detail.page.scss'],
})
export class CommunityDetailPage implements OnInit, OnDestroy {
  detailCommunity: DetailedCommunityObject;
  communityId: number;
  isLoading = false;
  private communitySub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private communityService: CommunityService,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("communityId")) {
        this.navCtrl.navigateBack("/recent-obits");
        return;
      }

      this.communityId = +paramMap.get("communityId");
      this.isLoading = true;
      this.communitySub = this.communityService
        .getCommunity(+paramMap.get("communityId"))
        .subscribe(
          (community) => {
            this.detailCommunity = community;
            //console.log(community);

            this.isLoading = false;
          },
          (error) => {
            this.alertCtrl
              .create({
                header: "An error occurred",
                message: "Community could not be fetched",
                buttons: [
                  {
                    text: "Okay",
                    handler: () => {
                      this.router.navigate(["/recent-obits"]);
                    },
                  },
                ],
              })
              .then((alertEl) => {
                alertEl.present();
              });
          }
        );
    });
  }

  ngOnDestroy() {
    if (this.communitySub) {
      this.communitySub.unsubscribe();
    }
  }

}
