import { Candle, hair, tail, body } from "../candle";
import { Trend, down } from "../trend";

/**
 * Tests whether the given candle matches the pattern: Hammer
 *
 * ![sample](../media/candles/hammer.png)
 *
 * ### Rules
 *
 * 1. The small real body is at the upper end of the trading range.
 * 1. The color of the body is not important.
 * 1. The long lower shadow should be be much longer than the length of the real body, usually two or three times.
 * 1. There should be no upper shadow, or if there is, it should be very small.
 *
 * ### Remarks
 * - Source: p.27
 * - Opposite Pattern: Hanging Man (see [[isHangingMan]])
 *
 * @param candle candle to be tested against this pattern
 * @param trend trend in which candle occured
 * @param ratio ratio between body and tail
 */
export function isHammer(
  candle: Candle,
  trend: Trend = "down",
  ratio: number = 2
): boolean {
  return (
    down(trend) &&
    tail(candle) > body(candle) * ratio &&
    hair(candle) < body(candle)
  );
}
