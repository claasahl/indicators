import { Candle, hair, body, tail } from "../candle";
import { Trend, down, up } from "../trend";

export namespace BeltHold {
  /**
   * Tests whether the given candle matches the pattern: Belt Hold
   *
   * ![sample](../media/candles/beltHold_down.png)
   *
   * ![sample](../media/candles/beltHold_up.png)
   *
   * ### Rules
   *
   * 1. The Belt Hold line is identified by the lack of a shadow on one end.
   * 1. The bullish white Belt Hold opens on its low and has no lower shadows.
   * 1. The bearish black Belt Hold opens on its high and has no upper shadows.
   *
   * ### Remarks
   * - Source: p.32
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param ratio ratio between body and tail
   */
  export function test(
    candles: Candle[],
    trend: Trend,
    offset: number = 0,
    ratio: number = 2
  ): boolean {
    const candle = candles[offset];
    const bearish =
      down(trend) &&
      candle.open === candle.low &&
      hair(candle) * ratio < body(candle);
    const bullish =
      up(trend) &&
      candle.open === candle.high &&
      tail(candle) < body(candle) * ratio;
    return bearish || bullish;
  }
}
