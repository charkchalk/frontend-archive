import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TextContentInputComponent } from "./text-content-input.component";

describe("TextContentInputComponent", () => {
  let component: TextContentInputComponent;
  let fixture: ComponentFixture<TextContentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextContentInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextContentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
