import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { ArticlesComponent } from "./articles/articles.component";

@NgModule({
  declarations: [ArticlesComponent],
  imports: [CommonModule, IonicModule],
  exports: [ArticlesComponent],
})
export class ComponentsModule {}
