const { readFileSync } = require("fs");

const { isBeltHold: pattern } = require("../../build/candles/beltHold");

describe("Belt Hold", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/beltHold_down.json"
    ).toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles[0], trend)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync(
      "./assets/candles/beltHold_up.json"
    ).toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles[0], trend)).toBe(true);
  });
  test("matching set of candles", () => {
    const candle = {
      open: 80,
      high: 80,
      low: 40,
      close: 50
    };
    expect(pattern(candle, "up")).toBe(true);
  });
  test("no matching set of candles", () => {
    const candle = {
      open: 80,
      high: 80,
      low: 40,
      close: 50
    };
    expect(pattern(candle, "down")).toBe(false);
  });
});
