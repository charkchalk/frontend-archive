import { Injectable } from "@angular/core";

import TeacherProviderService from "../../../../providers/teacher/teacher.provider.service";
import FilterFactory from "../common/filter-factory";
import TeacherFilter from "./teacher-filter";

@Injectable({
  providedIn: "root",
})
export default class TeacherFilterFactory implements FilterFactory {
  public readonly key = "teacher";
  public readonly label = "授課教師";

  public constructor(private teacherProvider: TeacherProviderService) {}

  public createFilter(): TeacherFilter {
    return new TeacherFilter(this.teacherProvider, this);
  }
}
