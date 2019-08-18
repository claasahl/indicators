import { Candle } from "../candle";
import { Trend } from "../trend";
export namespace Doji {
  /**
   * Tests whether the given candle matches the pattern: Doji
   *
   * ![sample](../media/candles/doji.png)
   *
   * ### Rules
   *
   * 1. The open and close prices are identical.
   *
   * ### Remarks
   * - Source: p.15
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
  ) {
    const { precision } = options;
    const { open, close } = candles[offset];
    if (candles.length <= offset) {
      return false;
    }
    return Math.abs(open - close) <= precision;
  }

  export interface Options {
    /**
     * maximum allowed difference between open and close prices
     */
    precision: number;
  }
  export const defaults: Options = {
    precision: 0
  };
}
