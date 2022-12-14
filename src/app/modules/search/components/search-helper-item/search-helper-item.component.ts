import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";

import CompareOption from "../../filters/common/compare-option";
import Filter from "../../filters/common/filter";
import { SearchService } from "../../search.service";

@Component({
  selector: "app-search-helper-item",
  templateUrl: "./search-helper-item.component.html",
  styleUrls: ["./search-helper-item.component.scss"],
})
export class SearchHelperItemComponent implements OnInit, OnDestroy {
  @Input() public filter: Filter | null = null;

  @Output() public removed: EventEmitter<void> = new EventEmitter();
  @Output() public changed: EventEmitter<string> = new EventEmitter();

  public constructor(protected searchService: SearchService) {}

  public availableFilters: typeof Filter[] = [];
  public compareOption: CompareOption | null = null;
  public ngOnInit(): void {
    this.availableFilters = this.searchService.getAvailableFilters();
    this.compareOption = this.filter?.compareOption ?? null;
  }

  public ngOnDestroy(): void {
    if (!this.filter) return;
    this.filter.compareOption = this.compareOption;
  }
}
