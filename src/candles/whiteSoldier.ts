import { Candle, bearish, bullish, body, hair } from "../candle";
import { Trend, down } from "../trend";
import { LongDay } from "./longDay";

export namespace WhiteSoldier {
  /**
   * Tests whether the given candle matches the pattern: White Soldier
   *
   * ![sample](../media/candles/whiteSoldier.png)
   *
   * ### Rules
   *
   * 1. The pattern starts with a long black say.
   * 1. The second day is a long white day.
   * 1. The second day opens at or above the previous day's close.
   * 1. The second day closes near the highs of the day, ending above the high of the previous day.
   *
   * ### Remarks
   * - Source: p.87
   * - Opposite Pattern: [[BlackCrow]]
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param options configurable options for this pattern
   */
  export function test(
    candles: Candle[],
    trend: Trend = "down",
    offset: number = 0,
    options: Options = defaults
  ): boolean {
    const first = candles[offset];
    const second = candles[offset + 1];
    if (candles.length <= offset + 1) {
      return false;
    }
    if (!down(trend) || !bearish(first) || !bullish(second)) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset, options.longDay)) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset + 1, options.longDay)) {
      return false;
    }
    return (
      second.open >= first.close &&
      second.close > first.high &&
      body(second) / hair(second) >= options.ratio
    );
  }

  export interface Options {
    longDay: LongDay.Options;
    /**
     * minimum allow ratio between body and lower shadow of second candle. E.g. a ratio of 3 means that the body needs to be at least three-times as long as the upper shadow.
     */
    ratio: number;
  }
  export const defaults: Options = { longDay: LongDay.defaults, ratio: 3 };
}
