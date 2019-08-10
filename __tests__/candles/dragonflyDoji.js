const { readFileSync } = require("fs");

const { isDragonflyDoji: pattern } = require("../../build/candles");

describe("Dragonfly Doji", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/dragonflyDoji.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candle = [
      {
        open: 40,
        high: 40,
        low: 10,
        close: 40
      }
    ];
    expect(pattern(candle)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candle = [
      {
        open: 40,
        high: 40,
        low: 10,
        close: 35
      }
    ];
    expect(pattern(candle)).toBe(false);
  });
});
