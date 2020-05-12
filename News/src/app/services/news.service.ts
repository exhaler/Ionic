import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { environment } from "../../environments/environment";

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const params = new HttpParams().set("apiKey", apiKey);

@Injectable({
  providedIn: "root",
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getData(url) {
    return this.http.get(`${apiUrl}/${url}`, { params });
  }
}
