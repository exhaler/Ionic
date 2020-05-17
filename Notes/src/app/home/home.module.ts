import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MobxAngularModule } from "mobx-angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { ManageNoteComponent } from "./components/manage-note/manage-note.component";
import { NotesFiltersPopoverComponent } from "./components/notes-filters-popover/notes-filters-popover.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    MobxAngularModule,
  ],
  entryComponents: [ManageNoteComponent, NotesFiltersPopoverComponent],
  declarations: [HomePage, ManageNoteComponent, NotesFiltersPopoverComponent],
})
export class HomePageModule {}
