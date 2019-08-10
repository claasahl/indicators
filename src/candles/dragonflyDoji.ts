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
   * @param options configurable options for this pattern
   */
  export function test(
    candles: Candle[],
    trend: Trend,
    offset: number = 0,
    options: Options = defaults
  ) {
    const candle = candles[offset];
    const doji = Doji.test(candles, trend, offset, options);
    return doji && upper(candle) === candle.high;
  }

  export type Options = Doji.Options;
  export const defaults: Options = Doji.defaults;
}
