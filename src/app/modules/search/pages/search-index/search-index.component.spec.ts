import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import { SearchComponent } from "../../components/search/search.component";
import { SearchHelperComponent } from "../../components/search-helper/search-helper.component";
import { SearchHelperItemComponent } from "../../components/search-helper-item/search-helper-item.component";
import { SearchTextComponent } from "../../components/search-text/search-text.component";
import { SearchIndexComponent } from "./search-index.component";

describe("SearchIndexComponent", () => {
  let component: SearchIndexComponent;
  let fixture: ComponentFixture<SearchIndexComponent>;
  const queryParamMap = {
    get: (): unknown => null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchIndexComponent,
        SearchComponent,
        SearchTextComponent,
        SearchHelperComponent,
        SearchHelperItemComponent,
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatIconModule,
        MatSelectModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(queryParamMap),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
