import { TestBed } from "@angular/core/testing";

import TeacherProviderService from "../../../../providers/teacher/teacher.provider.service";
import { TestTeacherProviderService } from "../../../../providers/teacher/teacher.provider.service.spec";
import TeacherFilter from "./teacher-filter";
import TeacherFilterFactory from "./teacher-filter-factory";

describe("TeacherFilter", () => {
  let filter: TeacherFilter;
  let teacherProvider: TeacherProviderService;
  let teacherFilterFactory: TeacherFilterFactory;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        TeacherFilter,
        {
          provide: TeacherProviderService,
          useClass: TestTeacherProviderService,
        },
        {
          provide: TeacherFilterFactory,
          useValue: {},
        },
      ],
    });
    filter = TestBed.inject(TeacherFilter);
    teacherProvider = TestBed.inject(TeacherProviderService);
    teacherFilterFactory = TestBed.inject(TeacherFilterFactory);
  });

  it("should create an instance", () => {
    expect(filter).toBeTruthy();
  });

  describe("#getFactory()", () => {
    it("should return the factory", () => {
      const factory = filter.getFactory();
      expect(factory).toBe(teacherFilterFactory);
    });
  });

  describe("#getSuggestions()", () => {
    it("should return all teachers when empty query string is given", () => {
      const result = filter.getSuggestions("");
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(teacherProvider._sample.length);
    });

    it("should return teacher that contain the query string", () => {
      const result = filter.getSuggestions("こ");
      expect(result).toEqual([
        {
          key: "15",
          value: "さくらみこ",
        },

        {
          key: "19",
          value: "兎田ぺこら",
        },
      ]);
    });
  });
});
