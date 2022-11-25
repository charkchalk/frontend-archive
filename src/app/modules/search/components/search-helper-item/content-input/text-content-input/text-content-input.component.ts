import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, Input } from "@angular/core";
import { MatChipEditedEvent, MatChipInputEvent } from "@angular/material/chips";

import TextFilter from "../../../../filters/common/text-filter";

@Component({
  selector: "app-text-content-input",
  templateUrl: "./text-content-input.component.html",
  styleUrls: ["./text-content-input.component.scss"],
})
export class TextContentInputComponent {
  @Input() public filter: TextFilter | null = null;

  public readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public error: string | null = null;
  public items: string[] = [];

  public add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    if (!value) return;

    let error = this.filter?.validate(value) || null;
    if (error) {
      this.error = error.source;
      return;
    }

    this.items.push(value);

    event.chipInput!.clear();
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
