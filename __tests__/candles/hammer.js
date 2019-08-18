const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").Hammer;

describe("Hammer", () => {
  test("valid JSON sample", () => {
    const content = readFileSync("./assets/candles/hammer.json").toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 70,
        high: 80,
        low: 5,
        close: 50
      }
    ];
    expect(pattern(candles)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 70,
        high: 80,
        low: 30,
        close: 50
      }
    ];
    expect(pattern(candles)).toBe(false);
  });
});
