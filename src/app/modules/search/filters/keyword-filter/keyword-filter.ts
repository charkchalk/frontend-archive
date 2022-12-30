import { Injectable } from "@angular/core";

import CompareOption from "../common/compare-option";
import TextFilter from "../common/text-filter";
import KeywordFilterFactory from "./keyword-filter-factory";

@Injectable({
  providedIn: "root",
})
export default class KeywordFilter implements TextFilter {
  public constructor(private factory: KeywordFilterFactory) {}

  public readonly type = "text";

  public getFactory(): KeywordFilterFactory {
    return this.factory;
  }

  public readonly selectableCompareOptions: CompareOption[] = [
    {
      key: "equal",
      symbol: "==",
      label: "等於",
    },
    {
      key: "notEqual",
      symbol: "!=",
      label: "不等於",
    },
  ];

  public compareOption: CompareOption | null = null;

  public rules: RegExp[] = [];

  public getRule(): RegExp[] {
    return this.rules;
  }

  public validate(value: string): RegExp | null {
    const notPassed = this.rules.find(rule => rule.test(value));
    return notPassed ?? null;
  }

  public value: string[] = [];
}
