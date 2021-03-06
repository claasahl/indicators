import { Candle, hair, tail, body, bullish, lower } from "../candle";
import { Trend, up } from "../trend";
export namespace ShootingStar {
  /**
   * Tests whether the given candle matches the pattern: Shooting Star
   *
   * ![sample](../media/candles/shootingStar.png)
   *
   * ### Rules
   *
   * 1. Prices gap open after an uptrend.
   * 1. A small real body is formed near the lower part of the price range.
   * 1. The upper shadow is at least three times as long as the body.
   * 1. The lower shadow is virtually nonexistent.
   *
   * ### Remarks
   * - Source: p.49
   * - Opposite Pattern: [[InvertedHammer]]
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param options configurable options for this pattern
   */
  export function test(
    candles: Candle[],
    trend: Trend = "up",
    offset: number = 0,
    options: Options = defaults
  ): boolean {
    const long = candles[offset];
    const star = candles[offset + 1];
    if (candles.length <= offset + 1) {
      return false;
    }
    if (!bullish(long) || !up(trend)) {
      return false;
    }
    if (Math.abs(lower(star) - long.close) < options.gap) {
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
    ratio: 3,
    precision: 0
  };
}
