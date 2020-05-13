import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { observable } from "mobx-angular";
import { action, computed } from "mobx";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  @observable notes;

  constructor() {}

  ngOnInit() {
    this.initNotes();
  }

  @action
  archiveNote(note) {
    note.archived = true;
  }

  @action
  initNotes() {
    this.notes = [];
  }

  @action
  createNote() {
    this.notes.push({
      title: "new note",
      description: "desc",
      archived: false,
    });
    console.log("added new note");
  }

  @computed
  get archivedNotesCount() {
    return this.notes.filter((note) => !!note.archived).length;
  }
}
