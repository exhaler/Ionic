import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SlugifyPipe } from "./slugify.pipe";
import { SearchIngredientsPipe } from "./search-ingredients.pipe";
import { ReplaceUnderscorePipe } from "./replace-underscore.pipe";

@NgModule({
  declarations: [SlugifyPipe, SearchIngredientsPipe, ReplaceUnderscorePipe],
  imports: [CommonModule],
  exports: [SlugifyPipe, SearchIngredientsPipe, ReplaceUnderscorePipe],
})
export class PipesModule {}
