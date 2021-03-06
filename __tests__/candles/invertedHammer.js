const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").InvertedHammer;

describe("Inverted Hammer", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/invertedHammer.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 80,
        high: 90,
        low: 10,
        close: 20
      },
      {
        open: 30,
        high: 60,
        low: 15,
        close: 15
      }
    ];
    expect(pattern(candles)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 80,
        high: 90,
        low: 10,
        close: 20
      },
      {
        open: 15,
        high: 60,
        low: 10,
        close: 30
      }
    ];
    expect(pattern(candles)).toBe(false);
  });
});
