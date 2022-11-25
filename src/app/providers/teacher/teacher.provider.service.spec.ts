import TeacherProviderService from "./teacher.provider.service";
import { TestBed } from "@angular/core/testing";

describe("TeacherProviderService", () => {
  let service: TeacherProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherProviderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
