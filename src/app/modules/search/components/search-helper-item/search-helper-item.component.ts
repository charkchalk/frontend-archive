import { Component, EventEmitter, Output } from "@angular/core";

import { SearchService } from "../../search.service";

@Component({
  selector: "app-search-helper-item",
  templateUrl: "./search-helper-item.component.html",
  styleUrls: ["./search-helper-item.component.scss"],
})
export class SearchHelperItemComponent {
  @Output() public removed: EventEmitter<void> = new EventEmitter();

  public constructor(protected searchService: SearchService) {}
}
