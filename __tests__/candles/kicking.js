const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").Kicking;

describe("Kicking", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/kicking_down.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync("./assets/candles/kicking_up.json").toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 50,
        high: 50,
        low: 10,
        close: 10
      },
      {
        open: 60,
        high: 80,
        low: 60,
        close: 80
      }
    ];
    expect(pattern(candles, "down")).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 50,
        high: 50,
        low: 10,
        close: 10
      },
      {
        open: 50,
        high: 80,
        low: 50,
        close: 80
      }
    ];
    expect(pattern(candles, "up")).toBe(false);
  });
});
