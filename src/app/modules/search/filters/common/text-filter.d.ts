import Filter from "./filter";

export default abstract class TextFilter extends Filter {
  public abstract rules: RegExp[];

  public abstract getRule(): RegExp[];
  public abstract validate(value: string): RegExp | null;

  public abstract override value: string[];
}
