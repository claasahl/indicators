import { Candle, bearish } from "../candle";
import { Trend } from "../trend";
import { isMarabozu } from "./marabozu";

/**
 * Tests whether the given candle matches the pattern: Black Marabozu
 *
 * ![sample](../media/candles/blackMarabozu.png)
 *
 * ### Rules
 *
 * 1. Virtually no upper shadow.
 * 1. Virtually no lower lower shadow.
 * 1. Candle is bearish.
 *
 * ### Remarks
 * - Source: p.14
 * - Opposite Pattern: White Marabozu (see [[isWhiteMarabozu]])
 *
 * @param candles candles to be tested against this pattern
 * @param trend trend in which candle occured
 * @param offset offset to earliest / first candle
 * @param precision maximum allow size of upper/lower shadow
 */
export function isBlackMarabozu(
  candles: Candle[],
  trend: Trend = "down",
  offset: number = 0,
  precision: number = 0
): boolean {
  return (
    isMarabozu(candles, trend, offset, precision) && bearish(candles[offset])
  );
}
