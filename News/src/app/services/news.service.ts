import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { tap } from "rxjs/operators";

import { LoadingController } from "@ionic/angular";

import { environment } from "../../environments/environment";

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const params = new HttpParams().set("apiKey", apiKey);

@Injectable({
  providedIn: "root",
})
export class NewsService {
  loading;

  constructor(
    private http: HttpClient,
    public loadingCtrl: LoadingController
  ) {}

  getData(url) {
    this.showLoading();
    return this.http.get(`${apiUrl}/${url}`, { params }).pipe(tap(value => {
      this.loading.dismiss();
    }));
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      duration: 5000,
    });

    return await this.loading.present();
  }
}
 