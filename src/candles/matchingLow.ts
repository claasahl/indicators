import { Candle, bearish, tail } from "../candle";
import { Trend, down } from "../trend";
import { LongDay } from "./longDay";

export namespace MatchingLow {
  /**
   * Tests whether the given candle matches the pattern: Matching Low
   *
   * ![sample](../media/candles/matchingLow.png)
   *
   * ### Rules
   *
   * 1. A long black day occurs.
   * 1. The second day is also a black day with its close equal to the close of the first day.
   *
   * ### Remarks
   * - Source: p.76
   * - Opposite Pattern: [[MatchingHigh]]
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
    if (!down(trend) || !bearish(first) || !bearish(second)) {
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
      tail(first) <= options.precision &&
      tail(second) <= options.precision
    );
  }

  export interface Options {
    longDay: LongDay.Options;
    /**
     * maximum allowed difference between closing prices and maximum allow size of lower shadow
     */
    precision: number;
  }
  export const defaults: Options = { longDay: LongDay.defaults, precision: 0 };
}
