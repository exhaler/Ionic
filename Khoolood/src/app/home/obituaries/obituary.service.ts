import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";

import {
  ObituaryObject,
  Obituaries,
  FuneralObject,
  DetailedObituaryObject,
} from "../../shared/models";
import { ObituariesData, DetailedObituaryData } from "../../shared/types";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ObituaryService {
  private _obituaries = new BehaviorSubject<Obituaries[]>([]);

  get obituary() {
    return this._obituaries.asObservable();
  }

  constructor(private http: HttpClient) {}

  getObituary(id: number) {
    return this.http
      .get<DetailedObituaryData>(
        `${environment.apiURL}viewObituary&obituaryId=${id}`
      )
      .pipe(
        map((obitData) => {
          obitData = obitData.data.obituary;
          console.log(obitData);
          return new DetailedObituaryObject(
            obitData.categoryId,
            obitData.dateOfDeath,
            new FuneralObject(
              obitData.funerals.communityId,
              obitData.funerals.funeralDate,
              obitData.funerals.funeralTime,
              obitData.funerals.lat,
              obitData.funerals.long,
              obitData.funerals.place
            ),
            obitData.firstName,
            obitData.middleName,
            obitData.lastName,
            obitData.obituaryId,
            obitData.photo
          );
        })
      );
  }

  getObituaries() {
    return this.http
      .get<{ [key: string]: ObituariesData }>(
        `${environment.firebaseURL}/obituaries.json`
      )
      .pipe(
        map((resData) => {
          const obituaries = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              obituaries.push(
                new Obituaries(
                  resData[key].type,
                  new ObituaryObject(
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
                  )
                )
              );
            }
          }
          return obituaries;
        }),
        tap((obituaries) => {
          this._obituaries.next(obituaries);
        })
      );
  }

  getCommemorations() {
    return this.http
      .get<{ [key: string]: ObituariesData }>(
        environment.firebaseURL + "/commemorations.json"
      )
      .pipe(
        map((resData) => {
          const obituaries = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              obituaries.push(
                new Obituaries(
                  resData[key].type,
                  new ObituaryObject(
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
                  )
                )
              );
            }
          }
          return obituaries;
        }),
        tap((obituaries) => {
          this._obituaries.next(obituaries);
        })
      );
  }
}