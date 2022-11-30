import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  public filtrables: Record<string, AnyFiltrable> = {
    teacher: {
      key: "teacher",
      displayValue: "授課教師",
      compareMethods: [
        {
          key: "includes",
          displayValue: "包含",
        },
        {
          key: "not-includes",
          displayValue: "不包含",
        },
      ],
      compareContent: {
        inputType: InputType.MultipleSelect,
        selectables: [
          { key: "時乃空", displayValue: "時乃空" },
          { key: "蘿蔔子", displayValue: "蘿蔔子" },
          { key: "星街彗星", displayValue: "星街彗星" },
          { key: "櫻巫女", displayValue: "櫻巫女" },
          { key: "AZKi", displayValue: "AZKi" },
          { key: "夜空梅露", displayValue: "夜空梅露" },
          { key: "白上吹雪", displayValue: "白上吹雪" },
          { key: "亞綺·羅森塔爾", displayValue: "亞綺·羅森塔爾" },
          { key: "夏色祭", displayValue: "夏色祭" },
          { key: "赤井心", displayValue: "赤井心" },
          { key: "湊阿庫婭", displayValue: "湊阿庫婭" },
          { key: "紫咲詩音", displayValue: "紫咲詩音" },
          { key: "百鬼綾目", displayValue: "百鬼綾目" },
          { key: "癒月巧可", displayValue: "癒月巧可" },
          { key: "大空昴", displayValue: "大空昴" },
          { key: "白上吹雪", displayValue: "白上吹雪" },
          { key: "大神澪", displayValue: "大神澪" },
          { key: "貓又小粥", displayValue: "貓又小粥" },
          { key: "戌神沁音", displayValue: "戌神沁音" },
          { key: "兔田佩克拉", displayValue: "兔田佩克拉" },
          { key: "潤羽露西婭", displayValue: "潤羽露西婭" },
          { key: "不知火芙蕾雅", displayValue: "不知火芙蕾雅" },
          { key: "白銀諾艾爾", displayValue: "白銀諾艾爾" },
          { key: "寶鐘瑪琳", displayValue: "寶鐘瑪琳" },
          { key: "天音彼方", displayValue: "天音彼方" },
          { key: "桐生可可", displayValue: "桐生可可" },
          { key: "角卷綿芽", displayValue: "角卷綿芽" },
          { key: "常闇永遠", displayValue: "常闇永遠" },
          { key: "姬森璐娜", displayValue: "姬森璐娜" },
          { key: "雪花菈米", displayValue: "雪花菈米" },
          { key: "桃鈴音音", displayValue: "桃鈴音音" },
          { key: "獅白牡丹", displayValue: "獅白牡丹" },
          { key: "尾丸波爾卡", displayValue: "尾丸波爾卡" },
          { key: "拉普拉斯·達克尼斯", displayValue: "拉普拉斯·達克尼斯" },
          { key: "鷹嶺琉衣", displayValue: "鷹嶺琉衣" },
          { key: "博衣小夜璃", displayValue: "博衣小夜璃" },
          { key: "沙花叉克蘿耶", displayValue: "沙花叉克蘿耶" },
          { key: "風真伊呂波", displayValue: "風真伊呂波" },
          { key: "友人A", displayValue: "友人A" },
          { key: "春先和花", displayValue: "春先和花" },
        ],
      },
    },
    time: {
      key: "time",
      displayValue: "上課時間",
      compareMethods: [
        {
          key: "includes",
          displayValue: "包含",
        },
        {
          key: "not-includes",
          displayValue: "不包含",
        },
      ],
      compareContent: {
        inputType: InputType.MultipleSelect,
        selectables: [
          { key: "1-1", displayValue: "1-1 週一 第一節" },
          { key: "1-2", displayValue: "1-2 週一 第二節" },
          { key: "1-3", displayValue: "1-3 週一 第三節" },
          { key: "1-4", displayValue: "1-4 週一 第四節" },
          { key: "1-5", displayValue: "1-5 週一 第五節" },
          { key: "1-6", displayValue: "1-6 週一 第六節" },
          { key: "1-7", displayValue: "1-7 週一 第七節" },
          { key: "1-8", displayValue: "1-8 週一 第八節" },
          { key: "1-9", displayValue: "1-9 週一 第九節" },
          { key: "1-10", displayValue: "1-10 週一 第十節" },
          { key: "1-11", displayValue: "1-11 週一 第十一節" },
          { key: "1-12", displayValue: "1-12 週一 第十二節" },
          { key: "1-13", displayValue: "1-13 週一 第十三節" },

          { key: "2-1", displayValue: "2-1 週二 第一節" },
          { key: "2-2", displayValue: "2-2 週二 第二節" },
          { key: "2-3", displayValue: "2-3 週二 第三節" },
          { key: "2-4", displayValue: "2-4 週二 第四節" },
          { key: "2-5", displayValue: "2-5 週二 第五節" },
          { key: "2-6", displayValue: "2-6 週二 第六節" },
          { key: "2-7", displayValue: "2-7 週二 第七節" },
          { key: "2-8", displayValue: "2-8 週二 第八節" },
          { key: "2-9", displayValue: "2-9 週二 第九節" },
          { key: "2-10", displayValue: "2-10 週二 第十節" },
          { key: "2-11", displayValue: "2-11 週二 第十一節" },
          { key: "2-12", displayValue: "2-12 週二 第十二節" },
          { key: "2-13", displayValue: "2-13 週二 第十三節" },

          { key: "3-1", displayValue: "3-1 週三 第一節" },
          { key: "3-2", displayValue: "3-2 週三 第二節" },
          { key: "3-3", displayValue: "3-3 週三 第三節" },
          { key: "3-4", displayValue: "3-4 週三 第四節" },
          { key: "3-5", displayValue: "3-5 週三 第五節" },
          { key: "3-6", displayValue: "3-6 週三 第六節" },
          { key: "3-7", displayValue: "3-7 週三 第七節" },
          { key: "3-8", displayValue: "3-8 週三 第八節" },
          { key: "3-9", displayValue: "3-9 週三 第九節" },
          { key: "3-10", displayValue: "3-10 週三 第十節" },
          { key: "3-11", displayValue: "3-11 週三 第十一節" },
          { key: "3-12", displayValue: "3-12 週三 第十二節" },
          { key: "3-13", displayValue: "3-13 週三 第十三節" },

          { key: "4-1", displayValue: "4-1 週四 第一節" },
          { key: "4-2", displayValue: "4-2 週四 第二節" },
          { key: "4-3", displayValue: "4-3 週四 第三節" },
          { key: "4-4", displayValue: "4-4 週四 第四節" },
          { key: "4-5", displayValue: "4-5 週四 第五節" },
          { key: "4-6", displayValue: "4-6 週四 第六節" },
          { key: "4-7", displayValue: "4-7 週四 第七節" },
          { key: "4-8", displayValue: "4-8 週四 第八節" },
          { key: "4-9", displayValue: "4-9 週四 第九節" },
          { key: "4-10", displayValue: "4-10 週四 第十節" },
          { key: "4-11", displayValue: "4-11 週四 第十一節" },
          { key: "4-12", displayValue: "4-12 週四 第十二節" },
          { key: "4-13", displayValue: "4-13 週四 第十三節" },

          { key: "5-1", displayValue: "5-1 週五 第一節" },
          { key: "5-2", displayValue: "5-2 週五 第二節" },
          { key: "5-3", displayValue: "5-3 週五 第三節" },
          { key: "5-4", displayValue: "5-4 週五 第四節" },
          { key: "5-5", displayValue: "5-5 週五 第五節" },
          { key: "5-6", displayValue: "5-6 週五 第六節" },
          { key: "5-7", displayValue: "5-7 週五 第七節" },
          { key: "5-8", displayValue: "5-8 週五 第八節" },
          { key: "5-9", displayValue: "5-9 週五 第九節" },
          { key: "5-10", displayValue: "5-10 週五 第十節" },
          { key: "5-11", displayValue: "5-11 週五 第十一節" },
          { key: "5-12", displayValue: "5-12 週五 第十二節" },
          { key: "5-13", displayValue: "5-13 週五 第十三節" },

          { key: "6-1", displayValue: "6-1 週六 第一節" },
          { key: "6-2", displayValue: "6-2 週六 第二節" },
          { key: "6-3", displayValue: "6-3 週六 第三節" },
          { key: "6-4", displayValue: "6-4 週六 第四節" },
          { key: "6-5", displayValue: "6-5 週六 第五節" },
          { key: "6-6", displayValue: "6-6 週六 第六節" },
          { key: "6-7", displayValue: "6-7 週六 第七節" },
          { key: "6-8", displayValue: "6-8 週六 第八節" },
          { key: "6-9", displayValue: "6-9 週六 第九節" },
          { key: "6-10", displayValue: "6-10 週六 第十節" },
          { key: "6-11", displayValue: "6-11 週六 第十一節" },
          { key: "6-12", displayValue: "6-12 週六 第十二節" },
          { key: "6-13", displayValue: "6-13 週六 第十三節" },

          { key: "7-1", displayValue: "7-1 週日 第一節" },
          { key: "7-2", displayValue: "7-2 週日 第二節" },
          { key: "7-3", displayValue: "7-3 週日 第三節" },
          { key: "7-4", displayValue: "7-4 週日 第四節" },
          { key: "7-5", displayValue: "7-5 週日 第五節" },
          { key: "7-6", displayValue: "7-6 週日 第六節" },
          { key: "7-7", displayValue: "7-7 週日 第七節" },
          { key: "7-8", displayValue: "7-8 週日 第八節" },
          { key: "7-9", displayValue: "7-9 週日 第九節" },
          { key: "7-10", displayValue: "7-10 週日 第十節" },
          { key: "7-11", displayValue: "7-11 週日 第十一節" },
          { key: "7-12", displayValue: "7-12 週日 第十二節" },
          { key: "7-13", displayValue: "7-13 週日 第十三節" },
        ],
      },
    },
    keyword: {
      key: "keyword",
      displayValue: "關鍵字",
      compareMethods: [
        {
          key: "includes",
          displayValue: "包含",
        },
        {
          key: "not-includes",
          displayValue: "不包含",
        },
      ],
      compareContent: {
        inputType: InputType.Text,
      },
    },
    type: {
      key: "type",
      displayValue: "修別",
      compareMethods: [
        {
          key: "equals",
          displayValue: "等於",
        },
        {
          key: "not-equals",
          displayValue: "不等於",
        },
      ],
      compareContent: {
        inputType: InputType.MultipleSelect,
        selectables: [
          { key: "required", displayValue: "必修" },
          { key: "required-optional", displayValue: "必選" },
          { key: "optional", displayValue: "選修" },
          { key: "general", displayValue: "通識" },
        ],
      },
    },
  };

  public filters: AnyFilter[] = [];

  public searchHelperEnabled = new BehaviorSubject(false);

  public enableSearchHelper(): void {
    this.searchHelperEnabled.next(true);
  }

  public disableSearchHelper(): void {
    this.searchHelperEnabled.next(false);
  }

  public toggleSearchHelper(): void {
    this.searchHelperEnabled.next(!this.searchHelperEnabled.value);
  }
}

export interface CompareMethod {
  key: string;
  displayValue: string;
}

export interface Filtrable<T extends InputType> {
  key: string;
  displayValue: string;
  compareMethods: CompareMethod[];
  compareContent: Comparable<T>;
}

export type AnyFiltrable = TextFiltrable | MultipleSelectFiltrable;

export interface TextFiltrable extends Filtrable<InputType.Text> {
  compareContent: ComparableText;
}

export interface MultipleSelectFiltrable
  extends Filtrable<InputType.MultipleSelect> {
  compareContent: ComparableMultipleSelect;
}

export enum InputType {
  Text = "text",
  MultipleSelect = "multiple-select",
}

export interface Comparable<T extends InputType> {
  inputType: T;
}

export type AnyComparable = ComparableText | ComparableMultipleSelect;

export type ComparableText = Comparable<InputType.Text>;

export interface ComparableMultipleSelect
  extends Comparable<InputType.MultipleSelect> {
  selectables: Selectable[];
}

export interface Selectable {
  key: string;
  displayValue: string;
}

export interface Filter<T extends InputType> {
  filtering: Filtrable<T> | null;
  compareMethod: CompareMethod | null;
  compareContent: unknown;
}

export type AnyFilter = TextFilter | MultipleSelectFilter;

export interface TextFilter extends Filter<InputType.Text> {
  filtering: TextFiltrable | null;
  compareContent: string | null;
}

export interface MultipleSelectFilter extends Filter<InputType.MultipleSelect> {
  filtering: MultipleSelectFiltrable | null;
  compareContent: Selectable[] | null;
}
