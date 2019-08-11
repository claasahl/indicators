import { Candle, bullish, bearish } from "../candle";
import { Trend } from "../trend";
import { Marabozu } from "./marabozu";

export namespace Kicking {
  /**
   * Tests whether the given candle matches the pattern: Kicking
   *
   * ![sample](../media/candles/kicking_down.png)
   *
   * ![sample](../media/candles/kicking_up.png)
   *
   * ### Rules
   *
   * 1. A Marabozu of one color os followed by a Marabozu og the opposite color.
   * 1. A gap must occur between the two lines.
   *
   * ### Remarks
   * - Source: p.83
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param options configurable options for this pattern
   */
  export function test(
    candles: Candle[],
    trend: Trend = "up",
    offset: number = 0,
    options: Options = defaults
  ): boolean {
    const first = candles[offset];
    const second = candles[offset + 1];
    if (candles.length <= offset + 1) {
      return false;
    }
    if (!Marabozu.test(candles, trend, offset, options.marabozu)) {
      return false;
    }
    if (!Marabozu.test(candles, trend, offset + 1, options.marabozu)) {
      return false;
    }
    if (bullish(first) && bearish(second)) {
      return Math.abs(first.low - second.high) >= options.gap;
    } else if (bearish(first) && bullish(second)) {
      return Math.abs(second.low - first.high) >= options.gap;
    }
    return false;
  }

  export interface Options {
    marabozu: Marabozu.Options;
    /**
     * minimum required gap between the candles
     */
    gap: number;
  }
  export const defaults: Options = { marabozu: Marabozu.defaults, gap: 1 };
}
