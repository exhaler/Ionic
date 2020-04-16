import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private _httpClient: HttpClient) { }

  getActivity(activityID: string){
    return this._httpClient.get(API + "/id/" + activityID);
  }

  getAllActivities(){
    return this._httpClient.get(API);
  }
}

const API = "https://orangevalleycaa.org/api/videos";
