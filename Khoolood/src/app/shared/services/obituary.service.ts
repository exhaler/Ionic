import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";
import { map, tap, take, switchMap } from "rxjs/operators";

import {
  ObituaryObject,
  Obituaries,
  FuneralObject,
  DetailedObituaryObject,
  RelativesObject,
} from "../models";
import { ObituariesData, DetailedObituaryData } from "../types";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class ObituaryService {
  private _obituaries = new BehaviorSubject<Obituaries[]>([]);

  get obituaries() {
    return this._obituaries.asObservable();
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  getObituary(id: number) {
    return this.authService.userToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<DetailedObituaryData>(
          `${environment.apiURL}viewObituary&obituaryId=${id}&token=${token}`
        );
      }),
      map((obitData) => {
        //console.log(obitData);
        obitData = obitData.data.obituary;
        return new DetailedObituaryObject(
          obitData.categoryId,
          obitData.dateOfDeath,
          obitData.firstName,
          obitData.middleName,
          obitData.lastName,
          obitData.obituaryId,
          obitData.photo,
          obitData.contents,
          new FuneralObject(
            obitData.funerals.communityId,
            obitData.funerals.funeralDate,
            obitData.funerals.funeralTime,
            obitData.funerals.lat,
            obitData.funerals.long,
            obitData.funerals.place
          ),
          new RelativesObject(
            obitData.relatives.brothers,
            obitData.relatives.children,
            obitData.relatives.father,
            obitData.relatives.husband,
            obitData.relatives.mother,
            obitData.relatives.relatives,
            obitData.relatives.sisters,
            obitData.relatives.wife
          )
        );
      })
    );
  }

  getObituaries(pageNumber: number, obitType: string) {
    return this.authService.userToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<ObituariesData>(
          `${environment.apiURL}getFeed&token=${token}&type=${obitType}&page=${pageNumber}`
        );
      }),
      map((resData) => {
        if (!resData.data) {
          return [];
        }
        resData = resData.data.items;
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
