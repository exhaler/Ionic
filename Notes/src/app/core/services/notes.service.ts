import { Injectable } from "@angular/core";

import { observable, action, computed } from "mobx-angular";

import { Note, INote } from "../models/note.model";
import { NotesFilters } from "../constants/notes-filters.enum";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: "root",
})
export class NotesService extends StorageService {
  @observable notes: Array<Note>;
  @observable filter: NotesFilters;
  tableName = "notes";

  @action
  initNotes() {
    this.notes = [];
    this.filter = NotesFilters.ACTIVE;
    this.getAllNotes();
  }

  async getAllNotes() {
    const notes = await super.getAll(this.tableName);
    this.setNotes(notes.map(note => new Note(note)));
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
  async archiveNote(note: Note) {
    note.setArchived(true);
    await super.update(
      this.tableName,
      note.id,
      ['archived'],
      [note.archived ? 1 : 0]
    );
  }

  @action
  async createNote(note: Partial<INote>) {
    const response = await super.create(
      this.tableName,
      ['title', 'description', 'archived', 'imagePath', 'reminderTime'],
      [
        note.title,
        note.description,
        note.archived ? 1 : 0,
        note.imagePath ? note.imagePath : '',
        note.reminderTime ? note.reminderTime : ''
      ]
    );
    const savedNote = await super.getById(
      this.tableName,
      response.insertId
    );
    this.setNotes([...this.notes, new Note(savedNote)]);
    return savedNote;
  }

  @action
  async updateNote(note: Note) {
    await super.update(
      this.tableName,
      note.id,
      ['title', 'description', 'archived', 'imagePath', 'reminderTime'],
      [
        note.title,
        note.description,
        note.archived ? 1 : 0,
        note.imagePath ? note.imagePath : '',
        note.reminderTime ? note.reminderTime : ''
      ]
    );
    const savedNote = await super.getById(
      this.tableName,
      note.id
    );
    this.setNote(new Note(savedNote));
    return savedNote;
  }

  @action
  setNote(note: Note) {
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
        return this.notes.filter(note => !note.archived);
      case NotesFilters.ARCHIVED:
        return this.notes.filter(note => !!note.archived);
    }
  }
}
