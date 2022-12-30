import { TestBed } from "@angular/core/testing";

import Teacher from "./teacher";
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

export class TestTeacherProviderService {
  public _sample = [
    {
      id: 8,
      name: "湊あくあ",
      description: "Minato Aqua",
      link: "https://hololive.hololivepro.com/talents/minato-aqua/",
    },
    {
      id: 15,
      name: "さくらみこ",
      description: "Sakura Miko",
      link: "https://hololive.hololivepro.com/talents/sakuramiko/",
    },
    {
      id: 18,
      name: "星街すいせい",
      description: "Hoshimachi Suisei",
      link: "https://hololive.hololivepro.com/talents/hoshimachi-suisei/",
    },
    {
      id: 19,
      name: "兎田ぺこら",
      description: "Usada Pekora",
      link: "https://hololive.hololivepro.com/talents/usada-pekora/",
    },
    {
      id: 28,
      name: "桃鈴ねね",
      description: "Momosuzu Nene",
      link: "https://hololive.hololivepro.com/talents/momosuzu-nene/",
    },
  ];

  public getSuggestions(value: string): Teacher[] {
    const inputValue = value.trim().toLowerCase();

    if (inputValue === "") {
      return this._sample;
    }

    return this._sample.filter(teacher => {
      return teacher.name.toLowerCase().includes(inputValue);
    });
  }
}
