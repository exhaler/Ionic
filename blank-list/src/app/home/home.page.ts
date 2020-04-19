import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  chacaterList = favCharacetrs;

  constructor() {}

}

const favCharacetrs = [
  {
    id: 1,
    name: "Aragorn II Elessar"
  },
  {
    id: 2,
    name: "Gollum"
  },
  {
    id: 3,
    name: "Frodo Baggins"
  },
  {
    id: 4,
    name: "Gandalf"
  },
  {
    id: 5,
    name: "Sauron"
  }
]
