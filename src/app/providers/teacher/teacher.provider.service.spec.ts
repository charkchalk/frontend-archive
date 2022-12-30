import { TestBed } from "@angular/core/testing";

import TeacherProviderService from "./teacher.provider.service";

describe("TeacherProviderService", () => {
  let service: TeacherProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherProviderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("#getSuggestions()", () => {
    it("should return all teachers when empty query string is given", () => {
      const result = service.getSuggestions("");
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(service._sample.length);
    });

    it("should return teacher that contain the query string", () => {
      const result = service.getSuggestions(service._sample[0].name);
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
      expect(result[0]).toBe(service._sample[0]);
    });
  });
});
