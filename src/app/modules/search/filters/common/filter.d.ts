import CompareOption from "./compare-option";
import FilterFactory from "./filter-factory";

export default class Filter {
  public readonly type: string;
  public getFactory(): FilterFactory;

  public readonly selectableCompareOptions: CompareOption[];
  public compareOption: CompareOption | null;

  public value: unknown;
}
