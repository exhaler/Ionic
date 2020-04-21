import { Injectable } from "@angular/core";
import { Place } from "./place.module";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      "p1",
      "Manhattan Mansion",
      "In the hear of New York City.",
      "https://static3.mansionglobal.com/production/media/article-images/3f32c767fc327e62abb28a2f9dc8d4a5/large_GettyImages-637703666.jpg",
      149.99
    ),
    new Place(
      "p2",
      "L'Amour Toujours",
      "A romantic place in Paris!",
      "https://a0.muscache.com/im/pictures/66092977/1911951d_original.jpg?aki_policy=xx_large",
      189.99
    ),
    new Place(
      "p3",
      "The Foggy Palace",
      "Not you average city trip!",
      "https://cdn.theculturetrip.com/wp-content/uploads/2016/04/screenshot-958.png",
      99.99
    ),
  ];

  get places() {
    return [...this._places];
  }

  constructor() {}
}
