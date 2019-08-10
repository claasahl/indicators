import { Candle, bullish, bearish } from "../candle";
import { Trend } from "../trend";
export namespace OpeningMarabozu {
  /**
   * Tests whether the given candle matches the pattern: Opening Marabozu
   *
   * ![sample](../media/candles/openingMarabozu.png)
   *
   * ### Rules
   *
   * 1. Virtually no shadow extending from the open price end of the body.
   *
   * ### Remarks
   * - Source: p.14
   *
   * @param candles candles to be tested against this pattern
   * @param _trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param options configurable options for this pattern
   */
  export function test(
    candles: Candle[],
    _trend: Trend,
    offset: number = 0,
    options: Options = defaults
  ): boolean {
    const { precision } = options;
    const candle = candles[offset];
    const { open, high, low } = candle;
    if (bullish(candle)) {
      return Math.abs(open - low) <= precision;
    } else if (bearish(candle)) {
      return Math.abs(high - open) <= precision;
    }
    return false;
  }

  export interface Options {
    /**
     * maximum allow size of upper/lower shadow
     */
    precision: number;
  }
  export const defaults: Options = {
    precision: 0
  };
}
