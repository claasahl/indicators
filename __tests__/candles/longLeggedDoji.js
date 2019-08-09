const { readFileSync } = require("fs");

const {
  isLongLeggedDoji: pattern
} = require("../../build/candles/longLeggedDoji");

describe("Long-Legged Doji", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/longLeggedDoji.json"
    ).toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles, trend)).toBe(true);
  });
  test("matching set of candles", () => {
    const candle = [
      {
        open: 50,
        high: 90,
        low: 10,
        close: 50
      }
    ];
    expect(pattern(candle)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candle = [
      {
        open: 60,
        high: 90,
        low: 10,
        close: 60
      }
    ];
    expect(pattern(candle)).toBe(false);
  });
});
