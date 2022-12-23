import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import CompareOption from "../../../../filters/common/compare-option";
import Displayable from "../../../../filters/common/displayable";
import SelectFilter from "../../../../filters/common/select-filter";
import { SelectContentInputComponent } from "./select-content-input.component";

describe("SelectContentInputComponent", () => {
  let component: SelectContentInputComponent;
  let fixture: ComponentFixture<SelectContentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectContentInputComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectContentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should list selectable options", async () => {
    const selectFilter: SelectFilter = new TestSelectFilter();
    component.filter = selectFilter;

    component.ngOnInit();
    fixture.autoDetectChanges(true);
    await fixture.whenStable();

    const input: HTMLInputElement = fixture.debugElement.query(
      By.css("input"),
    ).nativeElement;
    input.click();
    fixture.autoDetectChanges(true);
    await fixture.whenStable();

    const options = fixture.debugElement.queryAll(By.css("mat-option"));

    expect(options.length).toBe(selectFilter.getSuggestions("").length);
  });

  it("should be able to initialize selected values", async () => {
    const selectFilter: SelectFilter = new TestSelectFilter();
    const suggestions = selectFilter.getSuggestions("");
    selectFilter.value = suggestions;
    component.filter = selectFilter;

    component.ngOnInit();
    fixture.autoDetectChanges(true);
    await fixture.whenStable();

    const chips = fixture.debugElement.queryAll(By.css("mat-chip-row"));
    expect(chips.length)
      .withContext("多選比對內容長度")
      .toBe(suggestions.length);
    expect(chips[0].nativeElement.textContent)
      .withContext("第一個多選比對內容")
      .toContain(suggestions[0].value);
    expect(chips[1].nativeElement.textContent)
      .withContext("第二個多選比對內容")
      .toContain(suggestions[1].value);
  });

  it("should update selectable options when enter text", async () => {
    const selectFilter: SelectFilter = new TestSelectFilter();
    const suggestions = selectFilter.getSuggestions("");
    component.filter = selectFilter;

    component.ngOnInit();
    fixture.autoDetectChanges(true);
    await fixture.whenStable();

    const input: HTMLInputElement = fixture.debugElement.query(
      By.css("input"),
    ).nativeElement;
    input.click();
    await fixture.whenStable();

    input.value = suggestions[0].value;
    input.dispatchEvent(new Event("input"));
    await fixture.whenStable();

    const options = fixture.debugElement.queryAll(By.css("mat-option"));
    expect(options.length).toBe(1);
    expect(options[0].nativeElement.textContent?.trim()).toBe(
      suggestions[0].value,
    );
  });

  it("should be able to select value and remove selected value from selectable options", async () => {
    const selectFilter: SelectFilter = new TestSelectFilter();
    const suggestions = selectFilter.getSuggestions("");
    component.filter = selectFilter;

    component.ngOnInit();
    fixture.autoDetectChanges(true);
    await fixture.whenStable();

    const input = fixture.debugElement.query(By.css("input")).nativeElement;
    input.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const firstOption = fixture.debugElement.query(
      By.css("mat-option"),
    ).nativeElement;
    firstOption.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.filter.value)
      .withContext("selected values")
      .toEqual([suggestions[0]]);

    input.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const options = fixture.debugElement.queryAll(By.css("mat-option"));

    expect(options.length)
      .withContext("selectable options length after added")
      .toBe(suggestions.length - 1);

    expect(options.map(element => element.nativeElement.textContent?.trim()))
      .withContext(
        "selectable options after added does not contain selected value",
      )
      .not.toContain(suggestions[0].value);
  });

  it("should be able to remove selected value and display value to selectable options", async () => {
    const selectFilter: SelectFilter = new TestSelectFilter();
    const suggestions = selectFilter.getSuggestions("");
    selectFilter.value = suggestions;
    component.filter = selectFilter;

    component.ngOnInit();
    fixture.autoDetectChanges(true);
    await fixture.whenStable();

    const removeButtonOfFirstChip: HTMLElement = fixture.debugElement.query(
      By.css("mat-chip-row button"),
    ).nativeElement;
    removeButtonOfFirstChip.click();
    await fixture.whenStable();

    expect(component.filter.value).toEqual([suggestions[0]]);

    const chips = fixture.debugElement.queryAll(By.css("mat-chip-row"));
    expect(chips.length).withContext("length of selectable options").toBe(1);

    expect(chips[0].nativeElement.textContent)
      .withContext("value of selectable options")
      .toContain(suggestions[0].value);
  });
});

export class TestSelectFilter implements SelectFilter {
  public static readonly key = "select-filter";
  public static readonly label = "SelectFilter";
  public getKey(): string {
    return TestSelectFilter.key;
  }
  public getLabel(): string {
    return TestSelectFilter.label;
  }

  public readonly type = "select";

  public readonly selectableCompareOptions: CompareOption[] = [
    {
      key: "equal",
      symbol: "==",
      label: "等於",
    },
    {
      key: "notEqual",
      symbol: "!=",
      label: "不等於",
    },
  ];

  public compareOption: CompareOption | null = null;

  public getSuggestions(value: string): Displayable[] {
    const selectable: Displayable[] = [
      {
        key: "1",
        value: "1",
      },
      {
        key: "2",
        value: "2",
      },
    ];

    const inputValue = value.trim().toLowerCase();

    if (inputValue === "") {
      return selectable;
    }

    return selectable.filter(selectable => {
      return selectable.value.toLowerCase().includes(inputValue);
    });
  }

  public value: Displayable[] = [];
}
