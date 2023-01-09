import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SearchService } from "../../search.service";
import { SelectContentInputComponent } from "./content-input/select-content-input/select-content-input.component";
import { TextContentInputComponent } from "./content-input/text-content-input/text-content-input.component";
import { SearchHelperItemComponent } from "./search-helper-item.component";

describe("SearchHelperItemComponent", () => {
  let component: SearchHelperItemComponent;
  let fixture: ComponentFixture<SearchHelperItemComponent>;

  beforeEach(async () => {
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
      providers: [{ provide: SearchService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHelperItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
