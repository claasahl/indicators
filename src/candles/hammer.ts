import { Candle, hair, tail, body } from "../candle";
import { Trend, down } from "../trend";
export namespace Hammer {
  /**
   * Tests whether the given candle matches the pattern: Hammer
   *
   * ![sample](../media/candles/hammer.png)
   *
   * ### Rules
   *
   * 1. The small real body is at the upper end of the trading range.
   * 1. The color of the body is not important.
   * 1. The long lower shadow should be be much longer than the length of the real body, usually two or three times.
   * 1. There should be no upper shadow, or if there is, it should be very small.
   *
   * ### Remarks
   * - Source: p.27
   * - Opposite Pattern: Hanging Man (see [[isHangingMan]])
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
    const { ratio } = options;
    const candle = candles[offset];
    if (candles.length <= offset) {
      return false;
    }
    if (!down(trend)) {
      return false;
    }
    if (hair(candle) >= body(candle)) {
      return false;
    }
    return tail(candle) > body(candle) * ratio;
  }

  export interface Options {
    /**
     * ratio between body and tail
     */
    ratio: number;
  }
  export const defaults: Options = {
    ratio: 2
  };
}
