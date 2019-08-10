const { readFileSync } = require("fs");

const { isWhiteMarabozu: pattern } = require("../../build/candles");

describe("White Marabozu", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/whiteMarabozu.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candle = [
      {
        open: 5,
        high: 70,
        low: 5,
        close: 70
      }
    ];
    expect(pattern(candle)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candle = [
      {
        open: 70,
        high: 70,
        low: 10,
        close: 20
      }
    ];
    expect(pattern(candle)).toBe(false);
  });
});
