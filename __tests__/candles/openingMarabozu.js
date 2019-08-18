const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").OpeningMarabozu;

describe("Opening Marabozu", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/openingMarabozu.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candle = [
      {
        open: 70,
        high: 70,
        low: 5,
        close: 5
      }
    ];
    expect(pattern(candle)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candle = [
      {
        open: 50,
        high: 70,
        low: 30,
        close: 70
      }
    ];
    expect(pattern(candle)).toBe(false);
  });
});
