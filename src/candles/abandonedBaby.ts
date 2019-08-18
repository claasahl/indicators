import { Candle, bullish, bearish } from "../candle";
import { Trend, up, down } from "../trend";
import { LongDay } from "./longDay";
import { Doji } from "./doji";
export namespace AbandonedBaby {
  /**
   * Tests whether the given candle matches the pattern: Abandoned Baby
   *
   * ![sample](../media/candles/abandonedBaby_down.png)
   *
   * ![sample](../media/candles/abandonedBaby_up.png)
   *
   * ### Rules
   *
   * 1. The first day should reflect the prior trend.
   * 1. The second day is a Doji whose shadow gaps above or below the previous day's upper or lower shadow.
   * 1. The third day is the opposite color of the first day.
   * 1. The third day gaps in the opposite direction with no shadows overlapping.
   *
   * ### Remarks
   * - Source: p.103
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param options configurable options for this pattern
   * @param ratio ratio between body and tail
   */
  export function test(
    candles: Candle[],
    trend: Trend,
    offset: number = 0,
    options: Options = defaults
  ): boolean {
    const [first, second, third] = candles.slice(offset);
    if (candles.length <= offset + 2) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset, options.longDay)) {
      return false;
    }
    if (!Doji.test(candles, trend, offset + 1, options.doji)) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset + 2, options.longDay)) {
      return false;
    }
    if (up(trend) && bullish(first) && bearish(third)) {
      return first.high < second.low && third.high < second.low;
    } else if (down(trend) && bearish(first) && bullish(third)) {
      return first.low > second.high && third.low > second.high;
    }
    return false;
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
