import { Candle, body } from "../candle";
import { Trend } from "../trend";
import { simpleMovingAverage } from "../indicators";
export namespace ShortDay {
  /**
   * Tests whether the given candle matches the pattern: Short Day
   *
   * ![sample](../media/candles/shortDay.png)
   *
   * ### Rules
   *
   * 1. Body of candle is considerably smaller than previous bodies.
   * 1. Use previous 5 to 10 candles as context to determine what "considerably" means.
   *
   * ### Remarks
   * - Source: p.13
   * - Opposite Pattern: Long Day (see [[isLongDay]])
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
    const reference = sma(body(candles[offset - 1])) || Number.MIN_VALUE;
    const candle = candles[offset];
    return body(candle) * options.ratio <= reference;
  }

  export interface Options {
    /**
     * The number of candles to look at. These are used as reference points to determine the meaning of "short".
     */
    noOfCandles: number;
    /**
     * The ratio between the short body and the reference body. E.g. a ratio of 2 means that the reference body needs to be at least twice as large as the short body.
     */
    ratio: number;
  }

  export const defaults: Options = { noOfCandles: 5, ratio: 2 };
}
