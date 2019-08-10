import { Candle, upper } from "../candle";
import { Trend } from "../trend";
import { Doji } from "./doji";
export namespace DragonflyDoji {
  /**
   * Tests whether the given candle matches the pattern: Dragonfly Doji
   *
   * ![sample](../media/candles/dragonflyDoji.png)
   *
   * ### Rules
   *
   * 1. The candle is a Doji.
   * 1. The open and close prices are identical to the high price.
   *
   * ### Remarks
   * - Source: p.18
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param precision maximum allowed difference between open and close prices
   */
  export function test(
    candles: Candle[],
    trend: Trend,
    offset: number = 0,
    precision: number = 0
  ) {
    const candle = candles[offset];
    const doji = Doji.test(candles, trend, offset, precision);
    return doji && upper(candle) === candle.high;
  }
}
