import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { IngredientsPageRoutingModule } from "./ingredients-routing.module";
import { IngredientsPage } from "./ingredients.page";
import { SlugifyPipe } from "../services/slugify.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientsPageRoutingModule,
  ],
  declarations: [IngredientsPage, SlugifyPipe],
})
export class IngredientsPageModule {}
