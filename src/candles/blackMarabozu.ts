import { Candle, bearish } from "../candle";
import { Trend } from "../trend";
import { Marabozu } from "./marabozu";

export namespace BlackMarabozu {
  /**
   * Tests whether the given candle matches the pattern: Black Marabozu
   *
   * ![sample](../media/candles/blackMarabozu.png)
   *
   * ### Rules
   *
   * 1. Virtually no upper shadow.
   * 1. Virtually no lower lower shadow.
   * 1. Candle is bearish.
   *
   * ### Remarks
   * - Source: p.14
   * - Opposite Pattern: White Marabozu (see [[isWhiteMarabozu]])
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
    if (candles.length <= offset) {
      return false;
    }
    if (!bearish(candles[offset])) {
      return false;
    }
    return Marabozu.test(candles, trend, offset, options);
  }

  export type Options = Marabozu.Options;
  export const defaults: Options = Marabozu.defaults;
}
