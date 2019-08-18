import { Candle, bullish, bearish, lower } from "../candle";
import { Trend, up } from "../trend";
import { LongDay } from "./longDay";
import { Doji } from "./doji";
export namespace EveningDojiStar {
  /**
   * Tests whether the given candle matches the pattern: Evening Doji Star
   *
   * ![sample](../media/candles/eveningDojiStar.png)
   *
   * ### Rules
   *
   * 1. The first day#s color should reüresent the trend of the market.
   * 1. The second day must be a Doji (a Doji that gaps)
   * 1. The third day is the opposite color of the first day.
   *
   * ### Remarks
   * - Source: p.99
   * - Opposite Pattern: [[MorningDojiStar]]
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
    if (!Doji.test(candles, trend, offset + 1, options.doji)) {
      return false;
    }
    return LongDay.test(candles, trend, offset + 2, options.longDay);
  }

  export interface Options {
    doji: Doji.Options;
    longDay: LongDay.Options;
  }
  export const defaults: Options = {
    doji: Doji.defaults,
    longDay: LongDay.defaults
  };
}
