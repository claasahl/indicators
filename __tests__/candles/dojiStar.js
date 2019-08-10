const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").DojiStar;

describe("Doji Star", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/dojiStar_down.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync(
      "./assets/candles/dojiStar_up.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 70,
        high: 80,
        low: 10,
        close: 20
      },
      {
        open: 15,
        high: 25,
        low: 10,
        close: 15
      }
    ];
    expect(pattern(candles, "down")).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 70,
        high: 80,
        low: 10,
        close: 20
      },
      {
        open: 15,
        high: 25,
        low: 10,
        close: 15
      }
    ];
    expect(pattern(candles, "up")).toBe(false);
  });
});
