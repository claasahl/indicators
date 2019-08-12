import { Candle, bearish, bullish } from "../candle";
import { Trend, up, down } from "../trend";
import { LongDay } from "./longDay";
export namespace MeetingLines {
  /**
   * Tests whether the given candle matches the pattern: Meeting Lines
   *
   * ![sample](../media/candles/meetingLines_up.png)
   *
   * ![sample](../media/candles/meetingLines_down.png)
   *
   * ### Rules
   *
   * 1. The lines have bodies that extend the current trend.
   * 1. The first body's color always reflects the trend: black for downtrend and white for uptrend.
   * 1. The second body is the opposite color.
   * 1. The close of each day is the same.
   * 1. Both days should be long days.
   *
   * ### Remarks
   * - Source: p.66
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
  ): boolean {
    const first = candles[offset];
    const second = candles[offset + 1];
    if (candles.length <= offset + 1) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset, options.longDay)) {
      return false;
    }
    if (!LongDay.test(candles, trend, offset + 1, options.longDay)) {
      return false;
    }
    if (up(trend) && bullish(first) && bearish(second)) {
      return Math.abs(first.close - second.close) <= options.precision;
    } else if (down(trend) && bearish(first) && bullish(second)) {
      return Math.abs(first.close - second.close) <= options.precision;
    }
    return false;
  }

  export interface Options {
    longDay: LongDay.Options;
    /**
     * The maximum distance between the closing prices.
     */
    precision: number;
  }

  export const defaults: Options = {
    precision: 0,
    longDay: LongDay.defaults
  };
}
