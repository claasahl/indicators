import { Candle, hair, tail, body, bearish, upper } from "../candle";
import { Trend, down } from "../trend";
export namespace InvertedHammer {
  /**
   * Tests whether the given candle matches the pattern: Inverted Hammer
   *
   * ![sample](../media/candles/invertedHammer.png)
   *
   * ### Rules
   *
   * 1. A small real body is formed near the lower part of the price range.
   * 1. No gap down is required, as long as the pattern falls after a downtrend.
   * 1. The upper shadow is usually no more than two times as long as the body.
   * 1. The lower shadow is virtually nonexistent.
   *
   * ### Remarks
   * - Source: p.49
   * - Opposite Pattern: Shooting Star (see [[isShootingStar]])
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
    const long = candles[offset];
    const star = candles[offset + 1];
    if (candles.length <= offset + 1) {
      return false;
    }
    if (!down(trend)) {
      return false;
    }
    if (!bearish(long)) {
      return false;
    }
    if (Math.abs(long.close - upper(star)) < options.gap) {
      return false;
    }
    return (
      hair(star) / body(star) >= options.ratio &&
      tail(star) <= options.precision
    );
  }

  export interface Options {
    /**
     *  Minimum gap between bodies of both candles
     */
    gap: number;
    /**
     * Ratio between upper shadow and body of star. E.g. a ratio of 2 means that the shadow needs to be at least twice as long as the body.
     */
    ratio: number;
    /**
     * The star's maximum size of lower shadow
     */
    precision: number;
  }
  export const defaults: Options = {
    gap: 1,
    ratio: 2,
    precision: 0
  };
}
