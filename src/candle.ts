export interface Candle {
  timestamp: number;
  period: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export function upper(candle: Pick<Candle, "open" | "close">): number {
  return Math.max(candle.open, candle.close);
}

export function lower(candle: Pick<Candle, "open" | "close">): number {
  return Math.min(candle.open, candle.close);
}

export function body(candle: Pick<Candle, "open" | "close">): number {
  return Math.abs(candle.open - candle.close);
}

export function range(candle: Pick<Candle, "high" | "low">): number {
  return candle.high - candle.low;
}

export function hair(candle: Pick<Candle, "open" | "close" | "high">): number {
  return candle.high - upper(candle);
}

export function tail(candle: Pick<Candle, "open" | "close" | "low">): number {
  return lower(candle) - candle.low;
}

export function bullish(candle: Pick<Candle, "open" | "close">): boolean {
  return candle.open < candle.close;
}

export function bearish(candle: Pick<Candle, "open" | "close">): boolean {
  return candle.open > candle.close;
}
