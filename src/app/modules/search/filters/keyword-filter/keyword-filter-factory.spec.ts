import { TestBed } from "@angular/core/testing";

import KeywordFilter from "./keyword-filter";
import KeywordFilterFactory from "./keyword-filter-factory";

describe("KeywordFilterFactory", () => {
  let factory: KeywordFilterFactory;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [KeywordFilterFactory] });
    factory = TestBed.inject(KeywordFilterFactory);
  });

  it("should create an instance", () => {
    expect(factory).toBeTruthy();
  });

  describe("#createFilter()", () => {
    it("should return a KeywordFilter instance", () => {
      const filter = factory.createFilter();
      expect(filter).toBeInstanceOf(KeywordFilter);
    });
  });
});
