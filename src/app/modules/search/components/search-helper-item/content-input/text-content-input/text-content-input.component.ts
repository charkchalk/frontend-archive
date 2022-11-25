import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipEditedEvent, MatChipInputEvent } from "@angular/material/chips";

import { Component } from "@angular/core";

@Component({
  selector: "app-text-content-input",
  templateUrl: "./text-content-input.component.html",
  styleUrls: ["./text-content-input.component.scss"],
})
export class TextContentInputComponent {
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public items: string[] = [];

  public add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    if (value) {
      this.items.push(value);
    }

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
