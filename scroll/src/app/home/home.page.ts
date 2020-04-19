import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  charList = chars;
  
  constructor() {}

  loadMoreChars(event) {
    setTimeout(() => {
      let newArray = [...this.charList];
      newArray = newArray.reverse();
      this.charList = this.charList.concat(
        newArray
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
