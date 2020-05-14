import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Note } from "../core/models/note.model";
import { NotesService } from "../core/services/notes.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  constructor(public store: NotesService) {}

  ngOnInit() {}

  archiveNote(note: Note) {
    this.store.archiveNote(note);
  }

  createNote() {
    this.store.createNote({
      title: "new note",
      description: "desc",
      archived: false,
    });
  }
}
