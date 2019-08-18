import { Candle, bearish } from "../candle";
import { Trend, down } from "../trend";
import { LongDay } from "./longDay";
import { ShortDay } from "./shortDay";

export namespace HomingPigeon {
  /**
   * Tests whether the given candle matches the pattern: Homing Pigeon
   *
   * ![sample](../media/candles/homingPigeon.png)
   *
   * ### Rules
   *
   * 1. A long black body occurs in a downtrend.
   * 1. A short black body is completely inside the previous day's body
   *
   * ### Remarks
   * - Source: p.70
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
    if (!ShortDay.test(candles, trend, offset + 1, options.shortDay)) {
      return false;
    }
    return second.open <= first.open && second.close >= first.close;
  }

  export interface Options {
    longDay: LongDay.Options;
    shortDay: ShortDay.Options;
  }
  export const defaults: Options = {
    longDay: LongDay.defaults,
    shortDay: ShortDay.defaults
  };
}
