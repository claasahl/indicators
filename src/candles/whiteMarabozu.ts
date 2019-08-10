import { Candle, bullish } from "../candle";
import { Trend } from "../trend";
import { Marabozu } from "./marabozu";
export namespace WhiteMarabozu {
  /**
   * Tests whether the given candle matches the pattern: White Marabozu
   *
   * ![sample](../media/candles/whiteMarabozu.png)
   *
   * ### Rules
   *
   * 1. Virtually no upper shadow.
   * 1. Virtually no lower lower shadow.
   * 1. Candle is bullish.
   *
   * ### Remarks
   * - Source: p.14
   * - Opposite Pattern: Black Marabozu (see [[isBlackMarabozu]])
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param options configurable options for this pattern
   */
  export function test(
    candles: Candle[],
    trend: Trend = "down",
    offset: number = 0,
    options: Options = defaults
  ): boolean {
    return (
      Marabozu.test(candles, trend, offset, options) && bullish(candles[offset])
    );
  }

  export type Options = Marabozu.Options;
  export const defaults: Options = Marabozu.defaults;
}
