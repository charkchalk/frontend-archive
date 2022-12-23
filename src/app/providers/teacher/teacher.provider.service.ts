import { Injectable } from "@angular/core";

import Teacher from "./teacher";

@Injectable({
  providedIn: "root",
})
export default class TeacherProviderService {
  private _sample = [
    {
      id: 1,
      name: "ときのそら",
      description: "Tokino Sora",
      link: "https://hololive.hololivepro.com/talents/tokino-sora/",
    },
    {
      id: 2,
      name: "ロボ子さん",
      description: "Robocosan",
      link: "https://hololive.hololivepro.com/talents/roboco-san/",
    },
    {
      id: 3,
      name: "夜空メル",
      description: "Yozora Mel",
      link: "https://hololive.hololivepro.com/talents/yozora-mel/",
    },
    {
      id: 4,
      name: "アキ・ローゼンタール",
      description: "Aki Rosenthal",
      link: "https://hololive.hololivepro.com/talents/aki-rosenthal/",
    },
    {
      id: 5,
      name: "赤井はあと",
      description: "Akai Haato",
      link: "https://hololive.hololivepro.com/talents/akai-haato/",
    },
    {
      id: 6,
      name: "白上フブキ",
      description: "Shirakami Fubuki",
      link: "https://hololive.hololivepro.com/talents/shirakami-fubuki/",
    },
    {
      id: 7,
      name: "夏色まつり",
      description: "Natsuiro Matsuri",
      link: "https://hololive.hololivepro.com/talents/natsuiro-matsuri/",
    },
    {
      id: 8,
      name: "湊あくあ",
      description: "Minato Aqua",
      link: "https://hololive.hololivepro.com/talents/minato-aqua/",
    },
    {
      id: 9,
      name: "紫咲シオン",
      description: "Murasaki Shion",
      link: "https://hololive.hololivepro.com/talents/murasaki-shion/",
    },
    {
      id: 10,
      name: "百鬼あやめ",
      description: " Nakiri Ayame",
      link: "https://hololive.hololivepro.com/talents/nakiri-ayame/",
    },
    {
      id: 11,
      name: "癒月ちょこ",
      description: "Yuzuki Choco",
      link: "https://hololive.hololivepro.com/talents/yuzuki-choco/",
    },
    {
      id: 12,
      name: "大空スバル",
      description: "Oozora Subaru",
      link: "https://hololive.hololivepro.com/talents/oozora-subaru/",
    },
    {
      id: 13,
      name: "AZKi",
      description: "",
      link: "https://hololive.hololivepro.com/talents/azki/",
    },
    {
      id: 14,
      name: "大神ミオ",
      description: " Ookami Mio",
      link: "https://hololive.hololivepro.com/talents/ookami-mio/",
    },
    {
      id: 15,
      name: "さくらみこ",
      description: "Sakura Miko",
      link: "https://hololive.hololivepro.com/talents/sakuramiko/",
    },
    {
      id: 16,
      name: "猫又おかゆ",
      description: "Nekomata Okayu",
      link: "https://hololive.hololivepro.com/talents/nekomata-okayu/",
    },
    {
      id: 17,
      name: "戌神ころね",
      description: " Inugami Korone",
      link: "https://hololive.hololivepro.com/talents/inugami-korone/",
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
      id: 20,
      name: "不知火フレア",
      description: "Shiranui Flare",
      link: "https://hololive.hololivepro.com/talents/shiranui-flare/",
    },
    {
      id: 21,
      name: "白銀ノエル",
      description: "Shirogane Noel",
      link: "https://hololive.hololivepro.com/talents/shirogane-noel/",
    },
    {
      id: 22,
      name: "宝鐘マリン",
      description: "Houshou Marine",
      link: "https://hololive.hololivepro.com/talents/houshou-marine/",
    },
    {
      id: 23,
      name: "天音かなた",
      description: "Amane Kanata",
      link: "https://hololive.hololivepro.com/talents/amane-kanata/",
    },
    {
      id: 24,
      name: "角巻わため",
      description: "Tsunomaki Watame",
      link: "https://hololive.hololivepro.com/talents/tsunomaki-watame/",
    },
    {
      id: 25,
      name: "常闇トワ",
      description: "Tokoyami Towa",
      link: "https://hololive.hololivepro.com/talents/tokoyami-towa/",
    },
    {
      id: 26,
      name: "姫森ルーナ",
      description: "Himemori Luna",
      link: "https://hololive.hololivepro.com/talents/himemori-luna/",
    },
    {
      id: 27,
      name: "雪花ラミィ",
      description: "Yukihana Lamy",
      link: "https://hololive.hololivepro.com/talents/yukihana-lamy/",
    },
    {
      id: 28,
      name: "桃鈴ねね",
      description: "Momosuzu Nene",
      link: "https://hololive.hololivepro.com/talents/momosuzu-nene/",
    },
    {
      id: 29,
      name: "獅白ぼたん",
      description: "Shishiro Botan",
      link: "https://hololive.hololivepro.com/talents/shishiro-botan/",
    },
    {
      id: 30,
      name: "尾丸ポルカ",
      description: "Omaru Polka",
      link: "https://hololive.hololivepro.com/talents/omaru-polka/",
    },
    {
      id: 31,
      name: "ラプラス・ダークネス",
      description: "La+ Darknesss",
      link: "https://hololive.hololivepro.com/talents/la-darknesss/",
    },
    {
      id: 32,
      name: "鷹嶺ルイ",
      description: "Takane Lui",
      link: "https://hololive.hololivepro.com/talents/takane-lui/",
    },
    {
      id: 33,
      name: "博衣こより",
      description: "Hakui Koyori",
      link: "https://hololive.hololivepro.com/talents/hakui-koyori/",
    },
    {
      id: 34,
      name: "沙花叉クロヱ",
      description: "Sakamata Chloe",
      link: "https://hololive.hololivepro.com/talents/sakamata-chloe/",
    },
    {
      id: 35,
      name: "風真いろは",
      description: "Kazama Iroha",
      link: "https://hololive.hololivepro.com/talents/kazama-iroha/",
    },
    {
      id: 36,
      name: "アユンダ・リス",
      description: "Ayunda Risu",
      link: "https://hololive.hololivepro.com/talents/ayunda-risu/",
    },
    {
      id: 37,
      name: "ムーナ・ホシノヴァ",
      description: "Moona Hoshinova",
      link: "https://hololive.hololivepro.com/talents/moona-hoshinova/",
    },
    {
      id: 38,
      name: "アイラニ・イオフィフティーン",
      description: "Airani Iofifteen",
      link: "https://hololive.hololivepro.com/talents/airani-iofifteen/",
    },
    {
      id: 39,
      name: "クレイジー・オリー",
      description: "Kureiji Ollie",
      link: "https://hololive.hololivepro.com/talents/kureiji-ollie/",
    },
    {
      id: 40,
      name: "アーニャ・メルフィッサ",
      description: "Anya Melfissa",
      link: "https://hololive.hololivepro.com/talents/anya-melfissa/",
    },
    {
      id: 41,
      name: "パヴォリア・レイネ",
      description: "Pavolia Reine",
      link: "https://hololive.hololivepro.com/talents/pavolia-reine/",
    },
    {
      id: 42,
      name: "ベスティア・ゼータ",
      description: "Vestia Zeta",
      link: "https://hololive.hololivepro.com/talents/vestia-zeta/",
    },
    {
      id: 43,
      name: "カエラ・コヴァルスキア",
      description: "Kaela Kovalskia",
      link: "https://hololive.hololivepro.com/talents/kaela-kovalskia/",
    },
    {
      id: 44,
      name: "こぼ・かなえる",
      description: "Kobo Kanaeru",
      link: "https://hololive.hololivepro.com/talents/kobo-kanaeru/",
    },
    {
      id: 45,
      name: "森カリオペ",
      description: "Mori Calliope",
      link: "https://hololive.hololivepro.com/talents/mori-calliope/",
    },
    {
      id: 46,
      name: "小鳥遊キアラ",
      description: "Takanashi Kiara",
      link: "https://hololive.hololivepro.com/talents/takanashi-kiara/",
    },
    {
      id: 47,
      name: "一伊那尓栖",
      description: "Ninomae Ina'nis",
      link: "https://hololive.hololivepro.com/talents/ninomae-inanis/",
    },
    {
      id: 48,
      name: "がうる・ぐら",
      description: "Gawr Gura",
      link: "https://hololive.hololivepro.com/talents/gawr-gura/",
    },
    {
      id: 49,
      name: "ワトソン・アメリア",
      description: "Watson Amelia",
      link: "https://hololive.hololivepro.com/talents/watson-amelia/",
    },
    {
      id: 50,
      name: "IRyS",
      description: "IRyS",
      link: "https://hololive.hololivepro.com/talents/irys/",
    },
    {
      id: 51,
      name: "セレス・ファウナ",
      description: "Ceres Fauna",
      link: "https://hololive.hololivepro.com/talents/ceres-fauna/",
    },
    {
      id: 52,
      name: "オーロ・クロニー",
      description: "Ouro Kronii",
      link: "https://hololive.hololivepro.com/talents/ouro-kronii/",
    },
    {
      id: 53,
      name: "七詩ムメイ",
      description: "Nanashi Mumei",
      link: "https://hololive.hololivepro.com/talents/nanashi-mumei/",
    },
    {
      id: 54,
      name: "ハコス・ベールズ",
      description: "Hakos Baelz",
      link: "https://hololive.hololivepro.com/talents/hakos-baelz/",
    },
    {
      id: 55,
      name: "【卒業生】桐生ココ",
      description: "Kiryu Coco",
      link: "https://hololive.hololivepro.com/talents/kiryu-coco/",
    },
    {
      id: 56,
      name: "【卒業生】九十九佐命",
      description: "Tsukumo Sana",
      link: "https://hololive.hololivepro.com/talents/tsukumo-sana/",
    },
    {
      id: 57,
      name: "友人A（えーちゃん）",
      description: "Friend-A",
      link: "https://hololive.hololivepro.com/talents/friend-a/",
    },
    {
      id: 58,
      name: "春先のどか",
      description: "Harusaki Nodoka",
      link: "https://hololive.hololivepro.com/talents/harusaki-nodoka/",
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
