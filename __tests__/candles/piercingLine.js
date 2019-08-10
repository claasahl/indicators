const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").PiercingLine;

describe("Piercing Line", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/piercingLine.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 80,
        high: 85,
        low: 40,
        close: 45
      },
      {
        open: 35,
        high: 70,
        low: 30,
        close: 63
      }
    ];
    expect(pattern(candles)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 80,
        high: 85,
        low: 40,
        close: 45
      },
      {
        open: 35,
        high: 70,
        low: 30,
        close: 62
      }
    ];
    expect(pattern(candles)).toBe(false);
  });
});
