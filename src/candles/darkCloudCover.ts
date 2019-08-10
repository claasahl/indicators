import { Candle, body, bearish, bullish } from "../candle";
import { Trend, up } from "../trend";
export namespace DarkCloudCover {
  /**
   * Tests whether the given candle matches the pattern: Dark Cloud Cover
   *
   * ![sample](../media/candles/darkCloudCover.png)
   *
   * ### Rules
   *
   * 1. The first day is a white black body, which is continuing the uptrend.
   * 1. The second day is a black body day with the open above the previous day's high.
   * 1. The second (black) day closes within but and below the midpoint of the the previous white body.
   *
   * ### Remarks
   * - Source: p.58
   * - Opposite Pattern: Piercing Line (see [[isPiercingLine]])
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   */
  export function test(
    candles: Candle[],
    trend: Trend = "up",
    offset: number = 0
  ): boolean {
    const first = candles[offset];
    const second = candles[offset + 1];
    return (
      up(trend) &&
      bullish(first) &&
      bearish(second) &&
      second.open > first.high &&
      second.close <= first.open + body(first) / 2 &&
      second.close >= first.open
    );
  }
}
