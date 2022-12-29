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
import FilterFactory from "../../filters/common/filter-factory";
import { SearchService } from "../../search.service";

@Component({
  selector: "app-search-helper-item",
  templateUrl: "./search-helper-item.component.html",
  styleUrls: ["./search-helper-item.component.scss"],
})
export class SearchHelperItemComponent implements OnInit, OnDestroy {
  @Input() public filter: Filter | null = null;

  @Output() public removed: EventEmitter<void> = new EventEmitter();
  @Output() public changed: EventEmitter<FilterFactory> = new EventEmitter();

  public constructor(protected searchService: SearchService) {}

  public filterFactories: FilterFactory[] = [];
  public compareOption: CompareOption | null = null;
  public ngOnInit(): void {
    this.filterFactories = this.searchService.getFilterFactories();
    this.compareOption = this.filter?.compareOption ?? null;
  }

  public ngOnDestroy(): void {
    if (!this.filter) return;
    this.filter.compareOption = this.compareOption;
  }
}
