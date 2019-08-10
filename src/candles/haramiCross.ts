import { Candle, bullish, bearish, upper, lower } from "../candle";
import { Trend, up, down } from "../trend";
import { isDoji } from "./doji";

/**
 * Tests whether the given candle matches the pattern: Harami Cross
 *
 * ![sample](../media/candles/haramiCross_down.png)
 *
 * ![sample](../media/candles/haramiCross_up.png)
 *
 * ### Rules
 *
 * 1. A long day occurs within a trending market.
 * 1. The second day is a Doji (open and close are equal)
 * 1. The second-day Doji is within the range of the previous long day
 *
 * ### Remarks
 * - Source: p.45
 *
 * @param candles candles to be tested against this pattern
 * @param trend trend in which candle occured
 * @param offset offset to earliest / first candle
 * @param precision maximum allowed difference between open and close prices (Doji)
 */
export function isHaramiCross(
  candles: Candle[],
  trend: Trend,
  offset: number = 0,
  precision: number = 0
) {
  const long = candles[offset];
  const short = candles[offset + 1];
  const bull = up(trend) && bullish(long);
  const bear = down(trend) && bearish(long);
  const doji = isDoji(candles, trend, offset + 1, precision);
  return (bull || bear) && engulfed(short, long) && doji;
}

function engulfed(candleA: Candle, candleB: Candle): boolean {
  const upperA = upper(candleA);
  const lowerA = lower(candleA);
  const upperB = upper(candleB);
  const lowerB = lower(candleB);
  return (
    (upperA <= upperB && lowerA > lowerB) ||
    (upperA < upperB && lowerA >= lowerB)
  );
}
