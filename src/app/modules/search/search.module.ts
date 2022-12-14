import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";

import { SearchHelperComponent } from "./components/search-helper/search-helper.component";
import { SelectContentInputComponent } from "./components/search-helper-item/content-input/select-content-input/select-content-input.component";
import { TextContentInputComponent } from "./components/search-helper-item/content-input/text-content-input/text-content-input.component";
import { SearchHelperItemComponent } from "./components/search-helper-item/search-helper-item.component";
import { SearchRoutingModule } from "./search-routing.module";

@NgModule({
  declarations: [
    SearchIndexComponent,
    SearchComponent,
    SearchTextComponent,
    SearchHelperComponent,
    SearchHelperItemComponent,
    TextContentInputComponent,
    SelectContentInputComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
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
})
export class SearchModule {}
