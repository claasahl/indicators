const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").TriStar;

describe("Tri Star", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/triStar_down.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync("./assets/candles/triStar_up.json").toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 60,
        high: 70,
        low: 50,
        close: 60
      },
      {
        open: 40,
        high: 45,
        low: 30,
        close: 40
      },
      {
        open: 50,
        high: 55,
        low: 45,
        close: 50
      }
    ];
    expect(pattern(candles, "down")).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 60,
        high: 70,
        low: 50,
        close: 60
      },
      {
        open: 40,
        high: 45,
        low: 30,
        close: 40
      },
      {
        open: 50,
        high: 55,
        low: 45,
        close: 50
      }
    ];
    expect(pattern(candles, "up")).toBe(false);
  });
});
