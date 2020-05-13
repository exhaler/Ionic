import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { IngredientsPageRoutingModule } from "./ingredients-routing.module";
import { IngredientsPage } from "./ingredients.page";
import { SlugifyPipe } from "../pipes/slugify.pipe";
import { SearchIngredientsPipe } from "../pipes/search-ingredients.pipe";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientsPageRoutingModule,
    SharedModule,
  ],
  declarations: [IngredientsPage, SlugifyPipe, SearchIngredientsPipe],
})
export class IngredientsPageModule {}
