import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { Note } from "../core/models/note.model";
import { NotesService } from "../core/services/notes.service";
import { ManageNoteComponent, NoteManageModes } from "./components/manage-note/manage-note.component";

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
      component: ManageNoteComponent,
      componentProps: {
        mode: NoteManageModes.ADD,
        note: null
      }
    });

    await modal.present();
    const response = await modal.onDidDismiss();
    const note = response.data as Note;
    if (note) {
      this.store.createNote(note);
    }
  }

  async editNote(noteItem: Note) {
    const modal = await this.modalCtrl.create({
      component: ManageNoteComponent,
      componentProps: {
        mode: NoteManageModes.EDIT,
        note: noteItem
      }
    });

    await modal.present();
    const response = await modal.onDidDismiss();
    const note = response.data as Note;
    if (note) {
      this.store.updateNote(note);
    }
  }
}
