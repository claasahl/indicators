import { Candle, bullish, bearish } from "../candle";
import { Trend } from "../trend";

/**
 * Tests whether the given candle matches the pattern: Opening Marabozu
 *
 * ![sample](../media/candles/openingMarabozu.png)
 *
 * ### Rules
 *
 * 1. Virtually no shadow extending from the open price end of the body.
 *
 * ### Remarks
 * - Source: p.14
 *
 * @param candles candles to be tested against this pattern
 * @param _trend trend in which candle occured
 * @param offset offset to earliest / first candle
 * @param precision maximum allow size of upper/lower shadow
 */
export function isOpeningMarabozu(
  candles: Candle[],
  _trend: Trend,
  offset: number = 0,
  precision: number = 0
): boolean {
  const candle = candles[offset];
  const { open, high, low } = candle;
  if (bullish(candle)) {
    return Math.abs(open - low) <= precision;
  } else if (bearish(candle)) {
    return Math.abs(high - open) <= precision;
  }
  return false;
}
