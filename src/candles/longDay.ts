import { Candle, body } from "../candle";
import { Trend } from "../trend";
import { simpleMovingAverage } from "../indicators";

export namespace LongDay {
  /**
   * Tests whether the given candle matches the pattern: Long Day
   *
   * ![sample](../media/candles/longDay.png)
   *
   * ### Rules
   *
   * 1. Body of candle is considerably larger than previous bodies.
   * 1. Use previous 5 to 10 candles as context to determine what "considerably" means.
   *
   * ### Remarks
   * - Source: p.12
   * - Opposite Pattern: Short Day (see [[isShortDay]])
   *
   * @param candles candles to be tested against this pattern
   * @param _trend trend in which candle occured
   * @param offset offset to earliest / first candle
   * @param options configurable options for this pattern
   */
  export function test(
    candles: Candle[],
    _trend: Trend = "down",
    offset: number = 0,
    options: Options = defaults
  ): boolean {
    if (candles.length <= offset) {
      return false;
    }
    if (
      offset - options.noOfCandles < 0 ||
      candles.length <= options.noOfCandles
    ) {
      return false;
    }
    const sma = simpleMovingAverage(options.noOfCandles);
    for (let index = options.noOfCandles; index > 1; index--) {
      sma(body(candles[offset - index]));
    }
    const reference = sma(body(candles[offset - 1])) || Number.MAX_VALUE;
    const candle = candles[offset];
    return body(candle) >= reference * options.ratio;
  }

  export interface Options {
    /**
     * The number of candles to look at. These are used as reference points to determine the meaning of "long".
     */
    noOfCandles: number;
    /**
     * The ratio between the long body and the reference body. E.g. a ratio of 2 means that the long body needs to be at least twice as large as the reference body.
     */
    ratio: number;
  }

  export const defaults: Options = { noOfCandles: 5, ratio: 2 };
}
