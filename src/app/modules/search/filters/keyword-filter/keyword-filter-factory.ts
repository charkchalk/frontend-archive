import { Injectable } from "@angular/core";

import FilterFactory from "../common/filter-factory";
import KeywordFilter from "./keyword-filter";

@Injectable({
  providedIn: "root",
})
export default class KeywordFilterFactory implements FilterFactory {
  public readonly key = "keyword";
  public readonly label = "關鍵字";

  public createFilter(): KeywordFilter {
    return new KeywordFilter(this);
  }

  public fromString(raw: string): KeywordFilter {
    return new KeywordFilter(this, raw);
  }
}
