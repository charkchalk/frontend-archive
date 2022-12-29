import Filter from "./filter";

export default interface FilterFactory {
  key: string;
  label: string;

  createFilter(): Filter;
}
