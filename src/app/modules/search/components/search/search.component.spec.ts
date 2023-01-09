import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SearchService } from "../../search.service";
import { SearchHelperComponent } from "../search-helper/search-helper.component";
import { SearchHelperItemComponent } from "../search-helper-item/search-helper-item.component";
import { SearchTextComponent } from "../search-text/search-text.component";
import { SearchComponent } from "./search.component";

describe("SearchComponent", () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        SearchTextComponent,
        SearchHelperComponent,
        SearchHelperItemComponent,
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

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
