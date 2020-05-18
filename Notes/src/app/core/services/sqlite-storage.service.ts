import { Injectable } from "@angular/core";

import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Platform } from "@ionic/angular";

import { STORE_CONFIG } from "../constants/store-config";

@Injectable({
  providedIn: "root",
})
export class SqliteStorageService {
  database: SQLiteObject;

  constructor(private platform: Platform, private sqlite: SQLite) {}

  async initStorage() {
    try {
      await this.platform.ready();
      this.database = await this.sqlite.create({
        name: STORE_CONFIG.DATABASE_NAME,
        location: STORE_CONFIG.DATABASE_LOCATION,
      });
      return this.database;
    } catch (err) {
      console.log(err);
    }
  }
}
