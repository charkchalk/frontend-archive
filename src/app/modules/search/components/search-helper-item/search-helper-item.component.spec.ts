import {
  AnyFilter,
  InputType,
  MultipleSelectFiltrable,
  SearchService,
  TextFiltrable,
} from "../../search.service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyChipsModule as MatChipsModule } from "@angular/material/legacy-chips";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { SearchHelperItemComponent } from "./search-helper-item.component";

describe("SearchHelperItemComponent", () => {
  let component: SearchHelperItemComponent;
  let fixture: ComponentFixture<SearchHelperItemComponent>;
  const fakeSearchServiceData = {
    filtrables: {
      keyword: {
        key: "keyword",
        displayValue: "關鍵字",
        compareMethods: [
          {
            key: "includes",
            displayValue: "包含",
          },
          {
            key: "not-includes",
            displayValue: "不包含",
          },
        ],
        compareContent: {
          inputType: InputType.Text,
        },
      } as TextFiltrable,
      type: {
        key: "type",
        displayValue: "修別",
        compareMethods: [
          {
            key: "is",
            displayValue: "是",
          },
        ],
        compareContent: {
          inputType: InputType.MultipleSelect,
          selectables: [
            { key: "required", displayValue: "必修" },
            { key: "required-optional", displayValue: "必選" },
            { key: "optional", displayValue: "選修" },
            { key: "general", displayValue: "通識" },
          ],
        },
      } as MultipleSelectFiltrable,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchHelperItemComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatTooltipModule,
        MatInputModule,
        MatSelectModule,
      ],
      providers: [{ provide: SearchService, useValue: fakeSearchServiceData }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHelperItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("filtering", () => {
    it("should be able to initialize null value when no input", () => {
      const compareKey = fixture.nativeElement.querySelector(
        "mat-form-field:nth-child(1)",
      );
      expect(compareKey.textContent).toBe("過濾項");
    });

    it("should list selectable filtering options", async () => {
      const compareKey = fixture.nativeElement.querySelector(
        "mat-form-field:nth-child(1) mat-select",
      );
      compareKey.click();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      const compareKeyOptions = fixture.debugElement.queryAll(
        By.css(".mat-option"),
      );
      expect(compareKeyOptions.length).toBe(
        Object.values(fakeSearchServiceData.filtrables).length,
      );
    });

    it("should be able to initialize selected value", async () => {
      const testFiltrable = fakeSearchServiceData.filtrables.type;
      component.filter = {
        filtering: testFiltrable,
        compareMethod: null,
        compareContent: null,
      };
      component.ngOnInit();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      const compareKey = fixture.nativeElement.querySelector(
        "mat-form-field:nth-child(1) mat-select",
      );
      expect(compareKey.textContent).toBe(testFiltrable.displayValue);
    });

    it("should be able to change selected value", async () => {
      const testFiltrable = fakeSearchServiceData.filtrables.type;
      component.filter = {
        filtering: testFiltrable,
        compareMethod: null,
        compareContent: null,
      } as AnyFilter;
      component.ngOnInit();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      const compareKey = fixture.nativeElement.querySelector(
        "mat-form-field:nth-child(1) mat-select",
      );
      compareKey.click();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      fixture.debugElement
        .queryAll(By.css(".mat-option"))
        .find(
          element =>
            element.nativeElement.textContent.trim() ===
            fakeSearchServiceData.filtrables.keyword.displayValue,
        )
        ?.nativeElement.click();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      expect(component.filter.filtering).toEqual(
        fakeSearchServiceData.filtrables.keyword,
      );
    });
  });

  describe("compareMethod", () => {
    it("should be able to initialize null value when no input", () => {
      const compareType = fixture.nativeElement.querySelector(
        "mat-form-field:nth-child(2)",
      );
      expect(compareType.textContent).toBe("比對方式");
    });

    it("should list selectable compare methods", async () => {
      const testFiltrable = fakeSearchServiceData.filtrables.keyword;
      component.filter = {
        filtering: testFiltrable,
        compareMethod: null,
        compareContent: null,
      };
      component.ngOnInit();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      const compareType = fixture.nativeElement.querySelector(
        "mat-form-field:nth-child(2) mat-select",
      );
      compareType.click();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      const compareTypeOptions = fixture.debugElement.queryAll(
        By.css(".mat-option"),
      );
      expect(compareTypeOptions.length).toBe(
        testFiltrable.compareMethods.length,
      );
    });

    it("should update selectable compare methods when filtering changes", async () => {
      const testFiltrable = fakeSearchServiceData.filtrables.type;
      component.filter = {
        filtering: testFiltrable,
        compareMethod: null,
        compareContent: null,
      };
      component.ngOnInit();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      const compareType = fixture.nativeElement.querySelector(
        "mat-form-field:nth-child(2) mat-select",
      );
      compareType.click();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      let compareTypeOptions = fixture.debugElement.queryAll(
        By.css(".mat-option"),
      );
      expect(compareTypeOptions.length).toBe(
        testFiltrable.compareMethods.length,
      );

      const compareKey = fixture.nativeElement.querySelector(
        "mat-form-field:nth-child(1) mat-select",
      );
      compareKey.click();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      fixture.debugElement
        .queryAll(By.css(".mat-option"))
        .find(
          element =>
            element.nativeElement.textContent.trim() ===
            fakeSearchServiceData.filtrables.keyword.displayValue,
        )
        ?.nativeElement.click();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      compareType.click();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      compareTypeOptions = fixture.debugElement.queryAll(By.css(".mat-option"));
      expect(compareTypeOptions.length).toBe(
        fakeSearchServiceData.filtrables.keyword.compareMethods.length,
      );
    });

    it("should be able to initialize selected value", async () => {
      const testFiltrable = fakeSearchServiceData.filtrables.keyword;
      component.filter = {
        filtering: testFiltrable,
        compareMethod: testFiltrable.compareMethods[0],
        compareContent: null,
      };
      component.ngOnInit();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      const compareType = fixture.nativeElement.querySelector(
        "mat-form-field:nth-child(2) mat-select",
      );
      expect(compareType.textContent).toBe(
        testFiltrable.compareMethods[0].displayValue,
      );
    });

    it("should be able to change selected value", async () => {
      const testFiltrable = fakeSearchServiceData.filtrables.keyword;
      component.filter = {
        filtering: testFiltrable,
        compareMethod: testFiltrable.compareMethods[0],
        compareContent: null,
      };
      component.ngOnInit();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      const compareType = fixture.nativeElement.querySelector(
        "mat-form-field:nth-child(2) mat-select",
      );
      compareType.click();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      fixture.debugElement
        .queryAll(By.css(".mat-option"))
        .find(
          element =>
            element.nativeElement.textContent.trim() ===
            testFiltrable.compareMethods[1].displayValue,
        )
        ?.nativeElement.click();
      fixture.autoDetectChanges(true);
      await fixture.whenStable();

      expect(component.filter.compareMethod).toEqual(
        testFiltrable.compareMethods[1],
      );
    });
  });

  describe("compareContent", () => {
    it("should be able to initialize null value when no input", () => {
      const compareContent = fixture.nativeElement.querySelector(
        "mat-form-field:nth-child(3)",
      );
      expect(compareContent.textContent).toBe("比對內容");
    });

    describe("text type", () => {
      it("should be able to initialize text values", async () => {
        const testFiltrable = fakeSearchServiceData.filtrables.keyword;

        component.filter = {
          filtering: testFiltrable,
          compareMethod: null,
          compareContent: "Test Content",
        };
        component.ngOnInit();
        fixture.autoDetectChanges(true);
        await fixture.whenStable();

        const textCompareContent = fixture.nativeElement.querySelector(
          "mat-form-field:nth-child(3) input",
        );

        expect(textCompareContent.value).toContain("Test Content");
      });

      it("should be able to change inputted value", async () => {
        const testFiltrable = fakeSearchServiceData.filtrables.keyword;
        component.filter = {
          filtering: testFiltrable,
          compareMethod: testFiltrable.compareMethods[0],
          compareContent: "test",
        };
        component.ngOnInit();
        fixture.autoDetectChanges(true);
        await fixture.whenStable();

        const compareContent = fixture.nativeElement.querySelector(
          "mat-form-field:nth-child(3) input",
        );
        compareContent.value = "test2";
        compareContent.dispatchEvent(new Event("input"));
        fixture.autoDetectChanges(true);
        await fixture.whenStable();

        expect(component.filter.compareContent).toBe("test2");
      });
    });

    describe("multiple-select type", () => {
      it("should list selectable compare methods", async () => {
        const testFiltrable = fakeSearchServiceData.filtrables.type;
        component.filter = {
          filtering: testFiltrable,
          compareMethod: null,
          compareContent: null,
        };
        component.ngOnInit();
        fixture.autoDetectChanges(true);
        await fixture.whenStable();

        const compareContent = fixture.nativeElement.querySelector(
          "mat-form-field:nth-child(3) input",
        );
        compareContent.click();
        fixture.autoDetectChanges(true);
        await fixture.whenStable();

        const compareContentOptions = fixture.debugElement.queryAll(
          By.css(".mat-option"),
        );
        expect(compareContentOptions.length).toBe(
          testFiltrable.compareContent.selectables.length,
        );
      });

      it("should update selectable compare methods when filtering changed", async () => {
        const filtering = fixture.nativeElement.querySelector(
          "mat-form-field:nth-child(1) mat-select",
        );
        filtering.click();
        fixture.autoDetectChanges(true);
        await fixture.whenStable();

        fixture.debugElement
          .queryAll(By.css(".mat-option"))
          .find(
            element =>
              element.nativeElement.textContent.trim() ===
              fakeSearchServiceData.filtrables.type.displayValue,
          )
          ?.nativeElement.click();
        fixture.autoDetectChanges(true);
        await fixture.whenStable();

        const compareContent = fixture.nativeElement.querySelector(
          "mat-form-field:nth-child(3) input",
        );
        compareContent.click();
        fixture.autoDetectChanges(true);
        await fixture.whenStable();

        const compareContentOptions = fixture.debugElement.queryAll(
          By.css(".mat-option"),
        );
        expect(compareContentOptions.length).toBe(
          fakeSearchServiceData.filtrables.type.compareContent.selectables
            .length,
        );
      });

      it("should be able to initialize selected values", async () => {
        const testFiltrable = fakeSearchServiceData.filtrables.type;

        component.filter = {
          filtering: testFiltrable,
          compareMethod: null,
          compareContent: [
            testFiltrable.compareContent.selectables[0],
            testFiltrable.compareContent.selectables[1],
          ],
        };
        component.ngOnInit();
        fixture.autoDetectChanges(true);
        await fixture.whenStable();

        const selectedCompareContent = fixture.nativeElement.querySelectorAll(
          "mat-form-field:nth-child(3) mat-chip",
        );
        expect(selectedCompareContent.length)
          .withContext("多選比對內容長度")
          .toBe(2);
        expect(selectedCompareContent[0].textContent)
          .withContext("第一個多選比對內容")
          .toContain(testFiltrable.compareContent.selectables[0].displayValue);
        expect(selectedCompareContent[1].textContent)
          .withContext("第二個多選比對內容")
          .toContain(testFiltrable.compareContent.selectables[1].displayValue);
      });

      it("should update selectable compare methods when enter text", async () => {
        const testFiltrable = fakeSearchServiceData.filtrables.type;
        component.filter = {
          filtering: testFiltrable,
          compareMethod: null,
          compareContent: null,
        };
        component.ngOnInit();
        fixture.autoDetectChanges(true);
        await fixture.whenStable();

        const compareContent = fixture.debugElement.query(
          By.css("mat-form-field:nth-child(3) input"),
        ).nativeElement;
        compareContent.click();
        await fixture.whenStable();

        compareContent.value =
          testFiltrable.compareContent.selectables[0].displayValue;
        compareContent.dispatchEvent(new Event("input"));
        await fixture.whenStable();

        const compareContentOptions = fixture.debugElement.queryAll(
          By.css(".mat-option"),
        );
        expect(compareContentOptions.length).toBe(1);
        expect(compareContentOptions[0].nativeElement.textContent.trim()).toBe(
          testFiltrable.compareContent.selectables[0].displayValue,
        );
      });

      it("should be able to select value and remove selected values from selectable compare methods", async () => {
        const testFiltrable = fakeSearchServiceData.filtrables.type;
        component.filter = {
          filtering: testFiltrable,
          compareMethod: null,
          compareContent: null,
        };
        component.ngOnInit();
        fixture.autoDetectChanges(true);
        await fixture.whenStable();

        const compareContent = fixture.nativeElement.querySelector(
          "mat-form-field:nth-child(3) input",
        );
        compareContent.click();
        await fixture.whenStable();

        const compareContentOption = fixture.debugElement.query(
          By.css(".mat-option"),
        );
        compareContentOption.nativeElement.click();
        await fixture.whenStable();

        expect(component.filter.compareContent).toEqual([
          testFiltrable.compareContent.selectables[0],
        ]);

        compareContent.click();
        await fixture.whenStable();

        const compareContentOptions = fixture.debugElement.queryAll(
          By.css(".mat-option"),
        );
        expect(compareContentOptions.length).toBe(
          testFiltrable.compareContent.selectables.length - 1,
        );
        expect(
          compareContentOptions.map(element =>
            element.nativeElement.textContent.trim(),
          ),
        ).not.toContain(
          testFiltrable.compareContent.selectables[0].displayValue,
        );
      });

      it("should be able to remove selected value", async () => {
        const testFiltrable = fakeSearchServiceData.filtrables.type;
        component.filter = {
          filtering: testFiltrable,
          compareMethod: null,
          compareContent: [
            testFiltrable.compareContent.selectables[0],
            testFiltrable.compareContent.selectables[1],
          ],
        };
        component.ngOnInit();
        fixture.autoDetectChanges(true);
        await fixture.whenStable();

        const selectedCompareContent = fixture.debugElement.query(
          By.css("mat-form-field:nth-child(3) mat-chip button"),
        ).nativeElement;
        selectedCompareContent.click();
        await fixture.whenStable();

        expect(component.filter.compareContent).toEqual([
          testFiltrable.compareContent.selectables[1],
        ]);
      });
    });
  });

  describe("remove button", () => {
    it("should emit removed event when remove button clicked", () => {
      spyOn(component.removed, "emit");
      fixture.nativeElement.querySelector(":scope > div > button").click();
      expect(component.removed.emit).toHaveBeenCalled();
    });
  });
});
