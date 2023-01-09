import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TextContentInputComponent } from "./text-content-input.component";

describe("TextContentInputComponent", () => {
  let component: TextContentInputComponent;
  let fixture: ComponentFixture<TextContentInputComponent>;

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
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
