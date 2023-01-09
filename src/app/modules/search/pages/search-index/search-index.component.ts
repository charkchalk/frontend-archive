import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { SearchService } from "../../search.service";

@Component({
  selector: "app-search-index",
  templateUrl: "./search-index.component.html",
  styleUrls: ["./search-index.component.scss"],
})
export class SearchIndexComponent implements OnInit {
  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected searchService: SearchService,
  ) {}

  public ngOnInit(): void {
    this.route.queryParamMap
      .subscribe(params => {
        this.searchService.searchHelperEnabled.next(
          params.get("helper")?.toLowerCase() === "on",
        );
      })
      .unsubscribe();

    this.searchService.searchHelperEnabled.subscribe(enabled => {
      this.router.navigate(["."], {
        relativeTo: this.route,
        queryParams: enabled ? { helper: "on" } : undefined,
      });
    });
  }
}
