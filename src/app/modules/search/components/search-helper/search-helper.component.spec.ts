import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SearchService } from "../../search.service";
import { SelectContentInputComponent } from "../search-helper-item/content-input/select-content-input/select-content-input.component";
import { TextContentInputComponent } from "../search-helper-item/content-input/text-content-input/text-content-input.component";
import { SearchHelperItemComponent } from "../search-helper-item/search-helper-item.component";
import { SearchHelperComponent } from "./search-helper.component";

describe("SearchHelperComponent", () => {
  let component: SearchHelperComponent;
  let fixture: ComponentFixture<SearchHelperComponent>;

  beforeEach(async () => {
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
      providers: [{ provide: SearchService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
