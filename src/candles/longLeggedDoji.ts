import { Candle, hair, tail } from "../candle";
import { Trend } from "../trend";
import { Doji } from "./doji";
export namespace LongLeggedDoji {
  /**
   * Tests whether the given candle matches the pattern: Long-Legged Doji
   *
   * ![sample](../media/candles/longLeggedDoji.png)
   *
   * ### Rules
   *
   * 1. The candle is a Doji.
   * 1. The hair and tail are very long.
   *
   * ### Remarks
   * - Source: p.16
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
    const { precision } = options;
    const candle = candles[offset];
    if (candles.length <= offset) {
      return false;
    }
    if (!Doji.test(candles, trend, offset, options.doji)) {
      return false;
    }
    return Math.abs(hair(candle) - tail(candle)) <= precision;
  }

  export interface Options {
    doji: Doji.Options;
    /**
     * maximum allowed difference between hair and tail
     */
    precision: number;
  }
  export const defaults: Options = { precision: 0, doji: Doji.defaults };
}
