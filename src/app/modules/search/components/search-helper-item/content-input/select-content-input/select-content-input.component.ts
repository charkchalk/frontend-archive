import { Component, Input, OnDestroy, OnInit } from "@angular/core";

import Displayable from "../../../../filters/common/displayable";
import Filter from "../../../../filters/common/filter";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import SelectFilter from "../../../../filters/common/select-filter";

@Component({
  selector: "app-select-content-input",
  templateUrl: "./select-content-input.component.html",
  styleUrls: ["./select-content-input.component.scss"],
})
export class SelectContentInputComponent implements OnInit, OnDestroy {
  @Input() public filter: SelectFilter | Filter | null = null;
  public get selectFilter(): SelectFilter | null {
    return this.filter as SelectFilter | null;
  }

  public selectedOptions: Displayable[] = [];
  public selectableOptions: Displayable[] = [];

  public inputControl = new FormControl("");

  public constructor() {
    this.inputControl.valueChanges.subscribe(value => {
      if (typeof value !== "string") return;
      this.filterOptions(value);
    });
  }

  public ngOnInit(): void {
    this.selectedOptions = this.selectFilter?.value || [];
    this.filterOptions("");
  }

  public ngOnDestroy(): void {
    if (!this.selectFilter) return;
    this.selectFilter.value = this.selectedOptions;
  }

  protected filterOptions(value: string): void {
    if (!this.selectFilter) return;
    this.selectableOptions = this.selectFilter
      .getSuggestions(value)
      .filter(value => {
        return !this.selectedOptions.some(
          selected => selected.key === value.key,
        );
      });
  }

  public selectOption(event: MatAutocompleteSelectedEvent): void {
    this.selectedOptions.push(event.option.value);
    this.inputControl.setValue("");
  }

  public removeSelectedOption(index: number): void {
    this.selectedOptions.splice(index, 1);
    this.filterOptions("");
  }
}
