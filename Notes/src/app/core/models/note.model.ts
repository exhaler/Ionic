import { observable } from 'rxjs';
import { action } from 'mobx';

export interface INote {
  id: number;
  title: string;
  description: string;
  archived: boolean;
}

export class Note implements INote {
  id: number;
  title: string;
  description: string;
  @observable archived: boolean;

  constructor(note: Partial<INote>) {
    this.id = note.id ? note.id : new Date().getTime();
    this.title = note.title ? note.title : "";
    this.description = note.description ? note.description : "";
    this.setArchived(this.archived = note.archived !== undefined ? note.archived : false);
  }

  @action
  setArchived(value) {
    this.archived = value
  }
}
