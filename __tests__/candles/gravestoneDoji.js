const { readFileSync } = require("fs");

const { isGravestoneDoji: pattern } = require("../../build/candles");

describe("Gravestone Doji", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/gravestoneDoji.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candle = [
      {
        open: 40,
        high: 80,
        low: 40,
        close: 40
      }
    ];
    expect(pattern(candle)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candle = [
      {
        open: 40,
        high: 80,
        low: 40,
        close: 35
      }
    ];
    expect(pattern(candle)).toBe(false);
  });
});
