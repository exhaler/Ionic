import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../types';
import { ActivityService } from '../activity.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ActivityVideoPage } from '../activity-video/activity-video.page';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  activityDetail: Observable<Activity>;

  constructor(
    private _socialShare: SocialSharing,
    private _modalController: ModalController,
    activityService: ActivityService,
    activatedRoute: ActivatedRoute
    ) { 
      const activityID = activatedRoute.snapshot.params["activityID"];
      this.activityDetail = activityService.getActivity(activityID);
    }

  ngOnInit() {
  }

  share() {
    this.activityDetail.subscribe((activity)=>{
      this._socialShare.share("Look what i found on this app", activity.name, "", activity.cropped);
    });
  }

  async openModal() {
    const videoModal = await this._modalController.create({
      component: ActivityVideoPage
    });

    return await this.activityDetail.subscribe((activity) => {
      videoModal.componentProps = {
        videoURL: activity.video_url
      };

      return videoModal.present();
    });
  }

}
