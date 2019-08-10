const { readFileSync } = require("fs");

const { isDojiStar: pattern } = require("../../build/candles");

describe("Doji Star", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/dojiStar_down.json"
    ).toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles, trend)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync(
      "./assets/candles/dojiStar_up.json"
    ).toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles, trend)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 70,
        high: 80,
        low: 10,
        close: 20
      },
      {
        open: 15,
        high: 25,
        low: 10,
        close: 15
      }
    ];
    expect(pattern(candles, "down")).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 70,
        high: 80,
        low: 10,
        close: 20
      },
      {
        open: 15,
        high: 25,
        low: 10,
        close: 15
      }
    ];
    expect(pattern(candles, "up")).toBe(false);
  });
});
