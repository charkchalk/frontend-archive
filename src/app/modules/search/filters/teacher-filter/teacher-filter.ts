import { Injectable } from "@angular/core";

import TeacherProviderService from "../../../../providers/teacher/teacher.provider.service";
import CompareOption from "../common/compare-option";
import Displayable from "../common/displayable";
import SelectFilter from "../common/select-filter";
import TeacherFilterFactory from "./teacher-filter-factory";

@Injectable({
  providedIn: "root",
})
export default class TeacherFilter implements SelectFilter {
  public constructor(
    private teacherProvider: TeacherProviderService,
    private factory: TeacherFilterFactory,
  ) {}

  public readonly type = "select";

  public getFactory(): TeacherFilterFactory {
    return this.factory;
  }

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
