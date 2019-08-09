import { Candle, hair, tail, body } from "../candle";
import { Trend, up } from "../trend";

/**
 * @param candle candle to be tested against this pattern
 * @param trend trend in which candle occured (default: up)
 * @param ratio ratio between body and tail (default: 2)
 */
export function isHangingMan(
  candle: Candle,
  trend: Trend = "up",
  ratio: number = 2
): boolean {
  return (
    up(trend) &&
    tail(candle) > body(candle) * ratio &&
    hair(candle) < body(candle)
  );
}
