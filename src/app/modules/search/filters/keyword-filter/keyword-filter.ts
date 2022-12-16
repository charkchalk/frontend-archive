import CompareOption from "../common/compare-option";
import TextFilter from "../common/text-filter";

export default class KeywordFilter implements TextFilter {
  public static readonly key = "keyword";
  public static readonly label = "關鍵字";
  public getKey(): string {
    return KeywordFilter.key;
  }
  public getLabel(): string {
    return KeywordFilter.label;
  }

  public readonly type = "text";

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
