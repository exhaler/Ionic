import { Injectable } from "@angular/core";

import { observable } from "mobx-angular";
import { action, computed } from "mobx";

import { Note, INote } from "../models/note.model";
import { NotesFilters } from "../constants/notes-filter.enum";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  @observable notes: Array<Note>;
  @observable filter: NotesFilters;

  @action
  archiveNote(note: Note) {
    note.setArchived(true);
  }

  @action
  initNotes() {
    this.notes = [];
    this.filter = NotesFilters.ACTIVE;
  }

  @action
  setFilter(filter: NotesFilters) {
    this.filter = filter;
  }

  @action
  createNote(note: Partial<INote>) {
    this.notes.push(new Note(note));
  }

  @action
  updateNote(note: Note) {
    for (let i = 0, len = this.notes.length; i < len; ++i) {
      if (note.id === this.notes[i].id) {
        this.notes[i] = note;
        break;
      }
    }
  }

  @computed
  get archivedNotesCount() {
    return this.notes.filter((note) => !!note.archived).length;
  }

  @computed
  get filteredNotes() {
    switch (this.filter) {
      case NotesFilters.ACTIVE:
        return this.notes.filter((note) => !note.archived);
      case NotesFilters.ARCHIVED:
        return this.notes.filter((note) => !!note.archived);
    }
  }
}
