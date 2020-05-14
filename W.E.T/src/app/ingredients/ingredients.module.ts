import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { IngredientsPageRoutingModule } from "./ingredients-routing.module";
import { IngredientsPage } from "./ingredients.page";
import { SharedModule } from "../shared/shared.module";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientsPageRoutingModule,
    SharedModule,
    PipesModule
  ],
  declarations: [IngredientsPage],
})
export class IngredientsPageModule {}
