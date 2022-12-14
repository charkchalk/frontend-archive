import { Component, OnDestroy, OnInit } from "@angular/core";

import Filter from "../../filters/common/filter";
import { SearchService } from "../../search.service";

@Component({
  selector: "app-search-helper",
  templateUrl: "./search-helper.component.html",
  styleUrls: ["./search-helper.component.scss"],
})
export class SearchHelperComponent implements OnInit, OnDestroy {
  protected filters: Array<Filter | null> = [];
  public constructor(protected searchService: SearchService) {}

  public ngOnInit(): void {
    this.filters = this.searchService.filters;
    if (!this.filters.length) this.addFilter();
  }

  public replaceFilter(index: number, filterKey: string): void {
    const filter = this.searchService.getFilter(filterKey);
    if (!filter) return;

    this.filters.splice(index, 1, new filter());
  }

  protected addFilter(): void {
    this.filters.push(null);
  }

  protected removeFilter(index: number): void {
    this.filters.splice(index, 1);
  }

  public ngOnDestroy(): void {
    this.searchService.filters = this.filters.filter(
      filter => !!filter,
    ) as Filter[];
  }
}
