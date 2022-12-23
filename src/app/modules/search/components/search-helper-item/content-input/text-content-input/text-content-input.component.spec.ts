import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatChipEditedEvent,
  MatChipEditInput,
  MatChipsModule,
} from "@angular/material/chips";
import {
  MatChipGridHarness,
  MatChipInputHarness,
} from "@angular/material/chips/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import CompareOption from "../../../../filters/common/compare-option";
import TextFilter from "../../../../filters/common/text-filter";
import { TextContentInputComponent } from "./text-content-input.component";

describe("TextContentInputComponent", () => {
  let component: TextContentInputComponent;
  let fixture: ComponentFixture<TextContentInputComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextContentInputComponent],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TextContentInputComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be able to initialize selected values", async () => {
    const filter: TextFilter = new TestTextFilter();
    filter.value = ["test1", "test2"];
    component.filter = filter;

    component.ngOnInit();
    fixture.autoDetectChanges(true);
    await fixture.whenStable();

    const testChipGrid = await loader.getHarness(MatChipGridHarness);
    const chips = await testChipGrid.getRows();
    expect(chips.length)
      .withContext("should have 2 chips")
      .toBe(filter.value.length);
    expect(await chips[0].getText())
      .withContext("first text should be test1")
      .toBe(filter.value[0]);
    expect(await chips[1].getText())
      .withContext("second text should be test2")
      .toBe(filter.value[1]);
  });

  it("should be able to add new value", async () => {
    const filter: TextFilter = new TestTextFilter();
    filter.value = ["test1", "test2"];
    component.filter = filter;

    component.ngOnInit();
    fixture.autoDetectChanges(true);
    await fixture.whenStable();

    const chipInput = await loader.getHarness(MatChipInputHarness);
    await chipInput.focus();
    await chipInput.setValue("test3");
    await chipInput.blur();

    const chipGrid = await loader.getHarness(MatChipGridHarness);
    const chips = await chipGrid.getRows();
    expect(chips.length).withContext("should have 3 chips").toBe(3);
    expect(await chips[2].getText())
      .withContext("text should be test3")
      .toBe("test3");
  });

  it("should be able to edit value", async () => {
    const filter: TextFilter = new TestTextFilter();
    filter.value = ["test1", "test2"];
    component.filter = filter;

    component.ngOnInit();
    fixture.autoDetectChanges(true);
    await fixture.whenStable();

    const chips = fixture.debugElement.queryAll(By.css("mat-chip-row"));
    chips[0].triggerEventHandler("dblclick", new MouseEvent("dblclick"));
    fixture.autoDetectChanges(true);

    const input: HTMLElement = chips[0].query(
      By.directive(MatChipEditInput),
    ).nativeElement;
    input.innerText = "new value";
    input.dispatchEvent(new Event("input"));
    input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));

    const chipGrid = await loader.getHarness(MatChipGridHarness);
    const chipsAfterEdit = await chipGrid.getRows();
    expect(chipsAfterEdit.length).withContext("should have 2 chips").toBe(2);
    expect(await chipsAfterEdit[0].getText())
      .withContext("should be new value")
      .toBe("new value");
    expect(await chipsAfterEdit[1].getText())
      .withContext("should be test2")
      .toBe("test2");
  });

  it("should be able to remove value", async () => {
    const filter: TextFilter = new TestTextFilter();
    filter.value = ["test1", "test2"];
    component.filter = filter;

    component.ngOnInit();
    fixture.autoDetectChanges(true);
    await fixture.whenStable();

    const chipGrid = await loader.getHarness(MatChipGridHarness);
    const chips = await chipGrid.getRows();
    chips[0].remove();
    fixture.autoDetectChanges(true);
    await fixture.whenStable();

    const chipsAfterRemove = await chipGrid.getRows();
    expect(chipsAfterRemove.length).withContext("should have 1 chip").toBe(1);
    expect(await chipsAfterRemove[0].getText())
      .withContext("should be test2")
      .toBe("test2");
  });

  describe("should be able to validate input", () => {
    it("should not be able to add value that not passed the rule", async () => {
      const filter: TextFilter = new TestTextFilter();
      component.filter = filter;

      component.ngOnInit();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      const chipInput = await loader.getHarness(MatChipInputHarness);
      await chipInput.focus();
      await chipInput.setValue("test value");
      await chipInput.blur();

      const chipGrid = await loader.getHarness(MatChipGridHarness);
      const chips = await chipGrid.getRows();
      expect(chips.length).withContext("should have 0 chips").toBe(0);
    });

    it("should not be able to edit value that not passed the rule", async () => {
      const filter: TextFilter = new TestTextFilter();
      filter.value = ["test1"];
      component.filter = filter;

      component.ngOnInit();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      component.edit(0, { value: "new@value" } as MatChipEditedEvent);

      const chipGrid = await loader.getHarness(MatChipGridHarness);
      const chipsAfterEdit = await chipGrid.getRows();
      expect(await chipsAfterEdit[0].getText())
        .withContext("should be original value")
        .toBe("test1");
    });
  });
});

export class TestTextFilter implements TextFilter {
  public static readonly key = "text-filter";
  public static readonly label = "TextFilter";
  public getKey(): string {
    return TestTextFilter.key;
  }
  public getLabel(): string {
    return TestTextFilter.label;
  }

  public readonly type = "text";

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

  public rules: RegExp[] = [new RegExp("[^a-zA-Z0-9]")];

  public getRule(): RegExp[] {
    return this.rules;
  }

  public validate(value: string): RegExp | null {
    const notPassed = this.rules.find(rule => rule.test(value));
    return notPassed ?? null;
  }

  public value: string[] = [];
}
