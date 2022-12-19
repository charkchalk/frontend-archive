import { Component, OnDestroy, OnInit } from "@angular/core";

import { AnyFilter, SearchService } from "../../search.service";

@Component({
  selector: "app-search-helper",
  templateUrl: "./search-helper.component.html",
  styleUrls: ["./search-helper.component.scss"],
})
export class SearchHelperComponent implements OnInit, OnDestroy {
  protected filters: AnyFilter[] = [];
  public constructor(protected searchService: SearchService) {}

  public ngOnInit(): void {
    this.filters = this.searchService.filters;
    if (!this.filters.length) this.addFilter();
  }

  protected addFilter(): void {
    this.filters.push({
      filtering: null,
      compareMethod: null,
      compareContent: null,
    });
  }

  protected removeFilter(index: number): void {
    this.filters.splice(index, 1);
  }

  public ngOnDestroy(): void {
    this.searchService.filters = this.filters;
  }
}
