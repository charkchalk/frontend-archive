import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
});
