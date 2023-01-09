import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

import { SearchService } from "../../search.service";

@Component({
  selector: "app-search-text",
  templateUrl: "./search-text.component.html",
  styleUrls: ["./search-text.component.scss"],
})
export class SearchTextComponent implements OnInit {
  protected formControl = new FormControl<string>("");

  public constructor(protected searchService: SearchService) {}

  public ngOnInit(): void {
    this.searchService.searchHelperEnabled.subscribe(searchHelperEnabled => {
      if (searchHelperEnabled) {
        this.formControl.disable();
      } else {
        this.formControl.enable();
      }
    });
    this.formControl.addValidators((control: AbstractControl<string>) =>
      this.isParsable(control),
    );
  }

  protected isParsable(
    control: AbstractControl<string>,
  ): ValidationErrors | null {
    // const separator = /[!=]=/;
    // const factories: FilterFactory[] = this.searchService.getFilterFactories();
    const items = control.value.split(";");
    console.log(control.value, items);

    // for (const item of items) {
    //   if (!separator.test(item)) continue;

    //   const [key, value] = item.split(separator);
    //   const correspondingFilter = factories.find(filtrable => {
    //     return filtrable.key === key || filtrable.displayValue === key;
    //   });

    //   if (!correspondingFilter) {
    //     return { invalidKey: key };
    //   }

    //   if (
    //     correspondingFilter.compareContent.inputType ===
    //     InputType.MultipleSelect
    //   ) {
    //     const selectable = correspondingFilter.compareContent.selectables.find(
    //       selectable => {
    //         return (
    //           selectable.key === value || selectable.displayValue === value
    //         );
    //       },
    //     );

    //     if (!selectable) {
    //       return { invalidValue: { key, value } };
    //     }
    //   }
    // }

    return null;
  }

  protected toggleSearchHelper(): void {
    this.searchService.toggleSearchHelper();
  }
}
