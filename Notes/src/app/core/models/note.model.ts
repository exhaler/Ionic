import { observable, action } from "mobx-angular";

export interface INote {
  id: number;
  title: string;
  description: string;
  archived: boolean;
  imagePath: string;
  reminderTime?: string;
}

export class Note implements INote {
  id: number;
  title: string;
  description: string;
  @observable archived: boolean;
  @observable imagePath: string;
  @observable reminderTime: string;

  constructor(note: Partial<INote>) {
    this.id = note.id ? note.id : new Date().getTime();
    this.title = note.title ? note.title : "";
    this.description = note.description ? note.description : "";
    this.setArchived(note.archived !== undefined ? note.archived : false);
    this.setImagePath(note.imagePath ? note.imagePath : "");
    this.setReminderTime(note.reminderTime ? note.reminderTime : "");
  }

  @action
  setArchived(value) {
    this.archived = value;
  }

  @action
  setImagePath(imagePath) {
    this.imagePath = imagePath;
  }

  @action
  setReminderTime(reminderTime) {
    this.reminderTime = reminderTime;
  }
}
