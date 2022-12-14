import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, Input } from "@angular/core";
import { MatChipEditedEvent, MatChipInputEvent } from "@angular/material/chips";

import Filter from "../../../../filters/common/filter";
import TextFilter from "../../../../filters/common/text-filter";

@Component({
  selector: "app-text-content-input",
  templateUrl: "./text-content-input.component.html",
  styleUrls: ["./text-content-input.component.scss"],
})
export class TextContentInputComponent {
  @Input() public filter: Filter | null = null;
  public get textFilter(): TextFilter | null {
    return this.filter as TextFilter | null;
  }

  public readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public error: string | null = null;
  public items: string[] = [];

  public add(event: MatChipInputEvent): void {
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
    const value = event.value.trim();

    if (!value) {
      this.remove(index);
      return;
    }

    this.items[index] = value;
  }
}
