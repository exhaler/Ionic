import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { tap } from 'rxjs/operators';

import { MenuController } from "@ionic/angular";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

import { InventoryService } from '../services/inventory.service';

@Component({
  selector: "app-inventory-list",
  templateUrl: "./inventory-list.page.html",
  styleUrls: ["./inventory-list.page.scss"],
})
export class InventoryListPage implements OnInit {
  public inventories$ = this.inventoryServ.inventories$.pipe(
    tap((data) => console.log("getting inventories$", data))
  );

  constructor(
    private barcode: BarcodeScanner,
    private router: Router,
    private menu: MenuController,
    private inventoryServ: InventoryService,
  ) {}

  ngOnInit() {}

  openBarcodeScanner() {
    this.barcode.scan().then((data) => {
      const code = data.text;
      alert(code);
    });
  }

  goToInventory(id, params = {}) {
    this.router.navigate(["inventory-edit", id], {
      queryParams: params,
    });
  }

  openMenu() {
    this.menu.toggle();
  }
}
