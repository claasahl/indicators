import { Candle, bearish, tail, bullish, body } from "../candle";
import { Trend, up } from "../trend";
import { LongDay } from "./longDay";

export namespace BlackCrow {
  /**
   * Tests whether the given candle matches the pattern: Black Crow
   *
   * ![sample](../media/candles/blackCrow.png)
   *
   * ### Rules
   *
   * 1. The pattern starts with a long white say.
   * 1. The second day is a long black day.
   * 1. The second day opens at or below the previous day's close.
   * 1. The second day closes near the lows of the day, ending below the low of the previous day.
   *
   * ### Remarks
   * - Source: p.91
   * - Opposite Pattern: [[WhiteSoldier]]
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param options configurable options for this pattern
   */
  export function test(
    candles: Candle[],
    trend: Trend = "up",
    offset: number = 0,
    options: Options = defaults
  ): boolean {
    const first = candles[offset];
    const second = candles[offset + 1];
    if (candles.length <= offset + 1) {
      return false;
    }
    if (!up(trend) || !bullish(first) || !bearish(second)) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset, options.longDay)) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset + 1, options.longDay)) {
      return false;
    }
    return (
      second.open <= first.close &&
      second.close < first.low &&
      body(second) / tail(second) >= options.ratio
    );
  }

  export interface Options {
    longDay: LongDay.Options;
    /**
     * minimum allow ratio between body and lower shadow of second candle. E.g. a ratio of 3 means that the body needs to be at least three-times as long as the lower shadow.
     */
    ratio: number;
  }
  export const defaults: Options = { longDay: LongDay.defaults, ratio: 3 };
}
