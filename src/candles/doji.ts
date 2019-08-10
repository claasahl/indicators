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
   * @param precision maximum allowed difference between open and close prices
   */
  export function test(
    candles: Candle[],
    _trend: Trend,
    offset: number = 0,
    precision: number = 0
  ) {
    const { open, close } = candles[offset];
    return Math.abs(open - close) <= precision;
  }
}
