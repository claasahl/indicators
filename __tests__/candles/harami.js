const { readFileSync } = require("fs");

const { isHarami: pattern } = require("../../build/candles/harami");

describe("Harami", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/harami_down.json"
    ).toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles, trend)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync("./assets/candles/harami_up.json").toString();
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
        close: 60
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
        close: 60
      }
    ];
    expect(pattern(candles, "up")).toBe(false);
  });
});
