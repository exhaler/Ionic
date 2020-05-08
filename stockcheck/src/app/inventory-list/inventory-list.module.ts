import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { InventoryListPageRoutingModule } from "./inventory-list-routing.module";

import { InventoryListPage } from "./inventory-list.page";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    InventoryListPageRoutingModule,
  ],
  declarations: [InventoryListPage],
})
export class InventoryListPageModule {}
