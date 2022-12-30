import { TestBed } from "@angular/core/testing";

import TeacherFilter from "./teacher-filter";
import TeacherFilterFactory from "./teacher-filter-factory";

describe("TeacherFilterFactory", () => {
  let factory: TeacherFilterFactory;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [TeacherFilterFactory] });
    factory = TestBed.inject(TeacherFilterFactory);
  });

  it("should create an instance", () => {
    expect(factory).toBeTruthy();
  });

  describe("#createFilter()", () => {
    it("should create a filter", () => {
      const filter = factory.createFilter();
      expect(filter).toBeInstanceOf(TeacherFilter);
    });
  });
});
