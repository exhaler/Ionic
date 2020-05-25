import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Renderer2,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Subscription } from "rxjs";

import { AlertController, NavController } from "@ionic/angular";

import { CommunityService } from "../../shared/services/community.service";
import { DetailedCommunityObject } from "../../shared/models";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-community-detail",
  templateUrl: "./community-detail.page.html",
  styleUrls: ["./community-detail.page.scss"],
})
export class CommunityDetailPage implements OnInit, OnDestroy {
  @ViewChild("map", { static: false }) mapElementRef: ElementRef;
  detailCommunity: DetailedCommunityObject;
  communityId: number;
  isLoading = false;
  private communitySub: Subscription;
  googleMaps: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private communityService: CommunityService,
    private alertCtrl: AlertController,
    private renderer: Renderer2
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
            // console.log(community);
            this.detailCommunity = community;
            const communityMarker = {
              lat: +community.lat,
              lng: +community.long,
            };

            this.getgoogleMaps()
              .then((googleMaps) => {
                this.googleMaps = googleMaps;
                const mapEl = this.mapElementRef.nativeElement;
                const map = new googleMaps.Map(mapEl, {
                  center: communityMarker,
                  zoom: 15,
                });

                this.googleMaps.event.addListenerOnce(map, "idle", () => {
                  this.renderer.addClass(mapEl, "visible");
                });

                const marker = new googleMaps.Marker({
                  position: communityMarker,
                  map: map,
                  title: community.name_en
                });
                marker.setMap(map);
              })
              .catch((err) => {
                console.log(err);
              });

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

  private getgoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        environment.googleMapsAPIKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject("Google maps SDK not available.");
        }
      };
    });
  }

  ngOnDestroy() {
    if (this.communitySub) {
      this.communitySub.unsubscribe();
    }
  }
}
