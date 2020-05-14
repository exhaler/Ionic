import { Injectable } from "@angular/core";

import { observable } from "mobx-angular";
import { action, computed } from "mobx";

import { Note, INote } from "../models/note.model";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  @observable notes: Array<Note>;

  constructor() {
    this.initNotes();
  }

  @action
  archiveNote(note: Note) {
    note.archived = true;
  }

  @action
  initNotes() {
    this.notes = [];
  }

  @action
  createNote(note: Partial<INote>) {
    this.notes.push(new Note(note));
  }

  @computed
  get archivedNotesCount() {
    return this.notes.filter((note) => !!note.archived).length;
  }
}
