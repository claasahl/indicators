const { readFileSync } = require("fs");

const { isHaramiCross: pattern } = require("../../build/candles/haramiCross");

describe("Harami Cross", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/haramiCross_down.json"
    ).toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles, trend)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync(
      "./assets/candles/haramiCross_up.json"
    ).toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles, trend)).toBe(true);
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
