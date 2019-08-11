const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").Harami;

describe("Harami", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/harami_down.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync("./assets/candles/harami_up.json").toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
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
        close: 45
      }
    ];
    expect(pattern(candles, "down", 5)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
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
    expect(pattern(candles, "up", 5)).toBe(false);
  });
});
