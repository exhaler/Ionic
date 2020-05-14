import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientPageRoutingModule } from './ingredient-routing.module';
import { IngredientPage } from './ingredient.page';
import { SharedModule } from "../../shared/shared.module";
import { PipesModule } from "../../pipes/pipes.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientPageRoutingModule,
    SharedModule,
    PipesModule
  ],
  declarations: [IngredientPage]
})
export class IngredientPageModule {}
