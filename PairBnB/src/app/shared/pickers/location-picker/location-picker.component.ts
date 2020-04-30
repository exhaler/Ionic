import { Component, OnInit, ɵdevModeEqual } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ModalController } from "@ionic/angular";
import { environment } from "../../../../environments/environment";
import { MapModalComponent } from "../../map-modal/map-modal.component";

@Component({
  selector: "app-location-picker",
  templateUrl: "./location-picker.component.html",
  styleUrls: ["./location-picker.component.scss"],
})
export class LocationPickerComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {}

  onPickLocation() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
      })
      .then((modalEl) => {
        modalEl.onDidDismiss().then((modalData) => {
          console.log(modalData.data);
        });
        modalEl.present();
      });
  }

  private getAddress(lat: number, lng: number) {
    this.http.get(
      "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=" +
        environment.googleMapsAPIKey
    );
  }
}
