import { Candle, hair, body, tail } from "../candle";
import { Trend, down, up } from "../trend";

/**
 * Tests whether the given candle matches the pattern: Belt Hold
 *
 * ![sample](../media/candles/beltHold.png)
 *
 * ### Rules
 *
 * 1. The Belt Hold line is identified by the lack of a shadow on one end.
 * 1. The bullish white Belt Hold opens on its low and has no lower shadows.
 * 1. The bearish black Belt Hold opens on its high and has no upper shadows.
 *
 * ### Remarks
 * - Source: p.32
 *
 * @param candle candle to be tested against this pattern
 * @param trend trend in which candle occured
 * @param ratio ratio between body and tail
 */
export function isBeltHold(
  candle: Candle,
  trend: Trend,
  ratio: number = 2
): boolean {
  const bearish =
    down(trend) &&
    candle.open === candle.low &&
    hair(candle) * ratio < body(candle);
  const bullish =
    up(trend) &&
    candle.open === candle.high &&
    tail(candle) * ratio < body(candle);
  return bearish || bullish;
}
