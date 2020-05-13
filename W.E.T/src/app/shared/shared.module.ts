import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from "@ionic/angular";

import { SmallLoaderComponent } from "./small-loader/small-loader.component";

@NgModule({
  declarations: [SmallLoaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [SmallLoaderComponent]
})
export class SharedModule { }
