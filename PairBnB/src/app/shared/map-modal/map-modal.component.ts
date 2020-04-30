import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { environment } from '../../../environments/environment';

@Component({
  selector: "app-map-modal",
  templateUrl: "./map-modal.component.html",
  styleUrls: ["./map-modal.component.scss"],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("map", { static: false }) mapElementRef: ElementRef;
  clickListener: any;
  googelMaps: any;

  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getGoogleMaps()
      .then((googleMaps) => {
        this.googelMaps = googleMaps;
        const mapEl = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center: {
            lat: 33.8908314,
            lng: 35.4999483,
          },
          zoom: 16,
        });

        this.googelMaps.event.addListenerOnce(map, "idle", () => {
          this.renderer.addClass(mapEl, "visible");
        });

        this.clickListener = map.addListener("click", (event) => {
          const selectedCoords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          this.modalCtrl.dismiss(selectedCoords);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" + environment.googleMapsAPIKey;
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
    this.googelMaps.event.removeListener(this.clickListener);
  }
}
