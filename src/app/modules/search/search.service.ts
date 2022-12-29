import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import Filter from "./filters/common/filter";
import FilterFactory from "./filters/common/filter-factory";
import KeywordFilterFactory from "./filters/keyword-filter/keyword-filter-factory";
import TeacherFilterFactory from "./filters/teacher-filter/teacher-filter-factory";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private factories: FilterFactory[] = [];

  public constructor(
    private teacherFilterFactory: TeacherFilterFactory,
    private keywordFilterFactory: KeywordFilterFactory,
  ) {
    this.factories.push(teacherFilterFactory);
    this.factories.push(keywordFilterFactory);
  }

  public getFilterFactories(): FilterFactory[] {
    return this.factories;
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
