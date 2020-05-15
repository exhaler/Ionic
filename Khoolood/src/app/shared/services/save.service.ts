import { Injectable } from "@angular/core";

import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class SaveService {
  STORAGE_KEY = "savedItems";

  constructor(public storage: Storage) {}

  isSaved(obituaryId) {
    return this.getAllSavedItems().then((result) => {
      return (
        result.filter((val) => {
          return val.obituaryId === obituaryId;
        }).length > 0
      );
    });
  }

  saveItem(obituary) {
    return this.getAllSavedItems().then((result) => {
      if (result) {
        result.push(obituary);
        return this.storage.set(this.STORAGE_KEY, result);
      } else {
        return this.storage.set(this.STORAGE_KEY, [obituary]);
      }
    });
  }

  unSaveItem(obituary) {
    return this.getAllSavedItems().then((result) => {
      if (result) {
        var removeIndex = result
          .map(function (item) {
            return item.obituaryId;
          })
          .indexOf(obituary.obituaryId);
        result.splice(removeIndex, 1);
        return this.storage.set(this.STORAGE_KEY, result);
      }
    });
  }

  getAllSavedItems() {
    return this.storage.get(this.STORAGE_KEY);
  }
}
