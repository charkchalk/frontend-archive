import CompareOption from "./compare-option";

export default abstract class Filter {
  public static readonly key: string;

  public abstract readonly selectableCompareOptions: CompareOption[];
  public abstract compareOption: CompareOption | null;

  public abstract value: unknown;
}
