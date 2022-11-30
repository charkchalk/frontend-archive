import {
  AnyFilter,
  AnyFiltrable,
  ComparableMultipleSelect,
  CompareMethod,
  InputType,
  MultipleSelectFilter,
  SearchService,
  Selectable,
  TextFilter,
} from "../../search.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { BehaviorSubject } from "rxjs";
import { FormControl } from "@angular/forms";
import { MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent } from "@angular/material/legacy-autocomplete";

@Component({
  selector: "app-search-helper-item",
  templateUrl: "./search-helper-item.component.html",
  styleUrls: ["./search-helper-item.component.scss"],
})
export class SearchHelperItemComponent implements OnInit {
  @Input() public filter: AnyFilter = {
    filtering: null,
    compareMethod: null,
    compareContent: null,
  };

  @Output() public removed: EventEmitter<string> = new EventEmitter();

  public constructor(protected searchService: SearchService) {}

  public ngOnInit(): void {
    this._initializeFiltering();
    this._initializeCompareMethod();
    this._initializeCompareContent();
  }

  // Part 1: Filtrable selection

  protected filtrableOptions = new BehaviorSubject<
    Record<string, AnyFiltrable>
  >({});
  protected filteringFormControl: FormControl<AnyFiltrable | null> =
    new FormControl();

  private _initializeFiltering(): void {
    this.filtrableOptions.next(this.searchService.filtrables);
    this.filteringFormControl = new FormControl(this.filter.filtering);
    this.filteringFormControl.valueChanges.subscribe(filtering =>
      this._onFilteringFormControlValueChange(filtering),
    );
  }

  private _onFilteringFormControlValueChange(
    filtering: AnyFiltrable | null,
  ): void {
    this.filter.filtering = filtering;
    this.filter.compareMethod = null;
    this.filter.compareContent = null;

    this._initializeCompareMethod();
    this._initializeCompareContent();
  }

  // Part 2: Compare Method

  /** Options of compare content that available for select */
  protected compareMethodOptions = new BehaviorSubject<Selectable[]>([]);
  protected compareMethodFormControl: FormControl<CompareMethod | null> =
    new FormControl();

  /**
   * Initialize pre-inputted text and related observers.
   */
  private _initializeCompareMethod(): void {
    const compareMethods = this.filter.filtering?.compareMethods ?? [];
    this.compareMethodOptions.next(compareMethods);
    this.compareMethodFormControl = new FormControl(this.filter.compareMethod);
    this.compareMethodFormControl.valueChanges.subscribe(compareMethod =>
      this._onCompareMethodFormControlValueChange(compareMethod),
    );

    if (this.filter.filtering) {
      this.compareMethodFormControl.enable();
    } else {
      this.compareMethodFormControl.disable();
    }
  }

  /**
   * Event handler for value change event of `compareMethodFormControl` FormControl .
   * @param compareMethod user selected compareMethod
   */
  private _onCompareMethodFormControlValueChange(
    compareMethod: CompareMethod | null,
  ): void {
    this.filter.compareMethod = compareMethod;
  }

  // Part 3: Compare Content

  protected isTextInput = new BehaviorSubject(false);

  private _initializeCompareContent(): void {
    this.isTextInput.next(
      this.filter.filtering?.compareContent.inputType === InputType.Text,
    );
    if (this.isTextInput.observed) return;
    this.isTextInput.subscribe(isTextInput =>
      this._onIsTextInputChange(isTextInput),
    );
  }

  private _onIsTextInputChange(isTextInput: boolean): void {
    if (isTextInput) {
      this._initializeCompareContentText();
    } else {
      this._initializeCompareContentSelect();
    }
  }

  // Part 3-1: Text-type Compare Content

  /** FormControl object for input of text-type compare content */
  protected compareContentTextFormControl: FormControl<string> =
    new FormControl("", { nonNullable: true });

  /**
   * Initialize pre-inputted text and related observers.
   */
  private _initializeCompareContentText(): void {
    this.compareContentTextFormControl.reset();
    this.compareContentTextFormControl = new FormControl(
      (this.filter as TextFilter).compareContent ?? "",
      { nonNullable: true },
    );
    this.compareContentTextFormControl.valueChanges.subscribe(value =>
      this._onCompareContentTextFormControlValueChange(value),
    );
  }

  /**
   * Event handler for value change event of `compareContentTextFormControl` FormControl .
   * @param value user inputted text
   */
  private _onCompareContentTextFormControlValueChange(value: string): void {
    this.filter.compareContent = value;
  }

  // Part 3-2: Select-type Compare Content

  /** Options of compare content that available for select */
  protected compareContentAvailableOptions = new BehaviorSubject<Selectable[]>(
    [],
  );
  /** User selected options */
  protected compareContentSelected = new BehaviorSubject<Selectable[]>([]);
  /** FormControl object for input of select-type compare content */
  protected compareContentSelectFormControl: FormControl<string> =
    new FormControl();

  /**
   * Initialize pre-selected options, update available options and related observers.
   */
  private _initializeCompareContentSelect(): void {
    const compareContent = this.filter.filtering?.compareContent;
    if (compareContent?.inputType !== InputType.MultipleSelect) return;
    this.compareContentAvailableOptions.next(compareContent.selectables);
    this.compareContentSelected.next(
      (this.filter as MultipleSelectFilter).compareContent ?? [],
    );
    this.compareContentSelectFormControl.valueChanges.subscribe(() =>
      this._onCompareContentSelectFormControlValueChange(),
    );
    this.compareContentSelected.subscribe(selected =>
      this._onCompareContentSelectedChange(selected),
    );
  }

  /**
   * Event handler for value change event of `compareContentSelectFormControl`.
   */
  private async _onCompareContentSelectFormControlValueChange(): Promise<void> {
    this._updateAvailableOptions();
  }

  /**
   * Update available options based on user inputted text.
   */
  private async _updateAvailableOptions(): Promise<void> {
    const userInputtedValue = this.compareContentSelectFormControl.value ?? "";
    const availableOptions =
      this._getAvailableCompareContentOptions(userInputtedValue);
    this.compareContentAvailableOptions.next(availableOptions);
  }

  /**
   * Event handler for variable `compareContentSelected` changed. Will update available options.
   */
  private _onCompareContentSelectedChange(selected: Selectable[]): void {
    this.filter.compareContent = selected;
    this._updateAvailableOptions();
  }

  /**
   * UI Event handler for adding user selected option into data, also clear user inputted text.
   * @param event autocomplete selected event
   */
  protected onSelectOption(event: MatAutocompleteSelectedEvent): void {
    const selected = this.compareContentSelected.value;
    selected.push(event.option.value);
    this.compareContentSelected.next(selected);
    this.compareContentSelectFormControl.setValue("");
  }

  /**
   * UI Event handler for removing selected option.
   * @param index item index in array
   */
  protected onRemoveSelect(index: number): void {
    const selected = this.compareContentSelected.value;
    selected.splice(index, 1);
    this.compareContentSelected.next(selected);
  }

  /**
   * Get available options by inputted text, also filter out selected options.
   * @param value user inputted text or any text to filter options
   * @returns available options
   */
  private _getAvailableCompareContentOptions(value: string): Selectable[] {
    const filterValue = value.toString().toLowerCase();

    const compareContent = this.filter.filtering
      ?.compareContent as ComparableMultipleSelect;
    const selected = this.compareContentSelected.value;

    return compareContent.selectables.filter(option => {
      const isMatch = option.displayValue.toLowerCase().includes(filterValue);
      const isAlreadySelected = selected.includes(option);

      return isMatch && !isAlreadySelected;
    });
  }
}
