import { TestBed } from "@angular/core/testing";

import KeywordFilter from "./keyword-filter";
import KeywordFilterFactory from "./keyword-filter-factory";

describe("KeywordFilter", () => {
  let filter: KeywordFilter;
  let fakeFactory: KeywordFilterFactory;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        KeywordFilter,
        {
          provide: KeywordFilterFactory,
          useValue: {},
        },
      ],
    });
    filter = TestBed.inject(KeywordFilter);
    fakeFactory = TestBed.inject(KeywordFilterFactory);
  });

  it("should create an instance", () => {
    expect(filter).toBeTruthy();
  });

  describe("#getFactory()", () => {
    it("should return the factory", () => {
      const factory = filter.getFactory();
      expect(factory).toBe(fakeFactory);
    });
  });

  describe("#getRule()", () => {
    it("should return empty RegExp rules", () => {
      const rules = filter.getRule();
      expect(rules).toBeInstanceOf(Array);
      expect(rules.length).toBe(0);
    });
  });

  describe("#validate()", () => {
    it("should return true", () => {
      const result = filter.validate("");
      expect(result).toBe(null);
    });
  });
});
