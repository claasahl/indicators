const { readFileSync } = require("fs");

const { isEngulfing: pattern } = require("../../build/candles/engulfing");

describe("Engulfing", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/engulfing_down.json"
    ).toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles, trend)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync(
      "./assets/candles/engulfing_up.json"
    ).toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles, trend)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 40,
        high: 80,
        low: 30,
        close: 60
      },
      {
        open: 65,
        high: 90,
        low: 30,
        close: 35
      }
    ];
    expect(pattern(candles, "up")).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 40,
        high: 80,
        low: 30,
        close: 60
      },
      {
        open: 65,
        high: 90,
        low: 30,
        close: 35
      }
    ];
    expect(pattern(candles, "down")).toBe(false);
  });
});
