import { Candle, bullish, hair } from "../candle";
import { Trend, up } from "../trend";
import { LongDay } from "./longDay";

export namespace MatchingHigh {
  /**
   * Tests whether the given candle matches the pattern: Matching High
   *
   * ![sample](../media/candles/matchingHigh.png)
   *
   * ### Rules
   *
   * 1. The first day is long white day that occurs in an uptrend.
   * 1. The second day has the same closing price as the first day.
   * 1. Both days have little or no upper shadow.
   *
   * ### Remarks
   * - Source: p.79
   * - Opposite Pattern: [[MatchingLow]]
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
    if (!up(trend) || !bullish(first) || !bullish(second)) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset, options.longDay)) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset + 1, options.longDay)) {
      return false;
    }
    return (
      Math.abs(second.close - first.close) <= options.precision &&
      hair(first) <= options.precision &&
      hair(second) <= options.precision
    );
  }

  export interface Options {
    longDay: LongDay.Options;
    /**
     * maximum allowed difference between closing prices and maximum allow size of upper shadow
     */
    precision: number;
  }
  export const defaults: Options = { longDay: LongDay.defaults, precision: 0 };
}
