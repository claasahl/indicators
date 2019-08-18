import { Candle, upper, lower } from "../candle";
import { Trend } from "../trend";
export namespace Marabozu {
  /**
   * Tests whether the given candle matches the pattern: Marabozu
   *
   * ![sample](../media/candles/marabozu.png)
   *
   * ### Rules
   *
   * 1. Virtually no upper shadow.
   * 1. Virtually no lower lower shadow.
   *
   * ### Remarks
   * - Source: p.13
   *
   * @param candles candles to be tested against this pattern
   * @param _trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param options configurable options for this pattern
   */
  export function test(
    candles: Candle[],
    _trend: Trend = "down",
    offset: number = 0,
    options: Options = defaults
  ): boolean {
    const { precision } = options;
    const candle = candles[offset];
    const { high, low } = candle;
    if (candles.length <= offset) {
      return false;
    }
    if (high - upper(candle) > precision) {
      return false;
    }
    return lower(candle) - low <= precision;
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
