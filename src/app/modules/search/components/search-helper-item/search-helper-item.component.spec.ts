import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSelectHarness } from "@angular/material/select/testing";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SearchService } from "../../search.service";
import { SelectContentInputComponent } from "./content-input/select-content-input/select-content-input.component";
import { TestSelectFilter } from "./content-input/select-content-input/select-content-input.component.spec";
import { TextContentInputComponent } from "./content-input/text-content-input/text-content-input.component";
import { TestTextFilter } from "./content-input/text-content-input/text-content-input.component.spec";
import { SearchHelperItemComponent } from "./search-helper-item.component";

describe("SearchHelperItemComponent", () => {
  let component: SearchHelperItemComponent;
  let fixture: ComponentFixture<SearchHelperItemComponent>;
  let loader: HarnessLoader;
  let searchServiceSpy: jasmine.SpyObj<SearchService>;

  beforeEach(async () => {
    const searchService = new SearchService();
    searchService.getAvailableFilters = jasmine
      .createSpy()
      .and.returnValue([TestSelectFilter, TestTextFilter]);

    await TestBed.configureTestingModule({
      declarations: [
        SearchHelperItemComponent,
        SelectContentInputComponent,
        TextContentInputComponent,
      ],
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
      providers: [{ provide: SearchService, useValue: searchService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHelperItemComponent);
    searchServiceSpy = TestBed.inject(
      SearchService,
    ) as jasmine.SpyObj<SearchService>;
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("filtering", () => {
    it("should initialize filtering value", async () => {
      const filter = new TestSelectFilter();
      component.filter = filter;
      component.ngOnInit();
      fixture.detectChanges();
      await fixture.whenStable();

      const allSelect = await loader.getAllHarnesses(MatSelectHarness);
      const filterSelect = allSelect[0];
      const selected = await filterSelect.getValueText();
      expect(selected).toEqual(filter.getLabel());
    });

    it("should list selectable options", async () => {
      component.ngOnInit();
      fixture.detectChanges();
      await fixture.whenStable();

      const allSelect = await loader.getAllHarnesses(MatSelectHarness);
      const filterSelect = allSelect[0];

      const availableFilters = searchServiceSpy.getAvailableFilters();
      await filterSelect.open();
      const options = await filterSelect.getOptions();

      expect(options.length).toEqual(availableFilters.length);
      for (let i = 0; i < options.length; i++) {
        expect(await options[i].getText()).toEqual(availableFilters[i].label);
      }
    });

    it("should emit event when changed filtering value", async () => {
      spyOn(component.changed, "emit");
      const allSelect = await loader.getAllHarnesses(MatSelectHarness);
      const filterSelect = allSelect[0];
      await filterSelect.open();
      const options = await filterSelect.getOptions();
      await options[0].click();
      expect(component.changed.emit).toHaveBeenCalled();
    });
  });

  describe("compareOptions", () => {
    it("should be default disabled when no filter is selected", async () => {
      const allSelect = await loader.getAllHarnesses(MatSelectHarness);
      const compareOptionSelect = allSelect[1];
      expect(await compareOptionSelect.isDisabled()).toBeTruthy();
    });

    it("should be enabled when filter is selected", async () => {
      const filter = new TestSelectFilter();
      component.filter = filter;
      component.ngOnInit();
      fixture.detectChanges();
      await fixture.whenStable();

      const allSelect = await loader.getAllHarnesses(MatSelectHarness);
      const compareOptionSelect = allSelect[1];
      expect(await compareOptionSelect.isDisabled()).toBeFalsy();
    });

    it("should list selectable options", async () => {
      const filter = new TestSelectFilter();
      component.filter = filter;
      component.ngOnInit();
      fixture.detectChanges();
      await fixture.whenStable();

      const allSelect = await loader.getAllHarnesses(MatSelectHarness);
      const compareOptionSelect = allSelect[1];
      await compareOptionSelect.open();
      const compareOptions = await compareOptionSelect.getOptions();

      expect(compareOptions.length).toEqual(
        filter.selectableCompareOptions.length,
      );
      for (let i = 0; i < compareOptions.length; i++) {
        expect(await compareOptions[i].getText()).toEqual(
          filter.selectableCompareOptions[i].label,
        );
      }
    });
  });

  describe("content input", () => {
    it("should be empty when no filter is selected", () => {
      expect(
        fixture.nativeElement.querySelector("app-select-content-input"),
      ).toBeNull();
      expect(
        fixture.nativeElement.querySelector("app-text-content-input"),
      ).toBeNull();
    });

    it("should be select content input when filter is select type", async () => {
      const filter = new TestSelectFilter();
      component.filter = filter;
      component.ngOnInit();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(
        fixture.nativeElement.querySelector("app-select-content-input"),
      ).not.toBeNull();
      expect(
        fixture.nativeElement.querySelector("app-text-content-input"),
      ).toBeNull();
    });

    it("should be text content input when filter is text type", async () => {
      const filter = new TestTextFilter();
      component.filter = filter;
      component.ngOnInit();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(
        fixture.nativeElement.querySelector("app-select-content-input"),
      ).toBeNull();
      expect(
        fixture.nativeElement.querySelector("app-text-content-input"),
      ).not.toBeNull();
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
