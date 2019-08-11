const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").MatchingHigh;

describe("Matching High", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/matchingHigh.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 30,
        high: 85,
        low: 10,
        close: 85
      },
      {
        open: 35,
        high: 85,
        low: 25,
        close: 85
      }
    ];
    expect(pattern(candles, "up", 5)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 30,
        high: 85,
        low: 10,
        close: 85
      },
      {
        open: 35,
        high: 90,
        low: 25,
        close: 85
      }
    ];
    expect(pattern(candles, "up", 5)).toBe(false);
  });
});
