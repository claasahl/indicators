import { Candle, body, bearish, bullish } from "../candle";
import { Trend, down } from "../trend";
export namespace PiercingLine {
  /**
   * Tests whether the given candle matches the pattern: Piercing Line
   *
   * ![sample](../media/candles/piercingLine.png)
   *
   * ### Rules
   *
   * 1. The first day is a long black body continuing the downtrend.
   * 1. The second day is a white body which opens below the low of the previous day.
   * 1. The second day closes within but above the midpoint of the the previous day's body.
   *
   * ### Remarks
   * - Source: p.55
   * - Opposite Pattern: Dark Cloud Cover (see [[isDarkCloudCover]])
   *
   * @param candles candles to be tested against this pattern
   * @param trend trend in which candle occured
   * @param offset offset to earliest / first candle
   */
  export function test(
    candles: Candle[],
    trend: Trend = "down",
    offset: number = 0
  ): boolean {
    const first = candles[offset];
    const second = candles[offset + 1];
    return (
      down(trend) &&
      bearish(first) &&
      bullish(second) &&
      second.open < first.low &&
      second.close >= first.close + body(first) / 2 &&
      second.close <= first.open
    );
  }
}
