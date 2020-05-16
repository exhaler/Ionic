import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { Note } from "../core/models/note.model";
import { NotesService } from "../core/services/notes.service";
import { ManageNoteComponent } from './components/manage-note/manage-note.component';

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  constructor(public store: NotesService, private modalCtrl: ModalController) {}

  ngOnInit() {}

  archiveNote(note: Note) {
    this.store.archiveNote(note);
  }

  async createNote() {
    const modal = await this.modalCtrl.create({
      component: ManageNoteComponent
    })

    return await modal.present();

    this.store.createNote({
      title: "new note",
      description: "desc",
      archived: false,
    });
  }
}
