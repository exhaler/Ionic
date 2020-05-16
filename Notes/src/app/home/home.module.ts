import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MobxAngularModule } from "mobx-angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { ManageNoteComponent } from "./components/manage-note/manage-note.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    MobxAngularModule,
  ],
  entryComponents: [ManageNoteComponent],
  declarations: [HomePage, ManageNoteComponent],
})
export class HomePageModule {}
