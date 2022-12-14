import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import Filter from "./filters/common/filter";
import KeywordFilter from "./filters/keyword-filter/keyword-filter";
import TeacherFilter from "./filters/teacher-filter/teacher-filter";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private availableFilters: typeof Filter[] = [TeacherFilter, KeywordFilter];

  public getAvailableFilters(): typeof Filter[] {
    return this.availableFilters;
  }

  public getFilter(key: string): typeof Filter | null {
    return this.availableFilters.find(filter => filter.key === key) || null;
  }

  public filters: Filter[] = [];

  public searchHelperEnabled = new BehaviorSubject(false);

  public enableSearchHelper(): void {
    this.searchHelperEnabled.next(true);
  }

  public disableSearchHelper(): void {
    this.searchHelperEnabled.next(false);
  }

  public toggleSearchHelper(): void {
    this.searchHelperEnabled.next(!this.searchHelperEnabled.value);
  }
}
