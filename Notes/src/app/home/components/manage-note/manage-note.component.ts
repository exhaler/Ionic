import { Component, OnInit } from "@angular/core";

import { ModalController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-manage-note",
  templateUrl: "./manage-note.component.html",
  styleUrls: ["./manage-note.component.scss"],
})
export class ManageNoteComponent implements OnInit {
  noteForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  ngOnInit() {
    this.noteForm = this.fb.group({
      title: ["", [Validators.required]],
      description: ["", []],
    });
  }

  formSubmit() {
    console.log(this.noteForm.value)
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
