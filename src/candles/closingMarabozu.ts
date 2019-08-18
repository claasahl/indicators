import { Candle, bullish, bearish } from "../candle";
import { Trend } from "../trend";
export namespace ClosingMarabozu {
  /**
   * Tests whether the given candle matches the pattern: Closing Marabozu
   *
   * ![sample](../media/candles/closingMarabozu.png)
   *
   * ### Rules
   *
   * 1. Virtually no shadow extending from the close price end of the body.
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
    const { high, low, close } = candle;
    if (candles.length <= offset) {
      return false;
    }
    if (bullish(candle)) {
      return Math.abs(high - close) <= precision;
    } else if (bearish(candle)) {
      return Math.abs(close - low) <= precision;
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
