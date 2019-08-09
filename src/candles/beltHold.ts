import { Candle, hair, body, tail } from "../candle";
import { Trend, down, up } from "../trend";

/**
 * @param candle candle to be tested against this pattern
 * @param trend trend in which candle occured
 * @param ratio ratio between body and tail (default: 2)
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
