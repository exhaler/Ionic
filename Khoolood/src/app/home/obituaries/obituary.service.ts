import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { ObituaryObject, Obituaries, FuneralObject } from '../../shared/models';
import { ObituariesData } from '../../shared/types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObituaryService {
  private _obituaries = new BehaviorSubject<Obituaries[]>([]);

  get obituary() {
    return this._obituaries.asObservable();
  }

  constructor(
    private http: HttpClient
  ) { }

  getObituary(id: number) {
    // return this.http
    // .get<{ [key: string]: SingleObituaryData }>(
    //   environment.firebaseURL + "/obituary.json"
    // ).pipe(
    //   take(1),
    //   map((obituary) => {
    //     return { ...obituary.find((o) => o.obituaryId === id) };
    //   })
    // );
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
