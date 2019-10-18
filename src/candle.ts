export interface Candle {
  timestamp: number;
  period: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export function upper(candle: Candle): number {
  return Math.max(candle.open, candle.close);
}

export function lower(candle: Candle): number {
  return Math.min(candle.open, candle.close);
}

export function body(candle: Candle): number {
  return Math.abs(candle.open - candle.close);
}

export function range(candle: Candle): number {
  return candle.high - candle.low;
}

export function hair(candle: Candle): number {
  return candle.high - upper(candle);
}

export function tail(candle: Candle): number {
  return lower(candle) - candle.low;
}

export function bullish(candle: Candle): boolean {
  return candle.open < candle.close;
}

export function bearish(candle: Candle): boolean {
  return candle.open > candle.close;
}
