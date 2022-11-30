import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from "@angular/material/legacy-autocomplete";
import { MatLegacyChipsModule as MatChipsModule } from "@angular/material/legacy-chips";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { SearchHelperComponent } from "./search-helper.component";
import { SearchHelperItemComponent } from "../search-helper-item/search-helper-item.component";
import { SearchService } from "../../search.service";

describe("SearchHelperComponent", () => {
  let component: SearchHelperComponent;
  let fixture: ComponentFixture<SearchHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchHelperComponent, SearchHelperItemComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatIconModule,
        MatSelectModule,
      ],
      providers: [{ provide: SearchService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a default empty filter", () => {
    const searchHelperItems = fixture.nativeElement.querySelectorAll(
      "app-search-helper-item",
    );
    expect(searchHelperItems.length).toEqual(1);
  });

  describe("add filter button", () => {
    it("should add a filter", () => {
      const addFilterButton = fixture.debugElement.nativeElement.querySelector(
        "app-search-helper-item + div > button",
      );
      addFilterButton.click();

      fixture.detectChanges();

      const searchHelperItems =
        fixture.debugElement.nativeElement.querySelectorAll(
          "app-search-helper-item",
        );
      expect(searchHelperItems.length).toBe(2);
    });
  });

  it("should remove a filter when event emits from item", () => {
    const firstItem = fixture.debugElement.query(
      By.css("app-search-helper-item"),
    ).componentInstance as SearchHelperItemComponent;
    firstItem.removed.emit();

    fixture.detectChanges();

    const searchHelperItems =
      fixture.debugElement.nativeElement.querySelectorAll(
        "app-search-helper-item",
      );
    expect(searchHelperItems.length).toBe(0);
  });
});
