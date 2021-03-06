const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").Marabozu;

describe("Marabozu", () => {
  test("valid JSON sample", () => {
    const content = readFileSync("./assets/candles/marabozu.json").toString();
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
        open: 70,
        high: 70,
        low: 30,
        close: 50
      }
    ];
    expect(pattern(candle)).toBe(false);
  });
});
