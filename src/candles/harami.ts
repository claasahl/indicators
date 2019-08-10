import { Candle, bullish, bearish, upper, lower } from "../candle";
import { Trend, up, down } from "../trend";
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
   */
  export function test(candles: Candle[], trend: Trend, offset: number = 0) {
    const long = candles[offset];
    const short = candles[offset + 1];
    const bull = up(trend) && bullish(long) && bearish(short);
    const bear = down(trend) && bearish(long) && bullish(short);
    return (bull || bear) && engulfed(short, long);
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
}
