import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectContentInputComponent } from "./select-content-input.component";

describe("SelectContentInputComponent", () => {
  let component: SelectContentInputComponent;
  let fixture: ComponentFixture<SelectContentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectContentInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectContentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
