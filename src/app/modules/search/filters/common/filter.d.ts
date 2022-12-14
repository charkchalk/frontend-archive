import CompareOption from "./compare-option";

export default class Filter {
  public static readonly key: string;
  public static readonly label: string;
  public getKey(): string;
  public getLabel(): string;

  public readonly type: string;

  public readonly selectableCompareOptions: CompareOption[];
  public compareOption: CompareOption | null;

  public value: unknown;
}
