const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").HaramiCross;

describe("Harami Cross", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/haramiCross_down.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync(
      "./assets/candles/haramiCross_up.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 65,
        high: 90,
        low: 30,
        close: 35
      },
      {
        open: 40,
        high: 80,
        low: 30,
        close: 40
      }
    ];
    expect(pattern(candles, "down")).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 65,
        high: 90,
        low: 30,
        close: 35
      },
      {
        open: 40,
        high: 80,
        low: 30,
        close: 40
      }
    ];
    expect(pattern(candles, "up")).toBe(false);
  });
});
