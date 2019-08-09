const { readFileSync } = require("fs");

const { isDoji: pattern } = require("../../build/candles/doji");

describe("Doji", () => {
  test("valid JSON sample", () => {
    const content = readFileSync("./assets/candles/doji.json").toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles, trend)).toBe(true);
  });
  test("matching set of candles", () => {
    const candle = [
      {
        open: 40,
        high: 80,
        low: 30,
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
        low: 30,
        close: 35
      }
    ];
    expect(pattern(candle)).toBe(false);
  });
});
