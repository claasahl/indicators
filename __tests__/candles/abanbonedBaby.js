const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").AbandonedBaby;

describe("Abandoned Baby", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/abandonedBaby_down.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync(
      "./assets/candles/abandonedBaby_up.json"
    ).toString();
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
        open: 60,
        high: 80,
        low: 35,
        close: 35
      },
      {
        open: 33,
        high: 34,
        low: 25,
        close: 33
      },
      {
        open: 40,
        high: 75,
        low: 38,
        close: 70
      }
    ];
    expect(pattern(candles, "down", 5)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 50,
        high: 80,
        low: 30,
        close: 70
      }
    ];
    expect(pattern(candles)).toBe(false);
  });
});
