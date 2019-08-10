import { Candle, bullish } from "../candle";
import { Trend } from "../trend";
import { isMarabozu } from "./marabozu";

/**
 * Tests whether the given candle matches the pattern: White Marabozu
 *
 * ![sample](../media/candles/whiteMarabozu.png)
 *
 * ### Rules
 *
 * 1. Virtually no upper shadow.
 * 1. Virtually no lower lower shadow.
 * 1. Candle is bullish.
 *
 * ### Remarks
 * - Source: p.14
 * - Opposite Pattern: Black Marabozu (see [[isBlackMarabozu]])
 *
 * @param candles candles to be tested against this pattern
 * @param trend trend in which candle occured
 * @param offset offset to earliest / first candle
 * @param precision maximum allow size of upper/lower shadow
 */
export function isWhiteMarabozu(
  candles: Candle[],
  trend: Trend = "down",
  offset: number = 0,
  precision: number = 0
): boolean {
  return (
    isMarabozu(candles, trend, offset, precision) && bullish(candles[offset])
  );
}
