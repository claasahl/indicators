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
   * @param precision maximum allowed difference between open and close prices
   * @param precision2 maximum allowed difference between hair and tail
   */
  export function test(
    candles: Candle[],
    trend: Trend,
    offset: number = 0,
    precision: number = 0,
    precision2: number = 0
  ) {
    const candle = candles[offset];
    const doji = Doji.test(candles, trend, offset, precision);
    return doji && Math.abs(hair(candle) - tail(candle)) <= precision2;
  }
}
