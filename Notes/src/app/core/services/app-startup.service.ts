import { Injectable } from "@angular/core";
import { SqliteStorageService } from "./sqlite-storage.service";
import { NotesService } from "./notes.service";

@Injectable({
  providedIn: "root",
})
export class AppStartupService {
  constructor(
    private sqliteStorage: SqliteStorageService,
    private notesService: NotesService
  ) {}

  async doStartupTasks() {
    const db = await this.sqliteStorage.initStorage();
    if (db) {
      console.log('database created');
      await this.sqliteStorage.database.executeSql(
        `CREATE TABLE IF NOT EXISTS notes
        (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, archived INTEGER default 0)`,
        []
      );
    } else {
      console.log('database not created');
    }
    this.notesService.initNotes();
  }
}

export function startupServiceFactory(
  startupService: AppStartupService
): Function {
  return () => {
    return startupService.doStartupTasks();
  };
}