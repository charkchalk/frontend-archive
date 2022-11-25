import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SearchService } from "../../search.service";
import { SearchHelperItemComponent } from "./search-helper-item.component";

describe("SearchHelperItemComponent", () => {
  let component: SearchHelperItemComponent;
  let fixture: ComponentFixture<SearchHelperItemComponent>;

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
      providers: [{ provide: SearchService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHelperItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("remove button", () => {
    it("should emit removed event when remove button clicked", () => {
      spyOn(component.removed, "emit");
      fixture.nativeElement.querySelector(":scope > div > button").click();
      expect(component.removed.emit).toHaveBeenCalled();
    });
  });
});
