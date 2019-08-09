import { Candle, bullish, bearish, upper, lower } from "../candle";
import { Trend, up, down } from "../trend";

/**
 * Tests whether the given candle matches the pattern: Engulfing
 *
 * ![sample](../media/candles/engulfing_down.png)
 *
 * ![sample](../media/candles/engulfing_up.png)
 *
 * ### Rules
 *
 * 1. A definite trend must be underway.
 * 1. The second day's body must be completely engulfed by the prior day's body. This dies not mean, however, that either the top or bottom of the two bodies cannot be equal; it just means the both tops and both bottoms cannot be equal.
 * 1. The first day's color should reflect the trend; black for a downtrend and white for an uptrend.
 * 1. The second real body of the engulfing pattern should be the opposite color of the first real body.
 *
 * ### Remarks
 * - Source: p.35
 *
 * @param candles candles to be tested against this pattern
 * @param trend trend in which candle occured
 * @param offset offset to earliest / first candle
 */
export function isEngulfing(
  candles: Candle[],
  trend: Trend,
  offset: number = 0
) {
  const short = candles[offset];
  const long = candles[offset + 1];
  const bull = up(trend) && bullish(short) && bearish(long);
  const bear = down(trend) && bearish(short) && bullish(long);
  return (bull || bear) && engulfed(short, long);
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
