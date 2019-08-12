import { Candle, bearish, bullish, lower, upper } from "../candle";
import { Trend, up, down } from "../trend";
import { Doji } from "./doji";
import { LongDay } from "./longDay";

export namespace DojiStar {
  /**
   * Tests whether the given candle matches the pattern: Doji Star
   *
   * ![sample](../media/candles/dojiStar_up.png)
   *
   * ![sample](../media/candles/dojiStar_down.png)
   *
   * ### Rules
   *
   * 1. The first day is a long day.
   * 1. The second day gaps in the direction of the previous trend.
   * 1. The second day is a Doji.
   * 1. The shadows on the Doji should not be excessively long, especially in the bullish case.
   *
   * ### Remarks
   * - Source: p.62
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param options configurable options for this pattern
   */
  export function test(
    candles: Candle[],
    trend: Trend,
    offset: number = 0,
    options: Options = defaults
  ): boolean {
    const long = candles[offset];
    const doji = candles[offset + 1];
    if (candles.length <= offset + 1) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset, options.longDay)) {
      return false;
    }
    if (!Doji.test(candles, trend, offset + 1, options.doji)) {
      return false;
    }
    if ((long.high - long.low) / (doji.high - doji.low) < options.ratio) {
      return false;
    }
    if (up(trend) && bullish(long)) {
      return Math.abs(lower(doji) - long.close) >= options.gap;
    } else if (down(trend) && bearish(long)) {
      return Math.abs(long.close - upper(doji)) >= options.gap;
    }
    return false;
  }

  export interface Options {
    doji: Doji.Options;
    longDay: LongDay.Options;
    /**
     *  Minimum gap between bodies of both candles
     */
    gap: number;
    /**
     * Ratio between range of first candle and range of second candle. E.g. a ratio of 2 means that the range of the first candle needs to be at least twice as long as the rage of the second candle.
     */
    ratio: number;
  }
  export const defaults: Options = {
    gap: 1,
    ratio: 2,
    doji: Doji.defaults,
    longDay: LongDay.defaults
  };
}
