import Filter from "./filter";

export default abstract class SelectFilter<T> extends Filter {
  public abstract getSuggestions(value: string): T[];

  public abstract override value: T[];
}
