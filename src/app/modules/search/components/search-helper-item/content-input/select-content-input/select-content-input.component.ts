import { Component, ElementRef, Input, ViewChild } from "@angular/core";

import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import SelectFilter from "../../../../filters/common/select-filter";

@Component({
  selector: "app-select-content-input",
  templateUrl: "./select-content-input.component.html",
  styleUrls: ["./select-content-input.component.scss"],
})
export class SelectContentInputComponent {
  @Input() public filter: SelectFilter<any> | null = null;

  public selectedOptions: string[] = [];
  public selectableOptions: string[] = [];

  @ViewChild("input")
  public input!: ElementRef<HTMLInputElement>;
  public inputControl = new FormControl("");

  public constructor() {
    this.inputControl.valueChanges.subscribe(value => {
      if (!value) return;
      this.filterOptions(value);
    });
  }

  protected filterOptions(value: string): void {
    if (!this.filter) return;
    this.selectableOptions = this.filter.getSuggestions(value);
  }

  public selectOption(event: MatAutocompleteSelectedEvent): void {
    this.selectedOptions.push(event.option.viewValue);
    this.input.nativeElement.value = "";
    this.inputControl.setValue(null);
  }

  public removeSelectedOption(index: number): void {
    this.selectedOptions.splice(index, 1);
  }
}
