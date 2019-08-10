import { Candle, upper, lower } from "../candle";
import { Trend } from "../trend";

/**
 * Tests whether the given candle matches the pattern: Marabozu
 *
 * ![sample](../media/candles/marabozu.png)
 *
 * ### Rules
 *
 * 1. Virtually no upper shadow.
 * 1. Virtually no lower lower shadow.
 *
 * ### Remarks
 * - Source: p.13
 *
 * @param candles candles to be tested against this pattern
 * @param _trend trend in which candle occured
 * @param offset offset to earliest / first candle
 * @param precision maximum allow size of upper/lower shadow
 */
export function isMarabozu(
  candles: Candle[],
  _trend: Trend = "down",
  offset: number = 0,
  precision: number = 0
): boolean {
  const candle = candles[offset];
  const { high, low } = candle;
  return high - upper(candle) <= precision && lower(candle) - low <= precision;
}
