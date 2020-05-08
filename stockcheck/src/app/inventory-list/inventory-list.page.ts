import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { tap, take } from 'rxjs/operators';

import { MenuController, Platform } from "@ionic/angular";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

import { InventoryService } from '../services/inventory.service';
import { Inventory } from '../services/model';

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
    private platform: Platform,
  ) {}

  ngOnInit() {}

  openBarcodeScanner() {
    if (this.platform.is('mobile')) {
        this.barcode.scan().then(data => {
            const code = data.text;
            this.inventoryServ
                .getByCode(code)
                .pipe(take(1))
                .subscribe((item: Inventory) => {
                    if (item) {
                        this.goToInventory(item.id);
                    } else {
                        this.goToInventory('new', { code });
                    }
                });
        });
    } else {
        this.goToInventory('new');
    }
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
