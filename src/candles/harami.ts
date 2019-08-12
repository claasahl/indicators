import { Candle, bullish, bearish, upper, lower } from "../candle";
import { Trend, up, down } from "../trend";
import { LongDay } from "./longDay";
import { ShortDay } from "./shortDay";

export namespace Harami {
  /**
   * Tests whether the given candle matches the pattern: Harami
   *
   * ![sample](../media/candles/harami_down.png)
   *
   * ![sample](../media/candles/harami_up.png)
   *
   * ### Rules
   *
   * 1. A long day is precended by a reasonble trend.
   * 1. The color of the long day is not important, but it is best if it reflects the trend of the market.
   * 1. A short day follows the long day, with its body completely inside the body range of the long day. Just like the `Engulfing` day, the tops and bottoms of the bodies can be equal, but both tops and both bottoms cannot be equal.
   * 1. The short day should be the opposite color of the long day.
   *
   * ### Remarks
   * - Source: p.40
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
  ) {
    const long = candles[offset];
    const short = candles[offset + 1];
    if (candles.length <= offset + 1) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset, options.longDay)) {
      return false;
    }
    if (!ShortDay.test(candles, trend, offset + 1, options.shortDay)) {
      return false;
    }
    if (!engulfed(short, long)) {
      return false;
    }
    const bull = up(trend) && bullish(long) && bearish(short);
    const bear = down(trend) && bearish(long) && bullish(short);
    return bull || bear;
  }

  function engulfed(candleA: Candle, candleB: Candle): boolean {
    const upperA = upper(candleA);
    const lowerA = lower(candleA);
    const upperB = upper(candleB);
    const lowerB = lower(candleB);
    return (
      (upperA <= upperB && lowerA > lowerB) ||
      (upperA < upperB && lowerA >= lowerB)
    );
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
