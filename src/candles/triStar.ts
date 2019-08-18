import { Candle, upper, lower } from "../candle";
import { Trend, up, down } from "../trend";
import { Doji } from "./doji";
export namespace TriStar {
  /**
   * Tests whether the given candle matches the pattern: Tri Star
   *
   * ![sample](../media/candles/triStar_down.png)
   *
   * ![sample](../media/candles/triStar_up.png)
   *
   * ### Rules
   *
   * 1. All three days are Doji
   * 1. The second day gaps above or below first abd third day.
   *
   * ### Remarks
   * - Source: p.107
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param options configurable options for this pattern
   * @param ratio ratio between body and tail
   */
  export function test(
    candles: Candle[],
    trend: Trend,
    offset: number = 0,
    options: Options = defaults
  ): boolean {
    const [first, second, third] = candles.slice(offset);
    if (candles.length <= offset + 2) {
      return false;
    }
    if (!Doji.test(candles, trend, offset, options)) {
      return false;
    }
    if (!Doji.test(candles, trend, offset + 1, options)) {
      return false;
    }
    if (!Doji.test(candles, trend, offset + 2, options)) {
      return false;
    }
    if (up(trend)) {
      return upper(first) < lower(second) && upper(third) < lower(second);
    } else if (down(trend)) {
      return lower(first) > upper(second) && lower(third) > upper(second);
    }
    return false;
  }

  export type Options = Doji.Options;
  export const defaults: Options = Doji.defaults;
}
