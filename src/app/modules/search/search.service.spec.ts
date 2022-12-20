import { TestBed } from "@angular/core/testing";

import { SearchService } from "./search.service";

describe("SearchService", () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("#searchHelperEnabled", () => {
    it("should be observable and return a default false value", (done: DoneFn) => {
      service.searchHelperEnabled.subscribe(value => {
        expect(value).toBe(false);
        done();
      });
    });
  });

  describe("#disableSearchHelper()", () => {
    it("should set #searchHelperEnabled to false", (done: DoneFn) => {
      service.disableSearchHelper();
      service.searchHelperEnabled.subscribe(value => {
        expect(value).toBe(false);
        done();
      });
    });
  });

  describe("#enableSearchHelper()", () => {
    it("should set #searchHelperEnabled to true", (done: DoneFn) => {
      service.enableSearchHelper();
      service.searchHelperEnabled.subscribe(value => {
        expect(value).toBe(true);
        done();
      });
    });
  });

  describe("#toggleSearchHelper()", () => {
    it("should toggle #searchHelperEnabled from false to true", (done: DoneFn) => {
      service.disableSearchHelper();
      service.toggleSearchHelper();
      service.searchHelperEnabled.subscribe(value => {
        expect(value).toBe(true);
        done();
      });
    });

    it("should toggle #searchHelperEnabled from true to false", (done: DoneFn) => {
      service.enableSearchHelper();
      service.toggleSearchHelper();
      service.searchHelperEnabled.subscribe(value => {
        expect(value).toBe(false);
        done();
      });
    });
  });
});
