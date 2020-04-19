import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  charList = chars;

  constructor() {}

  refreshChars(event) {
    setTimeout(() => {
      let newRefreshChars = this.charList.slice(3, 6);
      this.charList.unshift(
      newRefreshChars[0],
      newRefreshChars[1],
      newRefreshChars[2]
      );

      event.target.complete();
    }, 5000);
  }
}

const chars = [
  "Aragorn II Elessar",
  "Gollum",
  "Frodo Baggins",
  "Gandalf",
  "Sauron",
  "Bilbo Baggins",
  "Denethor II",
  "Éomer",
  "Théoden",
  "Galadriel",
  "Faramir",
  "Aragorn II Elessar",
  "Gollum",
  "Frodo Baggins",
  "Gandalf",
  "Sauron",
  "Bilbo Baggins",
  "Denethor II",
  "Éomer",
  "Théoden",
  "Galadriel",
  "Faramir",
  "Aragorn II Elessar",
  "Gollum",
  "Frodo Baggins",
  "Gandalf",
  "Sauron",
  "Bilbo Baggins"
];
