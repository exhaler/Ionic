import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { ObituaryObject } from './obituary.model';
import { SingleObituaryData } from './obituary.types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObituaryService {
  private _obituary = new BehaviorSubject<ObituaryObject[]>([]);

  get obituary() {
    return this._obituary.asObservable();
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
}
