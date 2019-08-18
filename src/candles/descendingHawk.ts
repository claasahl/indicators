import { Candle, bullish } from "../candle";
import { Trend, up } from "../trend";
import { LongDay } from "./longDay";

export namespace DescendingHawk {
  /**
   * Tests whether the given candle matches the pattern: Descending Hawk
   *
   * ![sample](../media/candles/descendingHawk.png)
   *
   * ### Rules
   *
   * 1. A long white body develops in an uptrend.
   * 1. Both real bodies must be white.
   * 1. The second day's body is completely engulfed by the first day's body.
   * 1. Both days' bodies must be long
   *
   * ### Remarks
   * - Source: p.73
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
    if (!up(trend) || !bullish(first) || !bullish(second)) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset, options.longDay)) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset + 1, options.longDay)) {
      return false;
    }

    return second.open >= first.open && second.close <= first.close;
  }

  export interface Options {
    longDay: LongDay.Options;
  }
  export const defaults: Options = { longDay: LongDay.defaults };
}
