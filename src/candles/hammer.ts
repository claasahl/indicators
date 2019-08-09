import { Candle, hair, tail, body } from "../candle";
import { Trend, down } from "../trend";

/**
 * @param candle candle to be tested against this pattern
 * @param trend trend in which candle occured (default: down)
 * @param ratio ratio between body and tail (default: 2)
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
