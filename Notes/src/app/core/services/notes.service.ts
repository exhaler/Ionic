import { Injectable } from "@angular/core";

import { observable } from "mobx-angular";
import { action, computed } from "mobx";

import { Note, INote } from "../models/note.model";
import { NotesFilters } from "../constants/notes-filter.enum";
import { SqliteStorageService } from "./sqlite-storage.service";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  @observable notes: Array<Note>;
  @observable filter: NotesFilters;
  tableName = "notes";

  constructor(private sqliteStorage: SqliteStorageService) {}

  @action
  archiveNote(note: Note) {
    note.setArchived(true);
  }

  @action
  initNotes() {
    this.notes = [];
    this.filter = NotesFilters.ACTIVE;
    this.getAllNotes();
  }

  async getAllNotes() {
    const notes = await this.sqliteStorage.getAll(this.tableName);
    this.setNotes(notes.map((note) => new Note(note)));
  }

  @action
  setNotes(notes: Array<Note>) {
    this.notes = notes;
  }

  @action
  setFilter(filter: NotesFilters) {
    this.filter = filter;
  }

  @action
  async createNote(note: Partial<INote>) {
    const response = await this.sqliteStorage.create(
      this.tableName,
      ["title", "description", "archived"],
      [note.title, note.description, note.archived ? 1 : 0]
    );
    const savedNote = await this.sqliteStorage.getById(
      this.tableName,
      response.insertId
    );
    this.setNotes([...this.notes, new Note(savedNote)]);
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
