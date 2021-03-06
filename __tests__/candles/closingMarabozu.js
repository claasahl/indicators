const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").ClosingMarabozu;

describe("Closing Marabozu", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/closingMarabozu.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candle = [
      {
        open: 60,
        high: 70,
        low: 10,
        close: 10
      }
    ];
    expect(pattern(candle, "")).toBe(true);
  });
  test("no matching set of candles", () => {
    const candle = [
      {
        open: 30,
        high: 80,
        low: 30,
        close: 60
      }
    ];
    expect(pattern(candle)).toBe(false);
  });
});
