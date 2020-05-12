import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

import { IonicModule } from "@ionic/angular";

import { ArticlesComponent } from "./articles/articles.component";

@NgModule({
  declarations: [ArticlesComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [ArticlesComponent],
})
export class ComponentsModule {}
