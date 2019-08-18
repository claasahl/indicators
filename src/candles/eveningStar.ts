import { Candle, bullish, bearish, lower } from "../candle";
import { Trend, up } from "../trend";
import { LongDay } from "./longDay";
export namespace EveningStar {
  /**
   * Tests whether the given candle matches the pattern: Evening Star
   *
   * ![sample](../media/candles/eveningStar.png)
   *
   * ### Rules
   *
   * 1. The first day is always the color that was established by the ensuing trend.
   * 1. The second day, the star, is always gapped from the body of the first and third day. Its color is not important.
   * 1. The third day is always the opposite color of the first day.
   * 1. The first day, and most likely the third day, are considered long days.
   *
   * ### Remarks
   * - Source: p.94
   * - Opposite Pattern: [[MorningStar]]
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param options configurable options for this pattern
   * @param ratio ratio between body and tail
   */
  export function test(
    candles: Candle[],
    trend: Trend = "up",
    offset: number = 0,
    options: Options = defaults
  ): boolean {
    const [first, second, third] = candles.slice(offset);
    if (candles.length <= offset + 2) {
      return false;
    }
    if (!up(trend) || !bullish(first) || !bearish(third)) {
      return false;
    }
    if (first.close >= lower(second) || third.open >= lower(second)) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset, options.longDay)) {
      return false;
    }
    return LongDay.test(candles, trend, offset + 2, options.longDay);
  }

  export interface Options {
    longDay: LongDay.Options;
  }
  export const defaults: Options = { longDay: LongDay.defaults };
}
