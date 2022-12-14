import Displayable from "./displayable";
import Filter from "./filter";

export default abstract class SelectFilter extends Filter {
  public readonly type = "select";
  public abstract getSuggestions(value: string): Displayable[];

  public abstract override value: Displayable[];
}
