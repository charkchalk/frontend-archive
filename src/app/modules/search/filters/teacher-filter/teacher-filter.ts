import { Injectable } from "@angular/core";

import TeacherProviderService from "../../../../providers/teacher/teacher.provider.service";
import CompareOption from "../common/compare-option";
import Displayable from "../common/displayable";
import SelectFilter from "../common/select-filter";

@Injectable()
export default class TeacherFilter implements SelectFilter {
  public static readonly key = "teacher";
  public static readonly label = "授課教師";
  public getKey(): string {
    return TeacherFilter.key;
  }
  public getLabel(): string {
    return TeacherFilter.label;
  }

  private teacherProvider: TeacherProviderService;
  public constructor() {
    this.teacherProvider = new TeacherProviderService();
  }

  public readonly type = "select";

  public readonly selectableCompareOptions: CompareOption[] = [
    {
      key: "equal",
      symbol: "==",
      label: "等於",
    },
    {
      key: "notEqual",
      symbol: "!=",
      label: "不等於",
    },
  ];

  public compareOption: CompareOption | null = null;

  public getSuggestions(value: string): Displayable[] {
    const teachers = this.teacherProvider.getSuggestions(value);
    return teachers.map(teacher => ({
      key: teacher.id.toString(),
      value: teacher.name,
    }));
  }

  public value: Displayable[] = [];
}
