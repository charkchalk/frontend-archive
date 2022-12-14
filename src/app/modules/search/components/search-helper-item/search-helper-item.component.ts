import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import Filter from "../../filters/common/filter";
import { SearchService } from "../../search.service";

@Component({
  selector: "app-search-helper-item",
  templateUrl: "./search-helper-item.component.html",
  styleUrls: ["./search-helper-item.component.scss"],
})
export class SearchHelperItemComponent implements OnInit {
  @Input() public filter: Filter | null = null;

  @Output() public removed: EventEmitter<void> = new EventEmitter();
  @Output() public changed: EventEmitter<string> = new EventEmitter();

  public constructor(protected searchService: SearchService) {}

  public availableFilters: typeof Filter[] = [];
  public ngOnInit(): void {
    this.availableFilters = this.searchService.getAvailableFilters();
  }
}
