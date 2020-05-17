import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

import { NotesFilters } from "../../../core/constants/notes-filter.enum";

@Component({
  selector: "app-notes-filters-popover",
  templateUrl: "./notes-filters-popover.component.html",
  styleUrls: ["./notes-filters-popover.component.scss"],
})
export class NotesFiltersPopoverComponent implements OnInit {
  selectedFilter: NotesFilters = NotesFilters.ACTIVE;
  filters = NotesFilters;

  constructor(private popOverCtrl: PopoverController) {}

  ngOnInit() {}

  setFilter(filter: NotesFilters) {
    this.popOverCtrl.dismiss(filter);
  }
}
