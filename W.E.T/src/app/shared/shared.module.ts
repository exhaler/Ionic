import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from "@ionic/angular";

import { SmallLoaderComponent } from "./small-loader/small-loader.component";
import { BigLoaderComponent } from './big-loader/big-loader.component';

@NgModule({
  declarations: [SmallLoaderComponent, BigLoaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [SmallLoaderComponent, BigLoaderComponent]
})
export class SharedModule { }
