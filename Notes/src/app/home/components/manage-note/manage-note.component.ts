import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-manage-note',
  templateUrl: './manage-note.component.html',
  styleUrls: ['./manage-note.component.scss'],
})
export class ManageNoteComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
