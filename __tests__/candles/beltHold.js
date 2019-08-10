const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").BeltHold;

describe("Belt Hold", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/beltHold_down.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync(
      "./assets/candles/beltHold_up.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 80,
        high: 80,
        low: 40,
        close: 50
      }
    ];
    expect(pattern(candles, "up")).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 80,
        high: 80,
        low: 40,
        close: 50
      }
    ];
    expect(pattern(candles, "down")).toBe(false);
  });
});
