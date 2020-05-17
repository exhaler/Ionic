import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";

import { Note } from "../core/models/note.model";
import { NotesService } from "../core/services/notes.service";
import {
  ManageNoteComponent,
  NoteManageModes,
} from "./components/manage-note/manage-note.component";
import { NotesFiltersPopoverComponent } from "./components/notes-filters-popover/notes-filters-popover.component";
import { NotesFilters } from "../core/constants/notes-filter.enum";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  constructor(
    public store: NotesService,
    private modalCtrl: ModalController,
    private popOverCtrl: PopoverController
  ) {}

  ngOnInit() {}

  archiveNote(note: Note) {
    this.store.archiveNote(note);
  }

  async showFilters(ev) {
    const popOver = await this.popOverCtrl.create({
      component: NotesFiltersPopoverComponent,
      event: ev,
      translucent: true,
      componentProps: {
        selectedFilter: this.store.filter,
      },
    });
    await popOver.present();
    const response = await popOver.onDidDismiss();
    if (response.data) {
      console.log(response.data);
      this.store.setFilter(response.data as NotesFilters);
    }
  }

  async createNote() {
    const modal = await this.modalCtrl.create({
      component: ManageNoteComponent,
      componentProps: {
        mode: NoteManageModes.ADD,
        note: null,
      },
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
        note: noteItem,
      },
    });

    await modal.present();
    const response = await modal.onDidDismiss();
    const note = response.data as Note;
    if (note) {
      this.store.updateNote(note);
    }
  }
}
