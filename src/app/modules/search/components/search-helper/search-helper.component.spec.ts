import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SearchService } from "../../search.service";
import { SelectContentInputComponent } from "../search-helper-item/content-input/select-content-input/select-content-input.component";
import { TestSelectFilter } from "../search-helper-item/content-input/select-content-input/select-content-input.component.spec";
import { TextContentInputComponent } from "../search-helper-item/content-input/text-content-input/text-content-input.component";
import { SearchHelperItemComponent } from "../search-helper-item/search-helper-item.component";
import { SearchHelperComponent } from "./search-helper.component";

describe("SearchHelperComponent", () => {
  let component: SearchHelperComponent;
  let fixture: ComponentFixture<SearchHelperComponent>;
  let searchServiceSpy: jasmine.SpyObj<SearchService>;

  beforeEach(async () => {
    const spy = new SearchService();
    await TestBed.configureTestingModule({
      declarations: [
        SearchHelperComponent,
        SearchHelperItemComponent,
        SelectContentInputComponent,
        TextContentInputComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatIconModule,
        MatSelectModule,
      ],
      providers: [{ provide: SearchService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHelperComponent);
    searchServiceSpy = TestBed.inject(
      SearchService,
    ) as jasmine.SpyObj<SearchService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a default empty filter", () => {
    const searchHelperItems = fixture.debugElement.queryAll(
      By.directive(SearchHelperItemComponent),
    );
    expect(searchHelperItems.length).toEqual(1);
  });

  it("should replace a filter when event emits from item", async () => {
    const firstItem: SearchHelperItemComponent = fixture.debugElement.query(
      By.directive(SearchHelperItemComponent),
    ).componentInstance;
    searchServiceSpy.getFilter = jasmine
      .createSpy()
      .and.returnValue(TestSelectFilter);
    firstItem.changed.emit(TestSelectFilter.key);

    fixture.detectChanges();
    await fixture.whenStable();

    const changedItem: SearchHelperItemComponent = fixture.debugElement.query(
      By.directive(SearchHelperItemComponent),
    ).componentInstance;
    expect(changedItem.filter?.getKey()).toBe(TestSelectFilter.key);
  });

  it("should remove a filter when event emits from item", () => {
    const firstItem: SearchHelperItemComponent = fixture.debugElement.query(
      By.directive(SearchHelperItemComponent),
    ).componentInstance;
    firstItem.removed.emit();

    fixture.detectChanges();

    const searchHelperItems = fixture.debugElement.queryAll(
      By.directive(SearchHelperItemComponent),
    );
    expect(searchHelperItems.length).toBe(0);
  });

  describe("add filter button", () => {
    it("should add a filter", () => {
      const addFilterButton = fixture.debugElement.nativeElement.querySelector(
        "app-search-helper-item + div > button",
      );
      addFilterButton.click();

      fixture.detectChanges();

      const searchHelperItems = fixture.debugElement.queryAll(
        By.directive(SearchHelperItemComponent),
      );
      expect(searchHelperItems.length).toBe(2);
    });
  });
});
