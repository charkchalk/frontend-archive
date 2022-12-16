import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatChipEditedEvent, MatChipInputEvent } from "@angular/material/chips";

import Filter from "../../../../filters/common/filter";
import TextFilter from "../../../../filters/common/text-filter";

@Component({
  selector: "app-text-content-input",
  templateUrl: "./text-content-input.component.html",
  styleUrls: ["./text-content-input.component.scss"],
})
export class TextContentInputComponent implements OnInit, OnDestroy {
  @Input() public filter: Filter | null = null;
  public get textFilter(): TextFilter | null {
    return this.filter as TextFilter | null;
  }

  public readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public error: string | null = null;
  public items: string[] = [];

  public ngOnInit(): void {
    this.items = this.textFilter?.value || [];
  }

  public ngOnDestroy(): void {
    if (!this.textFilter) return;
    this.textFilter.value = this.items;
  }

  public add(event: MatChipInputEvent): void {
    this.error = null;
    const value = (event.value || "").trim();

    if (!value) return;

    const error = this.textFilter?.validate(value);
    if (error) {
      this.error = error.source;
      return;
    }

    this.items.push(value);

    event.chipInput?.clear();
  }

  public remove(index: number): void {
    this.items.splice(index, 1);
  }

  public edit(index: number, event: MatChipEditedEvent): void {
    this.error = null;
    const value = event.value.trim();

    if (!value) {
      this.remove(index);
      return;
    }

    const error = this.textFilter?.validate(value);
    if (error) {
      this.error = error.source;
      return;
    }

    this.items[index] = value;
  }
}
