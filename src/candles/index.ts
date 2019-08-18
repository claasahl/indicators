import { Trend } from "../trend";
import { Candle } from "../candle";
import { AbandonedBaby } from "./abandonedBaby";
import { BeltHold } from "./beltHold";
import { BlackCrow } from "./blackCrow";
import { BlackMarabozu } from "./blackMarabozu";
import { ClosingMarabozu } from "./closingMarabozu";
import { DarkCloudCover } from "./darkCloudCover";
import { DescendingHawk } from "./descendingHawk";
import { Doji } from "./doji";
import { DojiStar } from "./dojiStar";
import { DragonflyDoji } from "./dragonflyDoji";
import { Engulfing } from "./engulfing";
import { EveningStar } from "./eveningStar";
import { EveningDojiStar } from "./eveningDojiStar";
import { GravestoneDoji } from "./gravestoneDoji";
import { Hammer } from "./hammer";
import { HangingMan } from "./hangingMan";
import { Harami } from "./harami";
import { HaramiCross } from "./haramiCross";
import { HomingPigeon } from "./homingPigeon";
import { InvertedHammer } from "./invertedHammer";
import { Kicking } from "./kicking";
import { LongDay } from "./longDay";
import { LongLeggedDoji } from "./longLeggedDoji";
import { Marabozu } from "./marabozu";
import { MatchingHigh } from "./matchingHigh";
import { MatchingLow } from "./matchingLow";
import { MeetingLines } from "./meetingLines";
import { MorningStar } from "./morningStar";
import { MorningDojiStar } from "./morningDojiStar";
import { OpeningMarabozu } from "./openingMarabozu";
import { PiercingLine } from "./piercingLine";
import { ShootingStar } from "./shootingStar";
import { ShortDay } from "./shortDay";
import { TriStar } from "./triStar";
import { WhiteMarabozu } from "./whiteMarabozu";
import { WhiteSoldier } from "./whiteSoldier";

export * from "./abandonedBaby";
export * from "./beltHold";
export * from "./blackCrow";
export * from "./blackMarabozu";
export * from "./closingMarabozu";
export * from "./darkCloudCover";
export * from "./descendingHawk";
export * from "./doji";
export * from "./dojiStar";
export * from "./dragonflyDoji";
export * from "./engulfing";
export * from "./eveningStar";
export * from "./eveningDojiStar";
export * from "./gravestoneDoji";
export * from "./hammer";
export * from "./hangingMan";
export * from "./harami";
export * from "./haramiCross";
export * from "./homingPigeon";
export * from "./invertedHammer";
export * from "./kicking";
export * from "./longDay";
export * from "./longLeggedDoji";
export * from "./marabozu";
export * from "./matchingHigh";
export * from "./matchingLow";
export * from "./meetingLines";
export * from "./morningStar";
export * from "./morningDojiStar";
export * from "./openingMarabozu";
export * from "./piercingLine";
export * from "./shootingStar";
export * from "./shortDay";
export * from "./triStar";
export * from "./whiteMarabozu";
export * from "./whiteSoldier";

export type Patterns = "";
export function test(
  candles: Candle[],
  trend: Trend,
  offset: number = 0
): string[] {
  const patterns: string[] = [];
  patterns.push(
    AbandonedBaby.test(candles, trend, offset) ? "abandonedBaby" : ""
  );
  patterns.push(BeltHold.test(candles, trend, offset) ? "beltHold" : "");
  patterns.push(BlackCrow.test(candles, trend, offset) ? "blackCrow" : "");
  patterns.push(
    BlackMarabozu.test(candles, trend, offset) ? "blackMarabozu" : ""
  );
  patterns.push(
    ClosingMarabozu.test(candles, trend, offset) ? "closingMarabozu" : ""
  );
  patterns.push(
    DarkCloudCover.test(candles, trend, offset) ? "darkCloudCover" : ""
  );
  patterns.push(
    DescendingHawk.test(candles, trend, offset) ? "descendingHawk" : ""
  );
  patterns.push(Doji.test(candles, trend, offset) ? "doji" : "");
  patterns.push(DojiStar.test(candles, trend, offset) ? "dojiStar" : "");
  patterns.push(
    DragonflyDoji.test(candles, trend, offset) ? "dragonflyDoji" : ""
  );
  patterns.push(Engulfing.test(candles, trend, offset) ? "engulfing" : "");
  patterns.push(EveningStar.test(candles, trend, offset) ? "eveningStar" : "");
  patterns.push(
    EveningDojiStar.test(candles, trend, offset) ? "eveningDojiStar" : ""
  );
  patterns.push(
    GravestoneDoji.test(candles, trend, offset) ? "gravestoneDoji" : ""
  );
  patterns.push(Hammer.test(candles, trend, offset) ? "hammer" : "");
  patterns.push(HangingMan.test(candles, trend, offset) ? "hangingMan" : "");
  patterns.push(Harami.test(candles, trend, offset) ? "harami" : "");
  patterns.push(HaramiCross.test(candles, trend, offset) ? "haramiCross" : "");
  patterns.push(
    HomingPigeon.test(candles, trend, offset) ? "homingPigeon" : ""
  );
  patterns.push(
    InvertedHammer.test(candles, trend, offset) ? "invertedHammer" : ""
  );
  patterns.push(Kicking.test(candles, trend, offset) ? "kicking" : "");
  patterns.push(LongDay.test(candles, trend, offset) ? "longDay" : "");
  patterns.push(
    LongLeggedDoji.test(candles, trend, offset) ? "longLeggedDoji" : ""
  );
  patterns.push(Marabozu.test(candles, trend, offset) ? "marabozu" : "");
  patterns.push(
    MatchingHigh.test(candles, trend, offset) ? "matchingHigh" : ""
  );
  patterns.push(MatchingLow.test(candles, trend, offset) ? "matchingLow" : "");
  patterns.push(
    MeetingLines.test(candles, trend, offset) ? "meetingLines" : ""
  );
  patterns.push(MorningStar.test(candles, trend, offset) ? "morningStar" : "");
  patterns.push(
    MorningDojiStar.test(candles, trend, offset) ? "morningDojiStar" : ""
  );
  patterns.push(
    OpeningMarabozu.test(candles, trend, offset) ? "openingMarabozu" : ""
  );
  patterns.push(
    PiercingLine.test(candles, trend, offset) ? "piercingLine" : ""
  );
  patterns.push(
    ShootingStar.test(candles, trend, offset) ? "shootingStar" : ""
  );
  patterns.push(ShortDay.test(candles, trend, offset) ? "shortDay" : "");
  patterns.push(TriStar.test(candles, trend, offset) ? "triStar" : "");
  patterns.push(
    WhiteMarabozu.test(candles, trend, offset) ? "whiteMarabozu" : ""
  );
  patterns.push(
    WhiteSoldier.test(candles, trend, offset) ? "whiteSoldier" : ""
  );
  return patterns.filter(value => value !== "");
}
