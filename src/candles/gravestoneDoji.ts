import { Candle, lower } from "../candle";
import { Trend } from "../trend";
import { Doji } from "./doji";
export namespace GravestoneDoji {
  /**
   * Tests whether the given candle matches the pattern: Gravestone Doji
   *
   * ![sample](../media/candles/gravestoneDoji.png)
   *
   * ### Rules
   *
   * 1. The candle is a Doji.
   * 1. The open and close prices are identical to the low price.
   *
   * ### Remarks
   * - Source: p.17
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
    return doji && lower(candle) === candle.low;
  }

  export type Options = Doji.Options;
  export const defaults: Options = Doji.defaults;
}
